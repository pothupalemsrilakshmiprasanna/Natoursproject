const path =require('path');
const express=require('express');
const morgan = require('morgan');
const rateLimit=require('express-rate-limit')
const helmet=require('helmet');
const mongosanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const AppError=require('./utilities/appError');
const globalerror=require('./controllers/errorController')
const tourRouter=require('./routers/tourRouters');
const userRouter=require('./routers/userRouters');
const reviewRouter=require('./routers/reviewRouter')
const viewRouter=require('./routers/viewRouter')
//const authController=require('./controllers/authController')
const cookieParser=require('cookie-parser');
const cors=require('cors');

const app=express();
// template engine==plug, to render website
// express automatically the most common engine out of the box
// pug templates are also called views in express. views in the model view controller architecture\\\\
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public')));
 // To handle JSON body in POST requests


/// body parser reading data from the body into req.body
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
/// api limiting   // limit requests from same api
const limiter=rateLimit({
  max :100,               /// help us to prevent denial of service ans also brute force attacks
  windowMs:60*60*1000,/// allow 100 requests in 1hr
  message:'Too many requests from this Ip ,please try again'
})
app.use('/api',limiter);

// data sanitization against NoSQL query injection

app.use(mongosanitize());/// by removing the teq.body these mongo operators do not work then admin should not be login without a email proble mwill be resolved
// data sanitization against xss cross-site scripting attacks.

app.use(xss());// 
// this will clean any malicious code from input

app.use(cors({
  origin: 'http://localhost:8000',  // Replace with your frontend URL  // Replace with your frontend URL
  credentials: true,  // Allow cookies and other credentials
}));
//app.use(cors());
app.set('view cache', false);  // Disable template caching in development
app.use(helmet());

// prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration','ratingQuantity','ratingAverage','difficulty','price'
  ]
}));
//app.use('/js', express.static(path.join(__dirname, 'public')));
app.use(
  helmet({
      contentSecurityPolicy: {
          directives: {
              'script-src': [
                  "'self'",
                  "'unsafe-inline'",
                  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
                  'https://tile.openstreetmap.org',
                  'https://*.cloudflare.com',
                  'https://*.stripe.com', 
                  'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
                  'https://cdnjs.cloudflare.com',
                  'https://api.mapbox.com',
                  'https://unpkg.com',
                  'https://m.stripe.network',
                  'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'

                   ],
                  
              'style-src': [
                  "'self'",
                  'https://*.googleapis.com',
                  'https://unpkg.com',
                  'https://*.googleapis.com',
                  'https://tile.openstreetmap.org',
                  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
              ],
              'img-src': [
                  "'self'",
                  'data:',
                  'https://*.openstreetmap.org',
                  'https://unpkg.com',
              ],
              'connect-src': [

              'https://unpkg.com',
              'https://tile.openstreetmap.org',
              'https://*.stripe.com',
              'https://bundle.js:*',
              'ws://127.0.0.1:*/'



            ]
              

              
              
          },
      },
  })
);




// test middleware
app.use((req,res,next)=>{
  req.requestTime=new Date().toISOString();
 console.log(req.cookies);

 //console.log(res);
//  console.log(x);
  next();
});
// routes


//// mouting
app.use('/',viewRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);

//routes
app.set('view cache', false);  // Disable template caching in development
app.use((req, res, next) => {
  console.log('User:', res.locals.user); // Log the user object after the auth check
  next();
});


app.all('*',(req,res,next)=>{
  next(new AppError(`can't find ${req.originalUrl} on this server`,404));
});




app.use(globalerror)

module.exports=app;


// ratelimiter does count the no.of requests coming from the  one ip  when there are two many requests block the request 
//helmet documentation.
//mailtrap
//  data sanitation -- to clean all the data into the application from malicious code 
// hpp to remove duplicate parameters