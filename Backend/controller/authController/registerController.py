from fastapi import UploadFile, File, Form, HTTPException
from DbConfig.db import student_collection
import shutil, os
from passlib.context import CryptContext






pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
async def student_registration(
    name: str = Form(...),
    email: str = Form(...),
    password: str =Form(...),
    phone: str = Form(...),
    image: UploadFile = File(...)
):
    try:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        image_path = f"{upload_dir}/{image.filename}"

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        existing_user = await student_collection.find_one({"email":email})
        if existing_user:
            raise HTTPException(status_code=400, detail="User account already created, just login")
        hashed_password=pwd_context.hash(password)

        student_data = {
            "name": name,
            "email":email,
            "password":hashed_password,
            "phone":phone,
            "image": image_path
        }

        result = await student_collection.insert_one(student_data)
        student_data["_id"] = str(result.inserted_id)  # fix here

        return {
            "message": "Person created successfully",
            "data": student_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))