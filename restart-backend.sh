#!/bin/bash

# Restart Backend Server Script
# This script stops the current backend and starts a new one

echo "🔄 Restarting Backend Server..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Find and kill existing backend process
echo "Step 1: Stopping existing backend..."
BACKEND_PID=$(lsof -ti:8000)

if [ -z "$BACKEND_PID" ]; then
    echo -e "${YELLOW}⚠ No process found on port 8000${NC}"
else
    echo "Found process $BACKEND_PID on port 8000"
    kill -9 $BACKEND_PID 2>/dev/null
    sleep 2
    
    # Verify it's killed
    if lsof -ti:8000 > /dev/null 2>&1; then
        echo -e "${RED}✗ Failed to stop backend${NC}"
        exit 1
    else
        echo -e "${GREEN}✓ Backend stopped${NC}"
    fi
fi
echo ""

# Step 2: Start backend
echo "Step 2: Starting backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ node_modules not found, installing dependencies...${NC}"
    npm install
fi

# Start backend in background
echo "Starting backend server..."
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

echo "Backend starting with PID: $BACKEND_PID"
echo "Waiting for server to start..."
sleep 5

# Step 3: Verify backend is running
echo ""
echo "Step 3: Verifying backend..."

# Check if process is still running
if ! ps -p $BACKEND_PID > /dev/null 2>&1; then
    echo -e "${RED}✗ Backend failed to start${NC}"
    echo "Check backend.log for errors:"
    tail -20 ../backend.log
    exit 1
fi

# Check if port 8000 is listening
if ! lsof -ti:8000 > /dev/null 2>&1; then
    echo -e "${RED}✗ Backend not listening on port 8000${NC}"
    echo "Check backend.log for errors:"
    tail -20 ../backend.log
    exit 1
fi

# Test health endpoint
HEALTH_CHECK=$(curl -s http://localhost:8000/ 2>&1)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend is running!${NC}"
    echo "$HEALTH_CHECK" | jq . 2>/dev/null || echo "$HEALTH_CHECK"
else
    echo -e "${RED}✗ Backend health check failed${NC}"
    exit 1
fi

echo ""
echo "Step 4: Testing tuition endpoints..."

# Test tutors endpoint
TUTORS_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:8000/api/tuition/tutors 2>&1)
HTTP_CODE=$(echo "$TUTORS_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}✗ Tutors endpoint still returns 404${NC}"
    echo "This shouldn't happen after restart. Check backend.log"
    exit 1
elif [ "$HTTP_CODE" = "401" ]; then
    echo -e "${GREEN}✓ Tutors endpoint is working! (401 = needs auth)${NC}"
else
    echo -e "${YELLOW}⚠ Tutors endpoint returned HTTP $HTTP_CODE${NC}"
fi

# Test dashboard endpoint
DASHBOARD_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:8000/api/tuition/dashboard 2>&1)
HTTP_CODE=$(echo "$DASHBOARD_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "403" ]; then
    echo -e "${GREEN}✓ Dashboard endpoint is working!${NC}"
else
    echo -e "${YELLOW}⚠ Dashboard endpoint returned HTTP $HTTP_CODE${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✓ Backend restarted successfully!${NC}"
echo "================================"
echo ""
echo "Backend logs: tail -f backend.log"
echo "Stop backend: kill $BACKEND_PID"
echo ""
echo "Next steps:"
echo "  1. Login as parent: parent@test.com / test123"
echo "  2. Navigate to Find Teachers page"
echo "  3. Teachers should now be visible!"
echo ""
