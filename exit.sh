#!/bin/bash

# This script generates the complete folder and file structure for the gemini-clone project.

echo "🚀 Starting to build the project structure for gemini-clone..."

# Create the root directory
mkdir -p gemini-clone
cd gemini-clone

# -----------------
# 1. CLIENT (React Frontend)
# -----------------
echo "-> Setting up client directory..."
mkdir -p client/public client/src/{api,assets,components,pages}

# Create frontend files using touch
touch client/src/api/apiService.js
touch client/src/components/ChatInput.jsx
touch client/src/components/ChatMessage.jsx
touch client/src/components/Navbar.jsx
touch client/src/pages/ChatPage.jsx
touch client/src/pages/LoginPage.jsx
touch client/src/pages/SignupPage.jsx
touch client/src/App.jsx
touch client/src/index.css
touch client/src/main.jsx
touch client/.env
touch client/package.json
touch client/vite.config.js

# -----------------
# 2. SERVER (Flask Backend)
# -----------------
echo "-> Setting up server directory..."
mkdir -p server/{services,routes,models}

# Create backend files using touch
touch server/services/auth_service.py
touch server/services/chat_service.py
touch server/services/vector_db_service.py
touch server/routes/auth_routes.py
touch server/routes/chat_routes.py
touch server/models/user_model.py
touch server/app.py
touch server/config.py
touch server/requirements.txt
touch server/.env

echo ""
echo "✅ Project structure for 'gemini-clone' created successfully!"
echo "You can now 'cd gemini-clone' to start working."
echo ""
tree .