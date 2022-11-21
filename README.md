## Description

todo-list API.

Docker is used to organize work with MongoDB. For client-server communication via HTTP, the Express framework is used. Mongoose is used to communicate with MongoDB. Bcrypt is used for hashing passwords. To generate JWT tokens.  
Functional:

1. User registers.
2. The user logs in.
3. The user can save his tasks in them (task description, start date, end date of the task).
4. The user can change his tasks (task description, completion date, start date, completed or not completed).
5. The user can delete his tasks.
6. The user has the ability to filter tasks by the completed field. Implemented pagination.

## Running the app

```bash
# Copy local.json file to config folder.

# Downloading the database image and running the image.
$ docker-compose up

# Start the server.
$ npm run start


```

## Test

Documentation (Swagger UI) is available at: [link] http://localhost:3000/api/
