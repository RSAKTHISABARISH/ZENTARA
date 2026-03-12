import os
from io import BytesIO
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

# We need the Google API Key set in environment variables
# os.environ["GOOGLE_API_KEY"] = "YOUR_API_KEY"

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from a uploaded PDF filebytes."""
    reader = PdfReader(BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def create_embeddings_and_store(text: str, filename: str):
    """Chunks the text and stores it in the vector database."""
    # Chunk the text to fit into LLM context and get precise retrieval
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    
    # Optional: we can attach metadata about the filename and chunk index
    metadatas = [{"source": filename, "chunk": i} for i in range(len(chunks))]
    
    # We use Google's embedding model
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
    # Initialize Chroma DB. 
    # For production, we would use a persistent client instead of ephemeral.
    vectorstore = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        metadatas=metadatas,
        persist_directory="./chroma_db"
    )
    
    return vectorstore

from langgraph.prebuilt import create_react_agent
from langchain.tools import tool
from langchain_community.tools import DuckDuckGoSearchRun

web_search_tool = DuckDuckGoSearchRun()

def ask_contract_question(question: str, vectorstore) -> str:
    """Retrieves relevant context and queries the LLM using an Agent."""
    @tool
    def search_uploaded_sla(query: str) -> str:
        """Use this to search the uploaded SLA contract document for specific rules, deadlines, and liability limits."""
        if vectorstore is None:
            return "No SLA document has been uploaded yet. Please use the search_live_web tool instead."
        retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
        docs = retriever.invoke(query)
        if not docs:
            return "No relevant information found in the uploaded contract."
        return "\n\n".join([doc.page_content for doc in docs])
        
    @tool
    def search_live_web(query: str) -> str:
        """Use this to search the internet for current public logistics SLA documents (e.g. FedEx, UPS latest terms)."""
        return web_search_tool.invoke(query)

    tools = [search_uploaded_sla, search_live_web]
    
    # Initialize Gemini Pro model
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.1)
    
    system_message = "You are an intelligent legal AI named ContractSense AI analyzing logistics carrier contracts. You have access to tools that search the uploaded PDF contract and the live internet. Use them to answer questions thoroughly and accurately. If searching the PDF doesn't yield results, search the web."
    
    agent_executor = create_react_agent(llm, tools, state_modifier=system_message)
    
    response = agent_executor.invoke({"messages": [("human", question)]})
    return response["messages"][-1].content
