from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, SpyCat as SpyCatModel
from app.schemas import SpyCat, SpyCatCreate, SpyCatUpdate
from app.services import CatAPIService

router = APIRouter()

@router.post("/", response_model=SpyCat, status_code=status.HTTP_201_CREATED)
async def create_spy_cat(cat: SpyCatCreate, db: Session = Depends(get_db)):
    # Validate breed with TheCatAPI
    if not await CatAPIService.validate_breed(cat.breed):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid breed: {cat.breed}. Please use a valid cat breed."
        )
    
    db_cat = SpyCatModel(**cat.model_dump())
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.get("/", response_model=List[SpyCat])
def list_spy_cats(db: Session = Depends(get_db)):
    return db.query(SpyCatModel).all()

@router.get("/{cat_id}", response_model=SpyCat)
def get_spy_cat(cat_id: int, db: Session = Depends(get_db)):
    cat = db.query(SpyCatModel).filter(SpyCatModel.id == cat_id).first()
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        )
    return cat

@router.put("/{cat_id}", response_model=SpyCat)
def update_spy_cat(cat_id: int, cat_update: SpyCatUpdate, db: Session = Depends(get_db)):
    cat = db.query(SpyCatModel).filter(SpyCatModel.id == cat_id).first()
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        )
    
    cat.salary = cat_update.salary
    db.commit()
    db.refresh(cat)
    return cat

@router.delete("/{cat_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_spy_cat(cat_id: int, db: Session = Depends(get_db)):
    cat = db.query(SpyCatModel).filter(SpyCatModel.id == cat_id).first()
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        )
    
    db.delete(cat)
    db.commit()
    return

@router.get("/breeds/available")
async def get_available_breeds():
    """Get all available cat breeds from TheCatAPI"""
    breeds = await CatAPIService.get_breeds()
    return {"breeds": breeds}
