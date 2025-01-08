// review / rating /createdAt /ref to tour /ref to user

const mongoose=require('mongoose');
const Tour = require('./tourmodel');
//const   Tour=require('./tourmodel');

const reviewSchema=new mongoose.Schema({
         review:{
             type:String,
             required:[true,'Review can not be empty']
         },
         rating:{
           type:Number,
           Min:1,
           max:5

         },
         createdAt:{
            type:Date,
            default:Date.now(),
            

         },
         tour:{
          type:mongoose.Schema.ObjectId,
          ref:'Tour',
          required:[true,'Review must belong to a tour']


         },
         user:{
          type:mongoose.Schema.ObjectId,
          ref:'User',
          required:[true,'Review must belong to a user']
          

         },


        
/// virtual properties also show up in json and object outputs



 

},
{  // This is the second argument to the schema constructor (options object)
  toJSON: { virtuals: true },
  toObject: { virtuals: true },// calculated but bot show in database
})



reviewSchema.index({tour:1,user:1},{unique:true})




reviewSchema.pre(/^find/,function(next){
 // this.populate({
   //     path:'tour',
     //   select:'name'
      //}).populate({
        //path:'user',
        //select:'name photo'
      //});
      //next();

     this.populate({
        path:'user',
        select:'name photo'
      });
      next();
})


reviewSchema.statics.calcAverageRatings= async function(tourId){
 const stats=await this.aggregate([
    {
      $match:{tour:tourId}
    },
    {
      $group:{
        _id:'$tour',
        nRating:{$sum:1},
        avgRating:{$avg:'$rating'}
      }
    }
  ]);
  //console.log(stats);
  
  const Tour = mongoose.model('Tour');
  console.log(Tour);
  
  if(stats.length>0){
    await Tour.findByIdAndUpdate({_id:tourId},{
  
      ratingQuantity:stats[0].nRating,
      ratingAverage:stats[0].avgRating
  
    })

  }else{
   await Tour.findByIdAndUpdate({_id:tourId},{
  
    ratingQuantity:0,
    ratingAverage:4.5

  })
}

};
reviewSchema.post('save', async function(){
  // this finds tp current review
 // const Tour=mongoose.model('Tour');
 await this.constructor.calcAverageRatings(this.tour);

})

// we dont have documemnt middleware
// findbyidandupdate
//findbyidanddelete
// only query middlewares have 


reviewSchema.pre(/^findOneAnd/,async function(next){
  this.r = await this.model.findOne(this.getQuery());
  

  console.log(this.r);
  next();
})

reviewSchema.post(/^findOneAnd/,async function(){
  // await this.getQuery() does not work here ,query has already executed
  //const Tour = require('./tourmodel');
  //const review = await this.model.findOne(this.r);
 // console.log(this.r);
 //await review.constructor.calcAverageRatings(review.tour);

 
  await this.r.constructor.calcAverageRatings(this.r.tour);



});
const review=mongoose.model('review',reviewSchema);
module.exports=review;
