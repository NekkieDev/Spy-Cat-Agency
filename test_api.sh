#!/bin/bash

# Test script for Spy Cat Agency API
# This script tests the main functionality of the API

BASE_URL="http://localhost:8000"

echo "🕵️ Spy Cat Agency API Test Suite"
echo "================================="

# Test 1: Get available breeds
echo "1. Testing available breeds endpoint..."
curl -X GET "$BASE_URL/api/cats/breeds/available" | jq .

# Test 2: Create a spy cat
echo -e "\n2. Creating a spy cat..."
CAT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/cats/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Agent Whiskers",
    "years_of_experience": 5,
    "breed": "Siamese",
    "salary": 50000.00
  }')
echo $CAT_RESPONSE | jq .
CAT_ID=$(echo $CAT_RESPONSE | jq -r '.id')

# Test 3: Get all cats
echo -e "\n3. Getting all spy cats..."
curl -s -X GET "$BASE_URL/api/cats/" | jq .

# Test 4: Create a mission
echo -e "\n4. Creating a mission with targets..."
MISSION_RESPONSE=$(curl -s -X POST "$BASE_URL/api/missions/" \
  -H "Content-Type: application/json" \
  -d '{
    "targets": [
      {
        "name": "Dr. Evil",
        "country": "Germany",
        "notes": "Suspected of cat food theft"
      },
      {
        "name": "Mouse King",
        "country": "France",
        "notes": "Leader of the rodent resistance"
      }
    ]
  }')
echo $MISSION_RESPONSE | jq .
MISSION_ID=$(echo $MISSION_RESPONSE | jq -r '.id')

# Test 5: Assign mission to cat
echo -e "\n5. Assigning mission to cat..."
curl -s -X PUT "$BASE_URL/api/missions/$MISSION_ID/assign" \
  -H "Content-Type: application/json" \
  -d "{\"cat_id\": $CAT_ID}" | jq .

# Test 6: Update target notes
echo -e "\n6. Updating target notes..."
TARGET_ID=$(echo $MISSION_RESPONSE | jq -r '.targets[0].id')
curl -s -X PUT "$BASE_URL/api/missions/$MISSION_ID/targets/$TARGET_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Target spotted at the fish market. Surveillance ongoing."
  }' | jq .

# Test 7: Get mission details
echo -e "\n7. Getting mission details..."
curl -s -X GET "$BASE_URL/api/missions/$MISSION_ID" | jq .

echo -e "\n✅ Test suite completed!"
echo "Check the output above for any errors."
