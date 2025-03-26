# Insurance Purchase API

## Description
A RESTful API built with Node.js and Express to manage insurance listings and purchases, including a bonus feature for curated insurance recommendations.

## Features
- **List Insurances**: Retrieve all available insurances.
- **Purchase Insurance**: Create a purchase record and get a receipt.
- **Download Policy**: Serve a dummy policy PDF.
- **Curated Insurances (Bonus)**: Filter insurances by age, gender, and income.

## Technologies Used
- Node.js
- Express.js
- UUID (for unique IDs)
- Jest & Supertest (for testing)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/insurance-api
cd insurance-api
Install dependencies:
bash

Collapse

Wrap

Copy
npm install
Add a dummy policy.pdf file in the root directory.
Start the server:
bash

Collapse

Wrap

Copy
npm start
Runs on http://localhost:3000.
API Endpoints
GET /insurances
Description: List all insurances.
Response: [{ "id": "1", "name": "Health Insurance", "premium": 1000, ... }]
POST /purchases
Description: Purchase an insurance.
Request: {"userId": "user1", "insuranceId": "1"}
Response: {"purchaseId": "abc123", "userId": "user1", ...}
GET /purchases/{purchaseId}/policy
Description: Download a policy document.
Response: PDF file
GET /insurances/curated
Description: Get curated insurances.
Query Params: ?age=25&gender=male&income=50000
Response: Filtered insurance list
Deployment
Live URL: https://your-app.herokuapp.com
Steps:
heroku create your-app-name
Add Procfile: web: node app.js
git push heroku main
Testing
Run tests:
bash

Collapse

Wrap

Copy
npm test
Covers all endpoints and edge cases.
Approach
Structured the app with separate routes for modularity.
Used in-memory data for simplicity, with validation for robustness.
Implemented bonus curated feature with flexible filtering.
Added tests to ensure functionality.
Challenges
Fixed testing issue by exporting app without auto-starting the server.
Limited to in-memory storage—future work could add a database.
Future Improvements
Integrate MongoDB or PostgreSQL.
Add authentication for secure purchases.
Enhance curated feature with ML-based recommendations.