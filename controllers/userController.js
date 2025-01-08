const AppError = require('../utilities/appError');
const User=require('./../model/userModel');
const catchAsync=require("./../utilities/catchAsync")
const factory=require('./handlerFactory');

const filterObj=(obj,...allowedFields)=>{
  const newObj={};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el]=obj[el];
    
  });
      return newObj;



}
      
      exports.getAllusers=factory.getAll(User); 
      //catchAsync(async( req,res,next)=>{
        //  const users=await User.find();


          // SEND  RESPONSE
          // res.status(200).json({
            //  status:'success',
              //requestedAt:req.requestTime,
              //results:users.length,
              //data:{
               // users
              //}
            //})
          //})
          /// faking the id that is coming from the parameter.
         exports.getme=(req,res,next)=>{
          req.params.id=req.user.id;
          next();
         }
       

          exports.updateme=catchAsync(async(req,res,next)=>{
            //  create a error if user posts password data
             if(req.body.password || req.body.passwordConfirm){
              return next(new AppError('This route is not for password updates.please use/ updatemypassword',400));
             }
          
            //2 filtered out unwanted fields names that are not allowed to be updated
            const filterbody=filterObj(req.body,'name','email');
              //3 update the document
            const updateduser=await User.findByIdAndUpdate(req.user.id,filterbody,{
              new:true,
              runValidators:true,
            }); /// it provides a validation error it doesn't use  we have give all things then use findbyidandupdate
           
            

            res.status(200).json({
              status:'success',
              data:{
                user:updateduser
              }
            })
            // 
          });
        
       
      exports.deleteme=catchAsync(async(req,res,next)=>{
                await User.findByIdAndUpdate(req.user.id,{active:false})

                res.status(204).json({
                  status:'success',
                  data :null
                })
      })
       
       
       
       exports.getuser=factory.getOne(User);
       //(req,res)=>{
         //res.status(500).json({
           //status:'error',
           //message:'This is not yet defined'
       
      //   });
       
        //};
       
       exports.createuser=(req,res)=>{
         res.status(500).json({
           status:'error',
           message:'this route is not defined ! please use/sighnup instead'
       
         });
       
        };
       ///  do not update passwords with this?
     exports.updateuser=factory.updateOne(User);
     //(req,res)=>{
     
       //res.status(500).json({
         //  status:'error',
           ///message:'This is not yet defined'
       
         //});
       
      //  };
       
       
       
       exports.deleteuser=factory.deleteOne(User)
       
       
       
       //(req,res)=>{
         //res.status(500).json({
           //status:'error',
           //message:'This is not yet defined'
       
         //});
       
       //};