# Natours Project

A web application for a tour booking company that offers features like user authentication, tour listings, bookings, reviews, and more. Built using Node.js, Express, MongoDB, and Pug templates.  

---


## Table of Contents

1. [Demo / Screenshots](#demo--screenshots)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
5. [Project Structure](#project-structure)  
6. [Configuration](#configuration)  
7. [Usage](#usage)  
8. [Contribution Guidelines](#contribution-guidelines)  
9. [License](#license)  
10. [Contact](#contact)


## Demo / Screenshots


<img width="1836" height="853" alt="Screenshot 2025-09-22 075742" src="https://github.com/user-attachments/assets/af1f9660-b9f0-4080-a2d6-a92580266ede" />
<img width="1305" height="810" alt="Screenshot 2025-09-22 075753" src="https://github.com/user-attachments/assets/453e8c5d-c7b5-4267-9420-ced4ed0bbe10" />
<img width="1788" height="704" alt="Screenshot 2025-09-22 075813" src="https://github.com/user-attachments/assets/1fe53d07-8a0d-4ff1-bedd-02404a0e74c8" />



## Features

- User signup, login, authentication & authorization  
- View list of tours, single tour details  
- Booking a tour  
- Leave reviews for tours  
- Admin functionalities (e.g. managing tours, users, reviews)  
- Error handling, input validation  
- Security best practices (e.g. rate limiting, sanitization)  


## Tech Stack

| Layer                 | Technologies used                                                   |
|------------------------|---------------------------------------------------------------------|
| Back-End Framework     | Node.js, Express                                                    |
| Database              | MongoDB (Mongoose ORM)                                              |
| Templating / Views     | Pug (formerly Jade)                                                 |
| Environment / Config   | dotenv or config.env                                                 |
| Utilities & Helpers    | Custom utility functions, middleware for error handling, etc.        |


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)  
- [npm](https://www.npmjs.com/) or [Yarn]  
- [MongoDB](https://www.mongodb.com/) (local or hosted, e.g. Atlas)  

### Installation

```bash
# Clone the repo
git clone https://github.com/prasanna14200/Natoursproject.git

cd Natoursproject

# Install dependencies
npm install

Configuration

Rename .config.env.example (if present) to config.env.

Define the following environment variables in config.env:
PORT=3000
DATABASE_LOCAL=<your local MongoDB URI>
DATABASE=<your production or remote MongoDB URI>
JWT_SECRET=<your JSON Web Token secret>
JWT_EXPIRES_IN=<token expiry time>
EMAIL_USERNAME=<if sending emails>
EMAIL_PASSWORD=<if sending emails>
Adjust or add any other env vars your app requires (review app.js or server.js for references).

Running Locally
npm run dev


This should start the application in development mode (with nodemon, etc.) at http://localhost:3000/ (or whichever port you've configured).
Usage

To seed sample data (if you have seed scripts), run something like npm run seed (create the script if not present).

Access user, reviews, and tour routes via the endpoints defined in routers (check routers/).

Use error handling and logging as per controllers and utilities.


Contribution Guidelines

Fork the repository.

Create a new branch: git checkout -b feature/YourFeatureName.

Make your changes / improvements.

Test thoroughly.

Open a Pull Request, with description of what you changed & why.

Ensure code follows consistent style & includes comments.

License
MIT lICENSE

Contact

Author: Prasanna

GitHub: prasanna14200

Email: prasannaprasanna14200@gmail.com





