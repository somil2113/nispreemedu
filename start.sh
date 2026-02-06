#!/bin/bash

# EdTech Platform Complete Startup Script
# This script starts MongoDB, Backend Server, and Frontend

echo "🚀 Starting EdTech Platform..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo -e "${RED}❌ MongoDB not found. Install it first:${NC}"
    echo "brew install mongodb-community"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Install it first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Starting 3 services...${NC}"
echo ""

# Create a log directory
mkdir -p logs
mkdir -p data

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down services...${NC}"
    kill $MONGO_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Start MongoDB in background
echo -e "${YELLOW}1️⃣  Starting MongoDB...${NC}"
mongod --dbpath data --logpath logs/mongodb.log --fork > /dev/null 2>&1
MONGO_PID=$!
sleep 2

if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✅ MongoDB started on port 27017${NC}"
else
    echo -e "${RED}❌ MongoDB failed to start${NC}"
    exit 1
fi
echo ""

# Navigate to backend directory
cd edtech-backend

# Install dependencies if needed
echo -e "${YELLOW}2️⃣  Checking backend dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install > /dev/null 2>&1
fi
echo -e "${GREEN}✅ Dependencies ready${NC}"
echo ""

# Seed database
echo -e "${YELLOW}3️⃣  Seeding database with all courses...${NC}"
npm run seed > ../logs/seed.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database seeded${NC}"
else
    echo -e "${RED}⚠️  Seed might have failed. Check logs/seed.log${NC}"
fi
echo ""

# Start Backend Server
echo -e "${YELLOW}4️⃣  Starting Backend Server...${NC}"
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Check if backend is running
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend started on port 5001${NC}"
else
    echo -e "${RED}❌ Backend failed to start. Check logs/backend.log${NC}"
    cat logs/backend.log
    exit 1
fi
echo ""

# Display status
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}✅ ALL SERVICES RUNNING!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo "📊 Service Status:"
echo -e "  ${GREEN}✓${NC} MongoDB:  http://localhost:27017"
echo -e "  ${GREEN}✓${NC} Backend:  http://localhost:5001"
echo -e "  ${GREEN}✓${NC} Website:  Open index.html with Live Server"
echo ""
echo "🧪 Quick Test Commands:"
echo "  curl http://localhost:5001/api/health"
echo "  curl http://localhost:5001/api/courses"
echo ""
echo "📋 Log Files:"
echo "  MongoDB: logs/mongodb.log"
echo "  Backend: logs/backend.log"
echo "  Seed:    logs/seed.log"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Keep script running
wait
