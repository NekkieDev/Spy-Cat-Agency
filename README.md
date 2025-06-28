# Spy Cat Agency Management System

A comprehensive management system for the Spy Cat Agency, featuring a FastAPI backend and Next.js frontend for managing spy cats, missions, and targets.

## 🎯 Project Overview

This project implements a CRUD application for the Spy Cat Agency (SCA) that allows them to:

- **Manage Spy Cats**: Add, view, update, and remove spy cats from the system
- **Handle Missions**: Create missions with multiple targets and assign them to available cats
- **Track Targets**: Update notes and completion status for mission targets
- **Validate Breeds**: Integration with TheCatAPI for cat breed validation

## 🏗️ Architecture

The project is split into two main components:

- **Backend**: FastAPI REST API with SQLite database
- **Frontend**: Next.js React application with TypeScript and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, you can access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 Postman Collection

The complete Postman collection is available in the repository as `postman_collection.json`. 

**Import Instructions:**
1. Open Postman
2. Click "Import" 
3. Select the `postman_collection.json` file from the project root
4. The collection includes all endpoints with example requests

**Collection Features:**
- ✅ All spy cat CRUD operations
- ✅ Mission and target management endpoints  
- ✅ Error handling examples
- ✅ Pre-configured environment variables
- ✅ Sample request bodies

**Base URL:** `http://localhost:8000`

### Quick API Test
You can also test the API using the provided bash script:
```bash
# Make sure both servers are running, then:
bash test_api.sh
```

## 🧪 Testing the Application

### Testing Backend APIs
1. Start the backend server
2. Import the Postman collection
3. Test all endpoints using the provided examples

### Testing Frontend
1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Test the spy cat management features:
   - Add new spy cats with breed validation
   - Edit cat salaries
   - Delete cats
   - View the complete list

## 🎨 Features

### Backend Features
- **RESTful API** design with proper HTTP status codes
- **Data validation** using Pydantic
- **Breed validation** via TheCatAPI integration
- **Database relationships** between cats, missions, and targets
- **Business logic** enforcement (e.g., one cat per mission)
- **Error handling** with descriptive messages

### Frontend Features
- **Responsive design** that works on all devices
- **Real-time updates** when data changes
- **Form validation** with user-friendly error messages
- **Loading states** and error handling
- **Confirmation dialogs** for destructive actions
- **Clean, modern UI** with Tailwind CSS

## 📁 Project Structure

```
spy-cat-agency/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── cats.py
│   │   │   └── missions.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   ├── services.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── run.py
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔧 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database
- **Pydantic**: Data validation using Python type hints
- **httpx**: HTTP client for external API calls
- **Uvicorn**: ASGI server implementation

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern React state management

## 🎯 Business Rules Implementation

1. **Spy Cats**:
   - Breed validation using TheCatAPI
   - Only salary updates allowed after creation
   - Unique identification system

2. **Missions**:
   - Must have 1-3 targets
   - Cannot be deleted if assigned to a cat
   - One cat can only have one active mission

3. **Targets**:
   - Notes become read-only when target/mission is complete
   - Mission auto-completes when all targets are done
   - Country and name validation

## 🔄 Development Workflow

1. **Backend Development**:
   - API endpoint development
   - Database schema updates
   - Business logic implementation
   - Testing with Postman

2. **Frontend Development**:
   - Component development
   - API integration
   - UI/UX improvements
   - Responsive design testing

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Make sure the backend CORS middleware includes the frontend URL
2. **API Connection Failed**: Verify the backend server is running on port 8000
3. **Breed Validation Error**: Check TheCatAPI availability or use fallback breeds
4. **Database Issues**: Delete `spy_cats.db` to reset the database

### Development Tips

- Always start the backend before the frontend
- Check browser console for frontend errors
- Use the Swagger UI for API testing
- Monitor the backend logs for debugging

## 📝 Notes

- The frontend focuses only on spy cat management as specified in the requirements
- Missions and targets are fully implemented in the backend API
- The system uses SQLite for simplicity but can be easily migrated to PostgreSQL
- All API endpoints include proper error handling and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is developed as a technical assessment for the Spy Cat Agency position.