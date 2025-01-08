

//const path=require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Catch uncaught exceptions
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err.name, err.message);
  console.log("Unhandled exception, shutting down...");
  process.exit(1);
});



// Load environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

// Database connection setup
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.log("Database connection error:", err));

// Function to generate a nonce


//app.set('view engine', 'ejs');



// Start the server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err.name, err.message);
  console.log("Unhandled rejection, shutting down...");
  server.close(() => {
    process.exit(1);  // Gracefully shut down the server and exit the process
  });
});



// ... other middleware ...



// ... your routes and other app configurations ...




   // Generate nonce for the request
   //res.render('login.pug', { nonce: nonce, title: 'login' }); // Pass nonce into the template
 
 
 //{
 //   useNewUrlParser:true,
  //  useUnifiedTopology: true,
    
  //  useCreateIndex: true,
  //  useFindAndModify: false,
    
// }

  //SYNCOROUS CODE ARE NOT HANDLED ANYWHERE ARE CALLED UNcaught exceptions
  // uncaught  exceptions

 



//console.log(x);
// when there is an uncaught exception we really crash the applicationbecuase uncaught exception the entire node process is to terminate and the nto be restated