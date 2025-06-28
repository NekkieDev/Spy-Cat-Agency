from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, Mission as MissionModel, Target as TargetModel, SpyCat as SpyCatModel
from app.schemas import Mission, MissionCreate, MissionUpdate, MissionAssign, TargetUpdate

router = APIRouter()

@router.post("/", response_model=Mission, status_code=status.HTTP_201_CREATED)
def create_mission(mission: MissionCreate, db: Session = Depends(get_db)):
    # Create mission
    db_mission = MissionModel()
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    
    # Create targets
    for target_data in mission.targets:
        db_target = TargetModel(
            mission_id=db_mission.id,
            **target_data.model_dump()
        )
        db.add(db_target)
    
    db.commit()
    db.refresh(db_mission)
    return db_mission

@router.get("/", response_model=List[Mission])
def list_missions(db: Session = Depends(get_db)):
    return db.query(MissionModel).all()

@router.get("/{mission_id}", response_model=Mission)
def get_mission(mission_id: int, db: Session = Depends(get_db)):
    mission = db.query(MissionModel).filter(MissionModel.id == mission_id).first()
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    return mission

@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(mission_id: int, db: Session = Depends(get_db)):
    mission = db.query(MissionModel).filter(MissionModel.id == mission_id).first()
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    
    # Check if mission is assigned to a cat
    if mission.cat_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete mission that is assigned to a cat"
        )
    
    db.delete(mission)
    db.commit()
    return

@router.put("/{mission_id}/assign", response_model=Mission)
def assign_mission_to_cat(mission_id: int, assignment: MissionAssign, db: Session = Depends(get_db)):
    mission = db.query(MissionModel).filter(MissionModel.id == mission_id).first()
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    
    # Check if cat exists
    cat = db.query(SpyCatModel).filter(SpyCatModel.id == assignment.cat_id).first()
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cat not found"
        )
    
    # Check if cat already has a mission
    existing_mission = db.query(MissionModel).filter(
        MissionModel.cat_id == assignment.cat_id,
        MissionModel.is_complete == False
    ).first()
    if existing_mission:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cat already has an active mission"
        )
    
    mission.cat_id = assignment.cat_id
    db.commit()
    db.refresh(mission)
    return mission

@router.put("/{mission_id}", response_model=Mission)
def update_mission(mission_id: int, mission_update: MissionUpdate, db: Session = Depends(get_db)):
    mission = db.query(MissionModel).filter(MissionModel.id == mission_id).first()
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    
    if mission_update.is_complete is not None:
        mission.is_complete = mission_update.is_complete
    
    db.commit()
    db.refresh(mission)
    return mission

@router.put("/{mission_id}/targets/{target_id}", response_model=Mission)
def update_target(mission_id: int, target_id: int, target_update: TargetUpdate, db: Session = Depends(get_db)):
    mission = db.query(MissionModel).filter(MissionModel.id == mission_id).first()
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    
    target = db.query(TargetModel).filter(
        TargetModel.id == target_id,
        TargetModel.mission_id == mission_id
    ).first()
    if not target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Target not found"
        )
    
    # Check if target or mission is complete (notes cannot be updated)
    if target.is_complete or mission.is_complete:
        if target_update.notes is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot update notes when target or mission is complete"
            )
    
    # Update target
    if target_update.notes is not None:
        target.notes = target_update.notes
    if target_update.is_complete is not None:
        target.is_complete = target_update.is_complete
    
    # Check if all targets are complete to mark mission as complete
    all_targets_complete = all(t.is_complete for t in mission.targets)
    if all_targets_complete:
        mission.is_complete = True
    
    db.commit()
    db.refresh(mission)
    return mission
