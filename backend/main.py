from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import predict

app = FastAPI(title="AI Image Detector API")

origins = [
    "http://localhost:5173",  # frontend dev server
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Backend running"}
