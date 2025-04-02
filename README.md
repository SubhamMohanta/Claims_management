# AI-Powered Medical Claim Processing System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Bonus Features](#bonus-features)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
This project is an AI-powered medical claim processing system designed to extract and classify key information from medical invoices and discharge summaries. The extracted data is stored in a database and made accessible via a secure API. The system is designed for scalability and is deployed using AWS services.

---

## Features
✅ AI Model for document processing (Extracts relevant information from medical invoices)
✅ Node.js backend for API development
✅ Database integration using MongoDB
✅ AWS Deployment (Lambda, EC2, or containerized solutions)
✅ AWS S3 for document storage
✅ AWS API Gateway for API exposure
✅ Secure and efficient API design
✅ Optional: Frontend dashboard (Next.js) to display claims
✅ Optional: User authentication

---

## Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Model:** Python (TensorFlow, spaCy, or OpenAI API for NLP tasks)
- **Storage:** AWS S3
- **Deployment:** AWS Lambda / ECS / EC2 / Fargate
- **Authentication (Optional):** JWT / OAuth

---

## System Architecture
1. **User uploads a medical invoice** (via API or frontend UI).
2. **Document is stored in AWS S3.**
3. **AI model processes the document** to extract relevant details (e.g., patient name, billing amount, diagnosis).
4. **Extracted data is stored in MongoDB.**
5. **API exposes the extracted information** via secured endpoints.
6. **(Optional) Frontend dashboard displays claim details.**

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- MongoDB (local or Atlas)
- AWS CLI (configured with credentials)

### Clone the Repository
```sh
 git clone https://github.com/your-username/Claims_management.git
 cd ./Claims_management
```

### Install Dependencies
```sh
 npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
MONGODB_URI=<your-mongodb-connection-string>
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
AWS_REGION=<your-aws-region>
S3_BUCKET_NAME=<your-s3-bucket-name>
JWT_SECRET=<your-secret-key>
```

### Start the Backend Server
```sh
 npm run dev
```

---

## API Endpoints
### 1. Upload Invoice
**POST /api/upload**
```json
{
  "file": "<PDF or Image File>"
}
```
_Response:_
```json
{
  "message": "File uploaded successfully",
  "fileUrl": "https://s3.amazonaws.com/..."
}
```

### 2. Extract Invoice Data
**GET /api/extract/:invoiceId**
_Response:_
```json
{
  "patient_name": "John Doe",
  "amount": 5000,
  "date": "2024-03-30",
  "diagnosis": "Flu"
}
```

### 3. Retrieve Processed Claims
**GET /api/claims**
_Response:_
```json
[{
  "id": "1",
  "patient_name": "John Doe",
  "amount": 5000,
  "status": "Processed"
}]
```

---

## Deployment
### Deploy to AWS Lambda with API Gateway
1. **Package the application:**
```sh
zip -r deployment.zip .
```
2. **Deploy using AWS CLI:**
```sh
aws lambda create-function --function-name claimProcessingAI --runtime nodejs18.x --handler index.handler --zip-file fileb://deployment.zip --role arn:aws:iam::your-account-id:role/your-lambda-role
```
3. **Set up API Gateway:**
- Create an API in AWS API Gateway.
- Connect it to your Lambda function.
- Deploy and obtain the API URL.

### Deploy using AWS ECS (Optional)
1. **Build Docker Image:**
```sh
docker build -t medical-claims-api .
```
2. **Push to AWS ECR:**
```sh
aws ecr create-repository --repository-name medical-claims-api
docker tag medical-claims-api:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/medical-claims-api:latest
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/medical-claims-api:latest
```
3. **Deploy using AWS ECS / Fargate.**

---

## Bonus Features
- ✅ **Frontend Dashboard:** Built with Next.js to view claim statuses.
- ✅ **User Authentication:** Secure API access with JWT.
- ✅ **Scalability:** Designed with AWS services for high availability.
