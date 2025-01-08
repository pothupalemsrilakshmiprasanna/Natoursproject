//const fs=require('fs');



const Tour=require('./../model/tourmodel'); //
//const APIFeatures=require('./../utilities/apiFeatures'); 
const catchAsync=require('./../utilities/catchAsync')   
const AppError=require('./../utilities/appError')  
const  factory=require('./handlerFactory');         
exports.aliasTopTours=(req,res,next)=>{
        
       req.query.limit= '5';
       req.query.sort='-ratingAverage,price';
       req.query.fields='name,price,ratingAverage,summary,difficulty';
       next();
};

//const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
       
exports.checkId=(req,res,next,val)=>{
  console.log(`tour id is ${val}`);
  //if(req.params.id*1>tours.length){
   // return res.status(404).json({
    //  status:'fail',
    //  message:'Invalid Id'
   // });
    
 // }
  next();

};
//exports.checkBody=(req,res,next)=>{
 // if(!req.body.name||!req.body.price){
  //  return res.status(400).json({
   //   status:'fail',
    //  message:'Missing name or price in the request body'
    
      
 // });
//}
//next();
//}
exports.getAllTours=factory.getAll(Tour);
//catchAsync(async(req,res,next)=>{
  //console.log(query);
    //console.log(req.requestTime);
    // build query
     
     // c field limiting
    // projecting
    // d PAGINATION
     // console.log(queryObj);
     //const tours=await Tour.find()
     //.where('duration').equals(6)
    // .where('difficulty').equals('eaasy');
    // EXEXUTE QUERY

    //const features=new APIFeatures(Tour.find(),req.query)
    //.filter()
    //.sort()
    //.limitFields()
    //.paginate();
   // const tours=await features.query;


  // SEND  RESPONSE
   //res.status(200).json({
     // status:'success',
      //requestedAt:req.requestTime,
      //results:tours.length,
      //data:{
       // tours
      //}
    //})
  //});
    //try{
    
  

    //}catch(err){
      //console.log(err);
      //res.status(404).json({
       // status:'fail',
        //message:err.message
      //})
    //}
    
  //}


 exports.gettour=factory.getOne(Tour,{path:'reviews'});
 //catchAsync(async(req,res,next)=>{
   //console.log(req.params);
   // const id=req.params.id || req.body.id;
    
 //const  tour=tours.find(el=>el.id===id)
 

 
 // const tour=await Tour.findById(req.params.id).populate('reviews');
  
  //if(!tour){
    //return next(new AppError('no tour found with that id',404));
  //}

  // Example handler for "no tour found"
//const handleTourNotFound = (id) => {
  //const message = `No tour found with the provided id: ${id}.`;
  //return new AppError(message, 404);
//};

// Usage in the controller
//if (!tour) {
  //return next(handleTourNotFound(req.params.id));
//}


 // res.status(200).json({
   //status:'success',
    //data: {
     //tour
    //}
  //})
