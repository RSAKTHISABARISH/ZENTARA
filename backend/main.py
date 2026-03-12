from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import rag_pipeline
import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

app = FastAPI(title="ContractSense AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage of the vector database object for this demo
# In production, ChromaDB would be connected via a persistent client.
app.state.vectorstore = None

@app.on_event("startup")
async def startup_event():
    db_path = "./chroma_db"
    if os.path.exists(db_path):
        print(f"Loading existing vector database from {db_path}...")
        try:
            embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
            app.state.vectorstore = Chroma(persist_directory=db_path, embedding_function=embeddings)
            print("Vector database loaded successfully.")
        except Exception as e:
            print(f"Failed to load vector database: {e}")

class ChatRequest(BaseModel):
    message: str

class LogisticRequest(BaseModel):
    origin: str
    destination: str
    carrier: str = "Standard"

@app.get("/")
async def root():
    return {"message": "Welcome to ZENTARA Logistics Intelligence API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict-delay")
async def predict_delay(request: LogisticRequest):
    """Simulates AI delay prediction based on route and carrier."""
    import random
    # In a real app, this would use a machine learning model
    delays = [0, 8, 12, 24, 48]
    probabilities = [0.4, 0.3, 0.15, 0.1, 0.05]
    predicted_delay = random.choices(delays, weights=probabilities)[0]
    
    risk_level = "low"
    if predicted_delay > 24: risk_level = "high"
    elif predicted_delay > 0: risk_level = "medium"
    
    return {
        "route": f"{request.origin} to {request.destination}",
        "predicted_delay_hours": predicted_delay,
        "risk_level": risk_level,
        "recommendation": "Maintain route" if predicted_delay < 12 else "Consider alternative transit"
    }

@app.post("/optimize-cost")
async def optimize_cost(request: LogisticRequest):
    """Simulates AI cost optimization suggestions."""
    # Simulated optimization logic
    savings = 150.50 + (len(request.origin) * 10)
    return {
        "status": "optimized",
        "potential_savings": f"${savings:.2f}",
        "action": "Switch to bulk shipping via Intermodal for this route"
    }

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        content = await file.read()
        
        # Extract Text
        extracted_text = rag_pipeline.extract_text_from_pdf(content)
        
        # Ensure we have data
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
        
        # Store in VectorDB
        vectorstore = rag_pipeline.create_embeddings_and_store(extracted_text, file.filename)
        app.state.vectorstore = vectorstore
        
        return {
            "status": "success", 
            "message": "Contract processed and indexed successfully",
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat_with_contract(request: ChatRequest):
    try:
        response = rag_pipeline.ask_contract_question(request.message, app.state.vectorstore)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
