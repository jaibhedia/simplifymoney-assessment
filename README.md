# Insurance Purchase API

## Description
A RESTful API built with Node.js and Express to manage insurance listings and purchases, featuring a bonus curated insurance recommendation system. This project was developed for the Simplify Money Software Engineering Internship assignment to showcase backend development skills, problem-solving, and documentation.

## Features
- **List Insurances**: Retrieve all available insurances via `GET /insurances`.
- **Purchase Insurance**: Create a purchase record and receive a receipt via `POST /purchases`.
- **Download Policy**: Serve a dummy policy PDF via `GET /purchases/{purchaseId}/policy`.
- **Curated Insurances (Bonus)**: Filter insurances by user details (age, gender, income) via `GET /insurances/curated`.

## Technologies Used
- **Node.js**: Core runtime for the server.
- **Express.js**: Web framework for routing and middleware.
- **UUID**: Generates unique purchase IDs.
- **Jest & Supertest**: Unit and integration testing tools.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jaibhedia/insurance-api
   cd insurance-api
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Add Dummy Policy File**:
   - Place a `policy.pdf` file in the root directory (e.g., a simple PDF with "Policy Document").
4. **Start the Server**:
   ```bash
   npm start
   ```
   - Runs locally on `http://localhost:3000`.

## API Endpoints
Below are the endpoints with their deployed URLs on Render:
- **GET /insurances**
  - **URL**: `https://simplifymoney-assessment.onrender.com/insurances`
  - **Description**: Retrieves a list of all available insurances.
  - **Response**: 
    ```json
    [{"id": "1", "name": "Health Insurance", "premium": 1000, "coverage": "Up to $100,000"}, ...]
    ```
- **POST /purchases**
  - **URL**: `https://simplifymoney-assessment.onrender.com/purchases`
  - **Description**: Creates a purchase record for an insurance.
  - **Request Body**: 
    ```json
    {"userId": "user1", "insuranceId": "1"}
    ```
  - **Response**: 
    ```json
    {"purchaseId": "abc123", "userId": "user1", "insuranceId": "1", "purchaseDate": "2025-03-26T12:00:00Z"}
    ```
- **GET /purchases/{purchaseId}/policy**
  - **URL**: `https://simplifymoney-assessment.onrender.com/purchases/{purchaseId}/policy`
  - **Description**: Downloads a policy document (dummy PDF) for a specific purchase.
  - **Response**: Binary PDF file with headers:
    ```
    Content-Type: application/pdf
    Content-Disposition: attachment; filename="policy.pdf"
    ```
- **GET /insurances/curated**
  - **URL**: `https://simplifymoney-assessment.onrender.com/insurances/curated?age=25&gender=male&income=50000`
  - **Description**: Retrieves insurances filtered by user details (bonus feature).
  - **Response**: 
    ```json
    [{"id": "2", "name": "Life Insurance", "premium": 500, "coverage": "Up to $50,000"}, ...]
    ```

## Deployment
- **Live URL**: `https://simplifymoney-assessment.onrender.com`
- **Steps**:
  1. Push the code to GitHub: `https://github.com/jaibhedia/insurance-api`.
  2. Create a Web Service on Render:
     - Connect your GitHub repository.
     - Set **Runtime**: Node.
     - Set **Build Command**: `npm install`.
     - Set **Start Command**: `node app.js` (adjust to `node server.js` if your entry file differs).
  3. Deploy and verify the live URL.

## Testing
- **Run Tests Locally**:
   ```bash
   npm test
   ```
   - Uses Jest and Supertest to cover all endpoints and edge cases (e.g., invalid inputs, missing resources).
- **Test the API with Postman**:
  - **Postman Collection**: Access the public collection to test endpoints:
    ```
    https://www.postman.com/insurance-api-1732/workspace/insurance-api-workspace/collection/34393089-e186b1fa-4972-4db4-9acf-8a4ecf1cef77
    ```
  - **Instructions**: Open the link in Postman, or download the collection from the GitHub repo (`postman/Insurance_Purchase_API.postman_collection.json`) and import it via Postman’s "Import" feature.

## Approach
- **Modularity**: Organized code into separate route files (`routes/insurances.js`, `routes/purchases.js`) for maintainability.
- **Data Storage**: Used in-memory arrays for simplicity, per the assignment’s assumption of successful payments.
- **Validation**: Added input validation to ensure robust API behavior.
- **Bonus Feature**: Implemented curated insurances with flexible filtering based on age, gender, and income.
- **Testing**: Wrote comprehensive tests to verify functionality and handle errors.

## Challenges
- **Testing Fix**: Addressed a test failure by exporting the Express app without auto-starting the server.
- **In-Memory Storage**: Data is non-persistent; noted as a limitation for future improvement.
- **File Serving**: Ensured `policy.pdf` is correctly served with error handling for missing files.


## Usage Notes
- Deployed on Render for public access; test with the live URL or locally.
- Assumes successful payment as per assignment instructions.
- Postman collection provides a ready-to-use testing environment.

