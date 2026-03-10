#!/bin/bash

# Test Tuition Endpoints Script
# This script tests if the tuition endpoints are accessible

echo "================================"
echo "Testing Tuition Endpoints"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Backend Health Check
echo "Test 1: Backend Health Check"
echo "----------------------------"
HEALTH_CHECK=$(curl -s http://localhost:8000/)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend is running on port 8000${NC}"
    echo "$HEALTH_CHECK" | jq . 2>/dev/null || echo "$HEALTH_CHECK"
else
    echo -e "${RED}✗ Backend is NOT running on port 8000${NC}"
    echo -e "${YELLOW}Please start the backend: cd backend && npm run dev${NC}"
    exit 1
fi
echo ""

# Test 2: Tuition Tutors Endpoint
echo "Test 2: Tuition Tutors Endpoint"
echo "--------------------------------"
TUTORS_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:8000/api/tuition/tutors)
HTTP_CODE=$(echo "$TUTORS_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$TUTORS_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}✗ 404 Not Found - Routes not loaded${NC}"
    echo -e "${YELLOW}Solution: Restart the backend server${NC}"
    echo "  cd backend"
    echo "  npm run dev"
elif [ "$HTTP_CODE" = "401" ]; then
    echo -e "${GREEN}✓ 401 Unauthorized - Routes are working!${NC}"
    echo "  (401 is expected - you need to be logged in)"
else
    echo -e "${YELLOW}⚠ HTTP $HTTP_CODE${NC}"
    echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
fi
echo ""

# Test 3: Tuition Dashboard Endpoint
echo "Test 3: Tuition Dashboard Endpoint"
echo "-----------------------------------"
DASHBOARD_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:8000/api/tuition/dashboard)
HTTP_CODE=$(echo "$DASHBOARD_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$DASHBOARD_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}✗ 404 Not Found - Routes not loaded${NC}"
    echo -e "${YELLOW}Solution: Restart the backend server${NC}"
elif [ "$HTTP_CODE" = "401" ]; then
    echo -e "${GREEN}✓ 401 Unauthorized - Routes are working!${NC}"
    echo "  (401 is expected - you need to be logged in)"
elif [ "$HTTP_CODE" = "403" ]; then
    echo -e "${YELLOW}⚠ 403 Forbidden - Need parent role${NC}"
    echo "  (You're logged in but not as a parent)"
else
    echo -e "${YELLOW}⚠ HTTP $HTTP_CODE${NC}"
    echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
fi
echo ""

# Test 4: Check MongoDB Connection
echo "Test 4: MongoDB Connection"
echo "--------------------------"
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB may not be running${NC}"
    echo "  Start MongoDB: brew services start mongodb-community (Mac)"
    echo "  Or: sudo systemctl start mongod (Linux)"
fi
echo ""

# Summary
echo "================================"
echo "Summary"
echo "================================"
echo ""
echo "If you see 404 errors:"
echo "  1. Stop the backend (Ctrl+C)"
echo "  2. Restart: cd backend && npm run dev"
echo "  3. Run this script again"
echo ""
echo "If you see 401 errors:"
echo "  ✓ Routes are working!"
echo "  1. Login as parent: parent@test.com / test123"
echo "  2. Navigate to Find Teachers page"
echo ""
echo "If you don't have a parent user:"
echo "  cd backend && node scripts/seedTestUsers.js"
echo ""
