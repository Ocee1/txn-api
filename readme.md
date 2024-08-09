# Transaction API Documentation

## Overview

The Transaction API provides endpoints for user authentication and transaction management. Users can create, view, update, and delete transactions. The API also provides functionalities to view transaction summaries and historical transaction volumes.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
    - [Signup](#signup)
    - [Signin](#signin)
  - [User Profile](#user-profile)
    - [Get Profile](#get-profile)
    - [Update Profile](#update-profile)
    - [Delete Profile](#delete-profile)
  - [Transactions](#transactions)
    - [Create Transaction](#create-transaction)
    - [Get Transactions](#get-transactions)
    - [Get Transaction By ID](#get-transaction-by-id)
    - [Update Transaction](#update-transaction)
    - [Delete Transaction](#delete-transaction)
    - [Get Transaction Summary](#get-transaction-summary)
    - [Get Historical Transaction Volume](#get-historical-transaction-volume)


## Getting Started

### Prerequisites

- Node.js
- MongoDB
- RabbitMQ

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/txn-api.git
    cd txn-api
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=4080
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    RMQ_URL=your-rabbitmq-url
    NODE_ENV=development
    ```

4. Start the development server:
    ```bash
    yarn start:dev
    ```

## API Endpoints

### Authentication

| Endpoint       | Method | Description               | Request Body                                                                                      | Responses                                                                                           |
|----------------|--------|---------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `/api/auth/signup` | POST   | Registers a new user      | ```json { "email": "user@example.com", "password": "password", "firstName": "John", "lastName": "Doe" } ``` | `201 Created` - User successfully created <br> `400 Bad Request` - Validation errors               |
| `/api/auth/signin` | POST   | Authenticates user        | ```json { "email": "user@example.com", "password": "password" } ```                                     | `200 OK` - Authentication successful <br> `401 Unauthorized` - Authentication failed                |

### User Profile

| Endpoint       | Method | Description                            | Request Body                                          | Responses                                                                                           |
|----------------|--------|----------------------------------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `/api/profile`     | GET    | Retrieves the user's profile           | None                                                  | `200 OK` - Profile retrieved successfully <br> `401 Unauthorized` - User not authenticated           |
| `/api/create-transaction-pin`|  POST   | Retrieves the user's profile| ```json { "transactionPin": "5468" } ```              | `200 OK` - Transaction pin created successfully <br> `401 Unauthorized` - User not authenticated           |
| `/api/profile`     | PATCH  | Updates the user's profile             | ```json { "firstName": "John", "lastName": "Doe" } ```| `200 OK` - Profile updated successfully <br> `400 Bad Request` - Validation errors <br> `401 Unauthorized` - User not authenticated |
| `/api/profile`     | DELETE | Deletes the profile of the user        | None                                                  | `200 OK` - Profile deleted successfully <br> `401 Unauthorized` - User not authenticated            |

### Transactions

| Endpoint                                    | Method | Description                              | Request Body                                                                                        | Responses                                                                                           |
|---------------------------------------------|--------|------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `/api/transactions`                             | POST   | Creates a new transaction                | ```json { "amount": 100, "transaction_type": "credit", "description": "Salary" } ```                | `201 Created` - Transaction created successfully <br> `400 Bad Request` - Validation errors <br> `401 Unauthorized` - User not authenticated |
| `/api/transactions`                             | GET    | Retrieves a list of transactions for the authenticated user. Supports pagination through query parameters. | None                                                                                                    | `200 OK` - Transactions retrieved successfully <br> `401 Unauthorized` - User not authenticated      |
| `/api/transactions/{id}`                        | GET    | Retrieves a transaction by its ID        | None                                                                                                    | `200 OK` - Transaction retrieved successfully <br> `404 Not Found` - Transaction not found <br> `401 Unauthorized` - User not authenticated |
| `/api/transactions/{id}`                        | PATCH  | Updates a transaction by its ID          | ```json { "amount": 150, "description": "Updated Salary" } ```                                       | `200 OK` - Transaction updated successfully <br> `400 Bad Request` - Validation errors <br> `404 Not Found` - Transaction not found <br> `401 Unauthorized` - User not authenticated |
| `/api/transactions/{id}`                        | DELETE | Deletes a transaction by its ID          | None                                                                                                    | `200 OK` - Transaction deleted successfully <br> `404 Not Found` - Transaction not found <br> `401 Unauthorized` - User not authenticated |
| `/api/transactions-summary`                     | GET    | Retrieves a summary of transactions                                                                                                    | `200 OK` - Summary retrieved successfully <br> `401 Unauthorized` - User not authenticated          |
| `/api/historical-transaction-volume`            | GET    | Retrieves historical transaction volume data                                                                                                 | `200 OK` - Historical data retrieved successfully <br> `401 Unauthorized` - User not authenticated  |

:

