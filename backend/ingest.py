import os
import rag_pipeline

pdf_files = [
    r"c:\Users\Sakthi\Downloads\ups_dap_supplemental_tc.pdf",
    r"c:\Users\Sakthi\Downloads\terms_conditions_of_carriage_en_svp-2024.pdf",
    r"c:\Users\Sakthi\Downloads\tariff-guide-base-GB.pdf",
    r"c:\Users\Sakthi\Downloads\surcharge_and_fee_changes_2025.pdf",
    r"c:\Users\Sakthi\Downloads\Service_Guide_2025.pdf",
    r"c:\Users\Sakthi\Downloads\royal-mail-id-verification-terms-and-conditions-30-september-2019-version-2.pdf",
    r"c:\Users\Sakthi\Downloads\rm-pfw-account-age-verification-service-terms-and-conditions.pdf",
    r"c:\Users\Sakthi\Downloads\fedex-meisa-service-guide-en-in.pdf",
    r"c:\Users\Sakthi\Downloads\claims_legal_action.pdf",
    r"c:\Users\Sakthi\Downloads\Document1.pdf",
    r"c:\Users\Sakthi\Downloads\daily_rates.pdf"
]

def ingest_all():
    print("Starting bulk ingestion of SLA documents...")
    vectorstore = None
    for file_path in pdf_files:
        if os.path.exists(file_path):
            print(f"\nProcessing {os.path.basename(file_path)}...")
            try:
                with open(file_path, "rb") as f:
                    content = f.read()
                
                print("  Extracting text...")
                extracted_text = rag_pipeline.extract_text_from_pdf(content)
                
                if extracted_text.strip():
                    print("  Chunking and storing embeddings...")
                    vectorstore = rag_pipeline.create_embeddings_and_store(extracted_text, os.path.basename(file_path))
                    print(f"  Successfully ingested {os.path.basename(file_path)}")
                else:
                    print(f"  No text extracted from {os.path.basename(file_path)}")
            except Exception as e:
                print(f"  Failed to process {os.path.basename(file_path)}: {e}")
        else:
            print(f"\nFile not found: {file_path}")

    print("\nBulk ingestion complete.")

if __name__ == "__main__":
    ingest_all()
