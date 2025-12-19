from dotenv import load_dotenv
from imagekitio import ImageKit
import os

load_dotenv()

imagekit = ImageKit()
imagekit.public_key = os.getenv("IMAGEKIT_PUBLIC_KEY")
imagekit.private_key = os.getenv("IMAGEKIT_PRIVATE_KEY")
imagekit.url_endpoint = os.getenv("IMAGEKIT_URL_ENDPOINT")

def upload_image(file):
    file.file.seek(0)
    file_bytes = file.file.read()

    result = imagekit.files.upload(
        file=file_bytes,
        file_name=file.filename  
    )

    if getattr(result, "http_status_code", 200) != 200:
        raise Exception("Image upload failed")

    return result.url