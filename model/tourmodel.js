const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');
//const User=require('./userModel')
const review=require('./reviewmodel')
const tourSchema=new mongoose.Schema({
         name: {
             type:String,
             required:[true,"A tour must have a name"],
             unique:true,
             trim:true,
             maxlength:[40,'A tour name must have less than or equal 40 characters'],
             minlength:[10,'A tour name must have more than or equal  characters'],
            // validate:[validator.isAlpha,'Tour name must only contain characters']
         },
          slug:String,
            duration:{
             type:Number,
             required:[true,"A tour must have a duration"]

            },
           maxGroupSize:{
            type:Number,
            required:[true,"A tour must have a group size"]

           },
           difficulty:{
            type:String,
            required:[true,"A tour must have a difficulty"],
            enum: {
            values:['easy','medium','difficult'],
            message : 'Difficulty must be one of \'easy\', \'medium\', or \'difficult\'. ',
          },
         },
      
            ratingAverage:{
             type:Number,
             default:4.5,
             min: [1, 'rating must be above 1.0'],
             max: [5, 'rating must be below 5.0'],
             set:val=>Math.round(val*10)/10//// 4.666666,46.666,47,4.7
     
         },
            ratingQuantity:{
            type:Number,
            default:0
         },
            price :{
             type:Number,
             required:[true,"A tour must have a price"]
         },
            priceDiscount:{

          type:Number,
          validate:{
            // this only points currnt doc on new document creation
          validator:function(val){
            return val<this.price;
          },
          message:'discount price {{VALUE}}should be below regular price'
         }
      },
          summary:{
            type: String,
            trim:true,
            required:[true,"A tour must have a description"],
             
         },
         description:{
            type:String,
            trim:true

         },
         imageCover:{
            type:String,
            required:[true,'A tour must have a image cover']
         },
         images:[String],
         createdAt:{
            type:Date,
            default:Date.now(),
            select:false
         },
         startDates:[Date],
         secretTour:{
            type:Boolean,
            default:false
         },

         startLocation: {
            // GeoJSON
              type:{
               type:String,
               default:'Point',
               enum:['Point']
              },
              coordinates:[Number],
              address:String,
              description:String
         },
         locations:[
            {
            type:{
               type:String,
               default:'Point',
               enum:['Point']
              },
              coordinates:[Number],
              address:String,
              description:String,
              day:Number

         }
      ],
         guides:[
            {
               type:mongoose.Schema.ObjectId,
               ref:'User'
               

            }
         ]
      }, 
         
      
      {  // This is the second argument to the schema constructor (options object)
         toJSON: { virtuals: true },
         toObject: { virtuals: true },
       });  // This is where you properly close the schema definition
       
/// indexes are using to increase efficiently/// single field index
   //  tourSchema.index({price :1})
   tourSchema.index({price :1,  ratingAverage: -1});
   tourSchema.index({slug :1}); 
   tourSchema.index({startLocation:'2dsphere'});


  
  
// please just ignore indexing it always have ahige benefit for your application







 // Correctly close the schema definition here**
       
      
    

   tourSchema.virtual('durationWeeks').get(function(){
      return this.duration/7;
   });


   
// virtual populate we actually populate tour with reviews
// instead child referencing we actually want to implement virtualpopulate
//reviews:{type:mongoose.Schema.objectid, ref:'reviews} in tourschema

// virtual populate
   tourSchema.virtual('reviews',{
         ref:'review',
         foreignField:'tour',
          localField:'_id',
     })

// DOCUMENT MIDDLEWARES SAVE AND CREATE() BUT NOT INSERTmany
   
   tourSchema.pre('save',function(next){
      this.slug=slugify(this.name,{lower:true});
      next();
   }); 

   //tourSchema.pre('save', async function(next){
     //const guidespromises=this.guides.map( async id=> User.findById(id));
     //this.guides= await Promise.all(guidespromises);
      //next();
   //})
  // tourSchema.pre('save',function(next){
   //   console.log("will save document...")
    //  next();
  // });
   //tourSchema.post('save',function(doc,next){

    //  console.log(`New Tour ${doc.name} has been created!`);
     // next();
  // });

  tourSchema.pre(/^find/,function(next){
   this.find({secretTour:{$ne:true}});
   this.start=Date.now();
   next();
  });

  tourSchema.pre(/^find/,function(next){
        this.populate({
              path:'guides',
              select:'-__v -passwordChangedAt'
            });
            next();
    })

  tourSchema.post(/^find/,function(doc,next){
   console.log(`query took ${Date.now()-this.start}milliseconds..`)
   //console.log(doc);
   next();

  })

  // AGGRREGATION MIDDLEWARE
tourSchema.pre('aggregate',function(next){
   this.pipeline().unshift({$match:{secretTour:{$ne: true}}});
   console.log(this.pipeline());
   next();

  })

      const Tour=mongoose.model("Tour",tourSchema);


      module.exports=Tour;


// data modelling technique inorder to prevent