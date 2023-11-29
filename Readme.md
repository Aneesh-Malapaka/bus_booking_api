
# Bus Booking API

The Bus Booking API is a Node.js-based backend system designed to facilitate bus reservation and management. It provides endpoints for user and admin authentication, bus details retrieval, and seat bookings. Key features and components include:


## Features

- Authentication:

    - Separate registration and login routes for users and admins.
    - User authentication with bcrypt-hashed passwords for secure login.
    - Admin authentication with unique email addresses and company details.

- Bus Management:

    - Dynamic creation of tables for registered users and admins.
    - Admins can add buses with details such as name, number, type, fare, and route.
    - Bus information stored in MySQL tables, allowing for efficient retrieval.

- Session Handling:

    - Integration of express-session for user sessions.
    - Use of express-mysql-session for storing session data in MySQL for persistence.
    
- Booking System:

    - Creation of tables for bookings and reserved seats.
    - Users can select seats, providing details like date, time, and bus specifics.
    - Bookings recorded with unique IDs, linking to buses and user details.

- Database Management:

    - Implementation of MySQL queries for database interaction.
    - Tables created for users, admins, buses, bookings, and reserved seats.




## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>

2. **Navigate to the Backend Folder:**

    ```bash
    cd backend

3. **Install Dependencies:**

    ```bash
    npm install

4. **Database Setup:**

Ensure you have MySQL installed and running.

Configure MySQL connection details in backend/db.js.

    ```
    const conn = mysql.createConnection({
        host: "localhost",
        user: "your-username",
        password: "your-password",
        database: "bus_api_db",
    });

Run the SQL queries in your MySQL console or use a tool like MySQL Workbench to create the necessary tables. The SQL queries are located in the relevant route files or can be found in backend/db_setup.sql.

5. **Run the Application:**

    ```bash
    npx nodemon server.js

The API will be accessible at http://localhost:3030.


- Use Postman API to test the api endpoints present in the route files.
- The body is raw type and json data to be used. 

## More In progress..
