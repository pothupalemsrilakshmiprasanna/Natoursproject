
//const express = require('express');
const review=require('./../model/reviewmodel') 
//const catchAsync=require('./../utilities/catchAsync')   
const  factory=require('./handlerFactory');   

exports.setTourUserids=(req,res,next)=>{
  
   /// allow nested routes
   if(!req.body.tour) req.body.tour=req.params.tourId;
   if(!req.body.user) req.body.user=req.user.id;
   next();

}
   

exports.createreview=factory.createOne(review);

//catchAsync(async(req,res,next)=>{

  //       const newreview=await review.create(req.body);
     
       ///  res.status(201).json({
         //status:'success',
          //data: {
           //review:newreview
            //}
           //}); 
         //});

 exports.getAllreviews=factory.getAll(review);
 
 //catchAsync(async(req,res,next)=>{
   //                 let filter={};
     //               if(req.params.tourId) filter={tour:req.params.tourId};
       //           const reviews=await review.find(filter);
         //         res.status(200).json({
           //           status:'success',
         //
           //           results:reviews.length,
             //         data:{
               //         reviews
                 //     }
                   // })
                  //});
        exports.getreview=factory.getOne(review);
       
        exports.updateReview=factory.updateOne(review);
        exports.deleteReview=factory.deleteOne(review);
       