//});
  
      //   try{
                     
   
           //  }catch(err){
             //   res.status(404).json({
               //  status:'fail',
                 //message:err
                   //   });

            //}
     //}
  

  
 exports.createtour=factory.createOne(Tour);
 // exports.createtour=catchAsync(async(req,res,next)=>{
   // const newTour=await Tour.create(req.body);

   // res.status(201).json({
    //status:'success',
    // data: {
      //tour:newTour
      // }
      //}); 
   // try{
                         
          

    //}// catch(err){
      //console.log(err);
      //res.status(400).json({
        //status:'fail',
        //message:err
      //})
    //}
 // })
  
    
    //const newId=tours[tours.length-1].id+1;
   // const newTour=Object.assign({id:newId},req.body);
   // tours.push(newTour);
    //fs.writeFile(
      //`${__dirname}/../dev-data/data/tours-simple.json`,
      //JSON.stringify(tours),
      // (err) => {



 //const  newTour=new Tour();
      //newTour.save();


      // }
    // );
     

    
  
  exports.updateTour= factory.updateOne(Tour);
  //catchAsync(async(req,res,next)=>{
    //console.log(req.body);

    //const tour= await Tour.findByIdAndUpdate(req.params.id, req.body,{
      //new:true,
     //runValidators:true
      
    //});
    
   // const { ratingAverage, difficulty, name } = req.body;

  //  if(!tour){
    //  return next(new AppError('no tour found with that id',404));
    //}
   
  
  //  res.status(200).json({
    //  status:'success',
      //data:{
       // tour
      //}
    //})
  //});
   // try{
     
    //}catch(err){
      //res.status(404).json({
       // status:'fail',
        //message:err
      //})
    //}
        exports.deleteTour=factory.deleteOne(Tour);
        /// calling one function and returned another function
        // in javascript we called closures that inner function calling outer function but it was returned
    
    //}
   // exports.deleteTour=catchAsync(async(req,res)=>{
   //   const tour= await Tour.findByIdAndDelete(req.params.id);
     // if(!tour){
       // return next(new AppError('no tour found with that id',404));
      //}
    
        //res.status(204).json({
          //status:'success',
          //data:null
       // })
     // });
     // try{
        
      //}catch(err){
       // res.status(404).json({
         // status:'fail',
          //message:err
        //})
      //}
      //}
    exports.getTourStats=catchAsync(async(req,res,)=>{

      const stats=await Tour.aggregate([
        {
          $match:{ratingAverage:{$gte:4.5}}
        },
        {
          $group:{
            _id:{$toUpper:"$difficulty"},
            numTours:{$sum:1},
            numRatings:{$sum:'$ratingQuantity'},
            avgRating:{$avg:"$ratingAverage"},
            avgPrice:{$avg:"$price"},
            minPrice:{$min:"$price"},
            maxPrice:{$max:"$price"},
          }
        },
        {
          $sort:{ avgPrice: 1}
        },
        {
          $match:{_id:{$ne:'EASY'}}
        }

      ]);

      res.status(200).json({
        status:'success',
        data:{
         stats,
        }
      })
    })
      //try{
         

        //}catch(err){
          //res.status(404).json({
            //status:'fail',
            //message:err
        //})

      //}
    //}

    exports.getMonthlyPlan=catchAsync(async(req,res)=>{
      const year=req.params.year*1;
        const plan=await Tour.aggregate([

          {
            $unwind:"$startDates"
          },
          {
            $match:{
              startDates:{
                $gte:new Date(`${year}-01-01`),
                $lte:new Date(`${year}-12-31`)
              
              
              }
            }
          },
          {
            $group:{
              _id:{$month:'$startDates'},
              numTourStarts:{$sum:1},
              tours:{$push:'$name'}

            }
          },
          {
              $addFields:{month:'$_id'}

          },
          {
            $project:{
              _id:0
            }
          },
          {
            $sort:{numTourStarts:-1}
          },
          {
            $limit:6
          }


        ])
        res.status(200).json({
          status:'success',
          data:{
           plan,
          }
        })
      })
     // try{
        
      //}catch(err){
        //res.status(404).json({
          //status:'fail',
          //message:err
      //})
      //}
    //}





    exports.getToursWithin=catchAsync( async(req,res,next)=>{
      const { distance,latlng,unit}=req.params;

     const [lat,lng]= latlng.split(',');
     const radius=unit==='mi'? distance/3963.2:distance/6378.1
     if(!lat || !lng ){
      next(new AppError('please provide latitude and longitude in the format lat,lng',400))
     }
     /// geospacial operator called geo within
     const tours=await Tour.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}});
     res.status(200).json({

      status:'success',
      results:tours.length,
      data:{
        data:tours
      }
     })

    });


    exports.getDistances=catchAsync(async(req,res,next)=>{

      const { latlng,unit}=req.params;

      const [lat,lng]= latlng.split(',');
      const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
     
      if(!lat || !lng ){
       next(new AppError('please provide latitude and longitude in the format lat,lng',400))
      }
  
      const distances=await Tour.aggregate([
        {
          $geoNear:{
            near:{
              type:'Point',
              coordinates:[lng*1,lat*1]
            },
            distanceField:'distance',
            spherical:true,
            distanceMultiplier:0.001


          }
        },
        {
          $project:{
            distance:1,
            name:1
          }
        }
      ]);
      res.status(200).json({

        status:'success',
        data:{
          data:distances
        }
       });

     });
   