
const catchAsync=require('./../utilities/catchAsync');
const AppError=require('./../utilities/appError');
const APIFeatures=require('./../utilities/apiFeatures'); 


exports.deleteOne=Model=>catchAsync(async(req,res,next)=>{
          const id= req.params.id.trim();
         const doc= await Model.findByIdAndDelete(id);
         if(!doc){
           return next(new AppError('no tour found with that id',404));
         }
       
           res.status(204).json({
             status:'success',
             data:null
           })
         });
exports.updateOne=Model=>catchAsync(async(req,res,next)=>{
 // console.log(req.body);
 const id=req.params.id.trim();

  const doc= await Model.findByIdAndUpdate(id, req.body,{
    new:true,
   runValidators:true
    
  });
  
 // const { ratingAverage, difficulty, name } = req.body;

  if(!doc){
    return next(new AppError('no document found with that id',404));
  }
 

  res.status(200).json({
    status:'success',
    data:{
     data: doc
    }
  })
});


exports.createOne=Model=>catchAsync(async(req,res,next)=>{
         const doc=await Model.create(req.body);
     
         res.status(201).json({
         status:'success',
          data: {
           data:doc
            }
           }); 
         });
exports.getOne=(Model,popOptions)=>catchAsync(async(req,res,next)=>{

         const id=req.params.id.trim();


        
         let query=Model.findById(id);
         if(popOptions) query=query.populate(popOptions);
              const doc=await query;

  
          if(!doc){
              return next(new AppError('no tour found with that id',404));
           }

  
       
       
         res.status(200).json({
          status:'success',
           data: {
            data:doc
           }
         })
       });

exports.getAll=Model=>catchAsync( async(req,res,next)=>{
         // to allow for nested get reviews on tour
         let filter={};
         if(req.params.tourId) filter={tour:req.params.tourId};
         const features=new APIFeatures(Model.find(),req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();
        // const doc=await features.query.explain();
      const doc =await features.query;
     
       // SEND  RESPONSE
        res.status(200).json({
           status:'success',
           //requestedAt:req.requestTime,
           results:doc.length,
           data:{
             data:doc
           }
         })
       });