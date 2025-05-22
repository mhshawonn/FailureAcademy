from fastapi import APIRouter
from fastapi import Form, UploadFile, File
from controller.authController.registerController import student_registration

router=APIRouter()

@router.post('/register')
async def register_router(
    name:str = Form(...),
    email: str= Form(...),
    password:str =Form(...),
    phone: str =Form(...),
    image: UploadFile =File(...)
):
    return await student_registration(name, email, password, phone, image)
 