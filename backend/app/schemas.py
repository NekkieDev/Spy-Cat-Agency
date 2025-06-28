from pydantic import BaseModel, field_validator
from typing import List, Optional

# SpyCat schemas
class SpyCatBase(BaseModel):
    name: str
    years_of_experience: int
    breed: str
    salary: float

class SpyCatCreate(SpyCatBase):
    pass

class SpyCatUpdate(BaseModel):
    salary: float

class SpyCat(SpyCatBase):
    id: int
    
    class Config:
        from_attributes = True

# Target schemas
class TargetBase(BaseModel):
    name: str
    country: str
    notes: Optional[str] = ""

class TargetCreate(TargetBase):
    pass

class TargetUpdate(BaseModel):
    notes: Optional[str] = None
    is_complete: Optional[bool] = None

class Target(TargetBase):
    id: int
    mission_id: int
    is_complete: bool
    
    class Config:
        from_attributes = True

# Mission schemas
class MissionBase(BaseModel):
    pass

class MissionCreate(MissionBase):
    targets: List[TargetCreate]
    
    @field_validator('targets')
    @classmethod
    def validate_targets_count(cls, v):
        if len(v) < 1 or len(v) > 3:
            raise ValueError('Mission must have between 1 and 3 targets')
        return v

class MissionUpdate(BaseModel):
    is_complete: Optional[bool] = None

class Mission(MissionBase):
    id: int
    cat_id: Optional[int] = None
    is_complete: bool
    targets: List[Target] = []
    cat: Optional[SpyCat] = None
    
    class Config:
        from_attributes = True

class MissionAssign(BaseModel):
    cat_id: int
