from DbConfig.db import student_collection
from fastapi import HTTPException, Response
from passlib.context import CryptContext
from jose import jwt
from dotenv import load_dotenv
import os
from fastapi import Response
from fastapi.responses import JSONResponse

load_dotenv()




SECRET_KEY = os.getenv("TOKEN_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def create_access_token(data:dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

async def student_login(email:str, password: str, response:Response):
    user=await student_collection.find_one({"email":email})
    if not user:
        raise HTTPException(status_code=400, detail='user not found, please register then try to login')
    
    if not pwd_context.verify(password, user['password']):
        raise HTTPException(status_code=400, detail='password is not match')
    
    token=create_access_token({"sub":user['email']})
    response.set_cookie(key='access_token', value=token, httponly=True, samesite='none', secure=True)

    return{
        "message":'login successfully',
        "token":token
    }
    


      


