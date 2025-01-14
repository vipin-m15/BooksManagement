# Books Management Node.js Application

## Overview

This Node.js application manages books with separate functionalities for Admin and Users. It supports book management, user registration, authentication, and more.

## Features

### Admin Functionality

#### 1. Automatic Admin Account Creation

- An admin account is automatically created during project initialization.

#### 2. Admin Login

- Admin can log into the system using their credentials.

#### 3. Book Management

- **Add Book**: Admin can add new books with details:
  - Book Name
  - Author Name
  - Price
  - Description
- **Update Book Quantity**: Admin can update the quantity of a book.
- **CRUD Operations**: Admin can create, read, update, and delete book entries.

#### 4. Image Storage

- All book images and relevant images are stored in an AWS S3 bucket.

### User Functionality

#### 1. User Registration

- Users can register with details such as Name, Age, Phone Number, Email, Username, and Profile Picture.
- After registration, users undergo an OTP verification process:
  - A 4-digit OTP is generated and stored in the database.
  - Users must verify the OTP to complete registration.

#### 2. User Login

- Post OTP verification, users can log into the system.
- Upon successful login, users can:
  - View a list of books along with their available quantities.
  - Search for books by name or author.
  - Apply filters (e.g., price) to refine search results.
  - View details of a specific book.
  - Add books to their cart.
  - Modify the cart by:
    - Increasing or decreasing book quantities.
    - Removing books from the cart.

#### 3. Address Management

- Users can manage multiple addresses:
  - Add a new address.
  - Edit an existing address.
  - View address details.
  - Delete an address.

#### 4. Logout

- Users can log out of the system.

### General Notes

#### Image Storage

- All images (e.g., profile pictures, book images) are stored in an AWS S3 bucket.

#### Database

- MongoDB is used for database management.

## Setup Instructions

1. Clone the repository from GitHub.
2. Install the required dependencies using `npm install`.
3. Configure environment variables for database connection and AWS S3.
4. Run the application using `npm start`.

## API Documentation

Refer to the Postman collection shared in the project repository for detailed API endpoints and testing.
