### E-commerce API with Express, TypeScript, MongoDB, and Mongoose

## Project Overview
This project is an e-commerce application built using Express and TypeScript, with MongoDB for data management using Mongoose. The application includes functionality for managing products and orders, ensuring data integrity through validation with Zod.

## Features
1. Create, read, update, and delete products
2. Search products by name or tags
3. Create and view orders
4. Validate request data using Zod

## Technologies Used
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

## Installation
1. Clone the repository
2. Install dependencies
3. Set up your MongoDB database and configure environment variables (see Configuration).
4. Start the server

##API Endpoints
**Product Management**

- "Create a New Product"
Endpoint: /api/products
Method: POST

- "Retrieve a List of All Products"
Endpoint: /api/products
Method: GET

- "Retrieve a Specific Product by ID"
Endpoint: /api/products/:productId
Method: GET

- "Update Product Information"
Endpoint: /api/products/:productId
Method: PUT

- "Delete a Product"
Endpoint: /api/products/:productId
Method: DELETE

- "Search a Product"
Endpoint: /api/products?searchTerm=iphone
Method: GET

**Order Management**

- "Create a New Order"
Endpoint: /api/orders
Method: POST

- "Retrieve All Orders"
Endpoint: /api/orders
Method: GET

- "Retrieve Orders by User Email"
Endpoint: /api/orders?email=level2@programming-hero.com
Method: GET

## Validation
Request data for product and order creation and updating operations is validated using Zod to ensure adherence to the defined data models. Validation errors are handled gracefully, providing meaningful error messages in API responses.

Certainly, I didn't do the **Inventory Update**.


Live server link- assignment2-nine-smoky.vercel.app
