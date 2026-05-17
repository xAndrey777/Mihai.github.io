from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Contact API", version="1.0.0")

# Permitir que el frontend se comunique con la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto por tu dominio de GitHub Pages en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def send_contact_message(data: ContactMessage):
    if not data.email or not data.message:
        raise HTTPException(status_code=400, detail="Faltan campos obligatorios.")
    
    # Aquí puedes integrar un webhook de Discord o envío de emails automático
    print(f"[Python API] Mensaje recibido de {data.name} ({data.email}): {data.message}")
    
    return {"status": "success", "message": "Mensaje procesado correctamente."}
  
