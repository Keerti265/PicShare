PicShare
Overview
PicShare is a fictional web application that allows users to share pictures with the world, view pictures shared by others, and save their favorite pictures. It simplifies the user login process by using a username-based login system without the need for password management or registration. This application is designed to showcase basic web development skills, including backend development with Node.js and Express, frontend development with React, and integration with a MongoDB database.

Features
1. User Authorization
Simplified Login System: Users log in by providing only a username. The backend handles the logic for checking if the username exists:
If the username exists, the corresponding user ID is returned.
If the username does not exist, a new user record is created, and the user ID is returned.
Token-Based Authorization: The user ID serves as a token, which is stored in the frontend's local storage and used for authorization in subsequent API calls.
2. Home Page
When Not Logged In
Header:
Displays the "PicShare" logo on the left.
Shows a "Log In" button on the right, which redirects users to the login page.
Main Content:
Displays a message encouraging users to log in.
Shows a list of pictures uploaded by all users, sorted by upload date in descending order.
Supports lazy loading, where new pictures load as the user scrolls down.
After Logging In
Header:
Includes a "Share Pic" button, allowing users to share new pictures.
Main Content:
The picture list now includes a heart icon on each picture item. Clicking the heart toggles whether the picture is added to or removed from the user's favorite list.
3. Favorite Page
Favorites List: Displays the list of pictures the user has marked as favorites.
Favorite Toggle: Clicking the heart icon on a favorite picture removes it from the list.
4. Picture Modal
Detailed View: Clicking on a picture in the list opens a modal displaying the picture in detail.
Picture Info: Shows the username of the user who shared the picture and the date it was uploaded.
5. Share A New Picture
Picture Sharing Modal: Users can share a new picture by providing a picture URL and a title. Once shared, the picture is immediately visible in the home page picture list.
Project Structure
Backend (Node.js with Express)
Entry Point: server.js - Initializes the Express server and connects to the MongoDB database.
Routes:
authRoutes.js: Handles user login and returns the user ID.
pictureRoutes.js: Manages picture uploads, fetches pictures, and handles favorite toggling.
Models:
userModel.js: Defines the schema for user data.
pictureModel.js: Defines the schema for picture data.
Frontend (React)
Main Components:

App.js: Handles routing between pages.
HomePage.js: Displays the picture list and login promotion.
LoginPage.js: Manages user login.
FavoritePage.js: Shows the user's favorite pictures.
PictureModal.js: Displays a detailed view of a picture.
SharePictureModal.js: Allows users to share a new picture.
CSS and Styling:

App.css: Main stylesheet for the application.
styles/: Contains additional CSS files for individual components.

Technology Stack
Frontend: React, HTML, CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for ORM)
Version Control: Git, GitHub
Setup and Installation
Prerequisites
Node.js: Ensure that Node.js (version 18.17.1 or later) is installed.
MongoDB: Install MongoDB (version 4.0.0 or later) and ensure it is running.

Backend Setup
Clone the repository:
git clone https://github.com/Keerti265/PicShare.git
cd picshare


.env
MONGODB_URI=mongodb://localhost:27017/picshare
PORT=5000


API Endpoints

User Authentication
POST /auth/login: Logs in the user and returns the user ID.
Pictures
GET /pictures: Fetches the list of all pictures.
POST /pictures: Allows logged-in users to share a new picture.
POST /pictures/:id/favorite: Allows logged-in users to add/remove a picture from their favorites.
Favorites
GET /favorites: Fetches the list of the current user's favorite pictures.

