
const AppError =require('./../utilities/appError')
const handleCastErrorDB= (err) =>{
  const message=`Invalid ${err.path}:${err.value}.`;
  return new AppError(message,400);
}


const handleDuplicateFieldDB=(err)=>{
//  const errors=Object.values(err.errors).map((el)=>`${el.message}`);
  
  const value=err.message.match(/"([^"]*)"/[0]);
  //console.log(value);
  const message=`Duplicate feild value : ${value}. pLease use another value! `;
    return new AppError(message, 400);
}



const handleValidationErrorDB=(err)=>{
    const errors=Object.values(err.errors).map((el)=>`${el.message}`);
  const message=`Invalid input data. ${errors.join('. ')}`;
  return new AppError(message,400);

};


const handleJWTError=()=> new AppError('Invalid token.Please log in again',401);
const handleJWTExpiredError=()=> new AppError('Your token has Expired!.please log in again.',401);
const sendErrorDev = (err, req, res) => {
  // api
  //const originalUrl = req.originalUrl || ''; // Fallback to an empty string
  if (req.originalUrl.startsWith('/api')) {
   return  res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } 
    //rendered website
   return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }


const sendErrorprod=(err,req,res)=>{
  //operational ,trusted error: send message to client
  if (req.originalUrl.startsWith('/api')) {
  if(err.isOperational){
   return  res.status(err.statusCode).json({
      status:err.status,
      message:`${err.message}`,

    
    });
/// programming or other unknown error:don't leak error details
  }
    console.log('ERROR',err);
    // send geneeric message
    return  res.status(500).json({
      status:'error',
      message:'something went very wrong'
    })
    
  
    
  } 
  ///// rendered website
   if(err.isOperational){
   return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    })

  }
  
  
    //2 log error
    
    console.log('ERROR',err);
    //3  send generate message
   return  res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: "please try again later"
    });
  

  
}
 

module.exports=(err,req,res,next)=>{
        // console.log(err.stack);
         err.statusCode=err.statusCode || 500;
         err.status=err.status || 'error';
         if(process.env.NODE_ENV==='development'){
          sendErrorDev(err,res);
         
        } else if(process.env.NODE_ENV==='production'){

            let error= Object.create(err);
           //   let error={...err};
           if(error.name==='CastError')  error=handleCastErrorDB(error);
           if(error.code===11000) error=handleDuplicateFieldDB(error);
           if(error.name==='ValidationError') error=handleValidationErrorDB(error);
           if(error.name==='JsonWebTokenError') error=handleJWTError();
           if(error.name==='TokenExpiredError') error=handleJWTExpiredError();
          sendErrorprod(error,res);
         
        }
       }