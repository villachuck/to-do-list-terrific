# To-Do List

Welcome to the To-Do List app for Terrific's test.

## Getting started

Follow next steps:

1. Clone this repository.
2. Add on the "backend" folder a .env file with the following info:

PORT=4000
MONGO_URI=mongodb://localhost:27017/todolist

(If you're using MongoDB Atlas, replace the MONGO_URI with your connection string).

3. Install dependencies

From the root of the project, run the next command to install dependencies for both frontend and backend: "npm install".

4. Run the App

To start both frontend and backend servers concurrently run: "npm run dev".

* Frontend runs at: http://localhost:3000
* Backend API available at: http://localhost:4000/api/toDoList

## How it works?

Create a new to-do item using the text area field at the top.
Each new item will appear below the text area block.
Click on the radio button to reveal the following options:

* Mark as done (checkmark icon).
* Update To-Do List (pencil icon).
* Delete To-Do List (trash can icon).
