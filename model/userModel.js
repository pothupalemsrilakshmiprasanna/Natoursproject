const crypto=require('crypto')
const mongoose=require('mongoose');
const validator=require('validator');

//const { validate } = require('./tourmodel');
// name ,email,photo,password,passwordConfirm
const bcrypt=require('bcryptjs');
const catchAsync = require('../utilities/catchAsync');
const userSchema= new mongoose.Schema({
         name: {
                  type:String,
                  required:[true,"A user must have a name"],
         },
          email:{
                 type:String,
                  required:[true,"please provide your email"],
                  unique:true,
                  lowercase:true,
                  validate:[validator.isEmail,'please provide a valid email']

                 
                  
          },
          photo:String,
          role:{
               type:String,
               enum:['user','guide','lead-guide','admin'],
               default:'user'
          },
         password:{
                  type: String,
                  required:[true,'please provide a password'],
                  minlength:8,
                  lowercase: [true, 'provide a password'],
                  select:false,

      },
          passwordConfirm:{
                  type:String,
                  required:[true,'please provide a password'],
                  validate:{
                        // this only works on create and save
                        validator:function(el){
                                return  el===this.password;
                        },
                        message:'passwords are not same'

                  } 

          },
          passwordChangedAt: Date,
          passwordResetToken:String,
          passwordResetExpires:Date,
          active:{
            type: Boolean,
            default:true,
            select:false
          }


  })

userSchema.index({ email: 1 }, { unique: true });

 userSchema.pre('save', async function(next){
        // only run this function if passwords was actually modified
   if(!this.isModified('password')) return next();
        // Hash the passowrd with cast of 
      this.password= await bcrypt.hash(this.password, 12);

            // Set passwordChangedAt field to the current timestamp
     this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second for accuracy with JWT tokens

   // console.log('Password changed at:', this.passwordChangedAt);
    //console.log('Password being hashed:', this.password);


        // delete passwordConfirm field
         this.passwordConfirm=undefined;
    next();
       

});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  try {
    // Log for debugging
   // console.log('Candidate Password:', candidatePassword);
    //console.log('Hashed Password:', userPassword);

    // Compare the passwords
    const isMatch = await bcrypt.compare(candidatePassword, userPassword);

    // Log the result for debugging
    console.log('Password Match:', isMatch);

    return isMatch;
  } catch (error) {
    console.error('Error while comparing passwords:', error);
    throw new Error('Password comparison failed');
  }
};



  userSchema.pre(/^find/,function(next){
      // this points to the current query
      this.find({active:{$ne :false}});
      next();
  })
  

  //console.log('Received password:', candidatePassword);
//console.log('Stored hashed password:', userPassword);

  userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
       
        if(this.passwordChangedAt){
                const changedTimestamp= parseInt(this.passwordChangedAt.getTime() / 1000, 10);

             
                return JWTTimestamp < changedTimestamp;//100 <200
        }

        // not changed
        console.log('Password not changed after JWT issued.');
                return false;
  }

 
  userSchema.methods.createPasswordResetToken = function () {
      const resetToken = crypto.randomBytes(32).toString('hex');

        console.log({resetToken},this.PasswordResetToken);
       this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Use updated property name
       
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        //console.log('Reset token expires at:', new Date(this.passwordResetExpires).toISOString());  // Debugging the time

       // console.log('Current time:', new Date(Date.now()).toISOString());
        
        return resetToken;
    };
  

  
  const User=mongoose.model('User',userSchema);
  module.exports=User;

