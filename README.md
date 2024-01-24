# Project Name README

## Overview

This project is a web application built with Node.js, Express, and MongoDB, providing endpoints for user and blog-related functionalities. Below is an overview of the project's structure and API endpoints.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Endpoints](#api-endpoints)
    - [1. User Routes](#1-user-routes)
    - [2. Blog Routes](#2-blog-routes)
4. [Error Handling](#error-handling)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-repo
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file and set the necessary environment variables. Refer to the sample `.env.sample` file.**

5. **Start the application:**

    ```bash
    npm start
    ```

## Configuration

Make sure to set up your environment variables in the `.env` file. Here is a sample configuration:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database
```

# API Endpoints

## 1. User Routes

### 1.1. Register a User

- **Endpoint:** `POST /user/register`
- **Description:** Register a new user.
- **Request Body:**
    - `username`: User's username
    - `password`: User's password

### 1.2. Login

- **Endpoint:** `POST /user/login`
- **Description:** Authenticate and login a user.
- **Request Body:**
    - `username`: User's username
    - `password`: User's password

### 1.3. Logout

- **Endpoint:** `POST /user/logout`
- **Description:** Logout the currently authenticated user.

## 2. Blog Routes

### 2.1. Get All Blogs

- **Endpoint:** `GET /blog`
- **Description:** Retrieve all blogs.
- **Response:**
    - `user`: Current user (if authenticated)
    - `blogs`: Array of blog objects sorted by creation date.

### 2.2. Create a Blog

- **Endpoint:** `POST /blog/create`
- **Description:** Create a new blog.
- **Request Body:**
    - `title`: Blog title
    - `content`: Blog content

### 2.3. Get Single Blog

- **Endpoint:** `GET /blog/:id`
- **Description:** Retrieve a single blog by ID.
- **Response:**
    - `blog`: Blog object

### 2.4. Update a Blog

- **Endpoint:** `PUT /blog/:id`
- **Description:** Update a blog by ID.
- **Request Body:**
    - `title`: Updated blog title
    - `content`: Updated blog content

### 2.5. Delete a Blog

- **Endpoint:** `DELETE /blog/:id`
- **Description:** Delete a blog by ID.

# Error Handling

If an error occurs during the API request, the server will respond with a 500 status code, and an error message will be displayed.

For any issues or questions, feel free to contact the project maintainers.
