# Story App

A full-stack application for creating and managing stories with character integration using AI.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Project Structure

```
story-app/
├── client/             # React frontend
└── server/             # Node.js backend
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gokulrajeshofficial/Story-App.git
cd story-app
```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/storytelling-app
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
OPENAI_API_KEY=API_key_from_openai
```

4. Start the MongoDB service on your system

### 3. Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### 1. Start the Backend Server

From the server directory:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

From the client directory:
```bash
npm run dev
```

The client will start on `http://localhost:5173`

## Features

- User Authentication (Login/Register)
- Character Management
- Story Creation and Management
- Dark/Light Theme Support
- Responsive Design

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/refresh-token` - Refresh access token

### Characters
- GET `/api/characters` - Get all characters
- POST `/api/characters` - Create a new character
- GET `/api/characters/:id` - Get a specific character
- PUT `/api/characters/:id` - Update a character
- DELETE `/api/characters/:id` - Delete a character

### Stories
- GET `/api/stories` - Get all stories
- POST `/api/stories` - Create a new story
- GET `/api/stories/:id` - Get a specific story
- PUT `/api/stories/:id` - Update a story
- DELETE `/api/stories/:id` - Delete a story

## Technologies Used

### Frontend
- React
- Material-UI
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 