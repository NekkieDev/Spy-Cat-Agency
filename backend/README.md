# Spy Cat Agency - Backend API

A REST API for managing spy cats, missions, and targets for the Spy Cat Agency.

## Features

- **Spy Cats Management**: CRUD operations for spy cats with breed validation
- **Missions Management**: Create missions with targets, assign to cats
- **Targets Management**: Update notes and completion status
- **Breed Validation**: Integration with TheCatAPI for breed validation

## Tech Stack

- FastAPI
- SQLAlchemy (SQLite)
- Pydantic
- httpx for external API calls

## Setup and Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Create a virtual environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc

## API Endpoints

### Spy Cats
- `POST /api/cats/` - Create a new spy cat
- `GET /api/cats/` - List all spy cats
- `GET /api/cats/{cat_id}` - Get a specific spy cat
- `PUT /api/cats/{cat_id}` - Update spy cat salary
- `DELETE /api/cats/{cat_id}` - Delete a spy cat
- `GET /api/cats/breeds/available` - Get available cat breeds

### Missions
- `POST /api/missions/` - Create a mission with targets
- `GET /api/missions/` - List all missions
- `GET /api/missions/{mission_id}` - Get a specific mission
- `DELETE /api/missions/{mission_id}` - Delete a mission (if not assigned)
- `PUT /api/missions/{mission_id}/assign` - Assign mission to a cat
- `PUT /api/missions/{mission_id}` - Update mission completion status
- `PUT /api/missions/{mission_id}/targets/{target_id}` - Update target notes/completion

## Business Rules

1. **Spy Cats**:
   - Breed must be validated with TheCatAPI
   - Only salary can be updated after creation

2. **Missions**:
   - Must have 1-3 targets
   - Cannot be deleted if assigned to a cat
   - One cat can only have one active mission at a time

3. **Targets**:
   - Notes cannot be updated if target or mission is complete
   - Mission is automatically marked complete when all targets are complete

## Postman Collection

You can find the Postman collection at: [Postman Collection Link]

## Database Schema

The application uses SQLite with the following tables:
- `spy_cats`: Store spy cat information
- `missions`: Store mission information
- `targets`: Store target information linked to missions

## External Dependencies

- **TheCatAPI**: Used for breed validation (https://api.thecatapi.com/v1/breeds)
