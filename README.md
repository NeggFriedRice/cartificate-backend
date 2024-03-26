# CARtificate

Please note this is the back end of the web app. For more information about this app please see the front-end repo which can be found [here](https://github.com/NeggFriedRice/cartificate-frontend)

### What is it?

This repo serves as the back end of the CARtificate web app. It's built using JavaScript and utilises Express and mongoose to do the heavy lifting. Data is stored in MongoDB.

==== Deprecated notes 26/03/2024; app has now been deployed online so local install instructions are no longer relevant ====
### How to set up

- Create a new database in MongoDB
- Create a new user account in MongoDB (under Security -> Database Access)
- Create a .env file in root directory
- Connect to your database via connection string and add newly created database user and password, replacing username and password with the credentials you added to MongoDB
- Run `npm i` to install dependencies
- Specify port in your `.env` file
- Run `nodemon` to start the server
- Head over to the front end portion of the app to start the app [here](https://github.com/NeggFriedRice/cartificate-frontend)

### Dependencies

- cors
- dotenv
- nodemon
- express
- mongoose