from pydantic import BaseModel

class student_register(BaseModel):
    name:str
    email:str
    password:str
    phone:str
    image:str