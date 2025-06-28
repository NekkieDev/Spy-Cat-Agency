from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import cats, missions
from app.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Spy Cat Agency API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cats.router, prefix="/api/cats", tags=["cats"])
app.include_router(missions.router, prefix="/api/missions", tags=["missions"])

@app.get("/")
def read_root():
    return {"message": "Spy Cat Agency API"}
