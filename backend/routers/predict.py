from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.imagekit_service import upload_image
from backend.services.inference_service import dummy_predict

router = APIRouter()

@router.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    try:
        # ---- Upload to ImageKit ----
        image_url = upload_image(file)

        # ---- ML Inference (dummy for now) ----
        prediction = dummy_predict()

        return {
            "image_url": image_url,
            "label": prediction["label"],
            "confidence": prediction["confidence"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))