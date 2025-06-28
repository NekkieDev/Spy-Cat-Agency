# Spy Cat Agency - Frontend Dashboard

A modern Next.js dashboard for managing spy cats for the Spy Cat Agency.

## Features

- 📱 Responsive design with Tailwind CSS
- 🐱 Complete CRUD operations for spy cats
- ✅ Form validation and error handling
- 🎨 Clean and modern UI
- ⚡ Real-time updates
- 🔗 Integration with FastAPI backend

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React Hooks

## Setup and Installation

1. **Navigate to the frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main dashboard page
│   └── layout.tsx        # Root layout
├── components/
│   ├── SpyCatForm.tsx    # Form for adding new spy cats
│   └── SpyCatList.tsx    # List component for displaying spy cats
├── services/
│   └── api.ts            # API service for backend communication
└── types/
    └── index.ts          # TypeScript type definitions
```

## Features

### Spy Cats Management
- **View All Spy Cats**: See a complete list of all registered spy cats with their details
- **Add New Spy Cat**: Form to register new spy cats with validation
- **Edit Salary**: Quick inline editing of spy cat salaries
- **Delete Spy Cat**: Remove spy cats from the system with confirmation
- **Breed Validation**: Dropdown with valid cat breeds fetched from the backend

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators during API calls
- **Error Handling**: User-friendly error messages with retry options
- **Form Validation**: Client-side validation with helpful error messages
- **Confirmation Dialogs**: Confirmation before destructive actions

## API Integration

The frontend communicates with the FastAPI backend running on `http://localhost:8000`. Make sure the backend server is running before starting the frontend.

### API Endpoints Used
- `GET /api/cats/` - Fetch all spy cats
- `POST /api/cats/` - Create a new spy cat
- `PUT /api/cats/{id}` - Update spy cat salary
- `DELETE /api/cats/{id}` - Delete a spy cat
- `GET /api/cats/breeds/available` - Get available cat breeds

## Environment Setup

Make sure your backend API is running on `http://localhost:8000`. If you need to change the API URL, update the `API_BASE_URL` in `src/services/api.ts`.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Notes

- The dashboard focuses solely on spy cat management as specified in the requirements
- The missions/targets functionality is handled by the backend but not implemented in this frontend dashboard
- The UI is designed to be clean and functional rather than heavily styled, focusing on usability
