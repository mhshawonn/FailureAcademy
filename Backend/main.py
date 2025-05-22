from fastapi import FastAPI
from routes.routes import router
from DbConfig.db import client
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()


app.include_router(router)


origins = [
    "http://localhost:5174",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def connect_to_db():
    try:
        await client.admin.command("ping")
        print(" Database connected successfully")
    except Exception as e:
        print(f" Database connection failed: {e}")