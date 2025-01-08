const Tour=require('./../model/tourmodel')
const catchAsync=require('./../utilities/catchAsync')
const AppError=require('./../utilities/appError')
const User=require('./../model/userModel') 
exports.getOverview= catchAsync(async(req,res,next)=>{
         /// get tour data from collection
            const tours=await Tour.find();
       
         // build template 
          // render that template using tour data from 1 
          console.log("hi");
         res.status(200).render('overview',{
           title:'All Tours',
           tours
         });
       });



       exports.getTour = catchAsync(async (req, res, next) => {
        const tour = await Tour.findOne({ slug: req.params.slug }).populate({
          path: 'reviews',
          fields: 'reviews rating user',
        });


       if(!tour){
        return next(new AppError("there is no tour with that name",404))
       }



        res
          .status(200)
          .set(
            'Content-Security-Policy',
            "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
          )
          .render('tour', {
            title: `${tour.name}`,
            tour,
          });
      });
       
      exports.getLoginForm = (req, res) => {
        res
          .status(200)
          .set(
            'Content-Security-Policy',
            "connect-src 'self' https://cdnjs.cloudflare.com"
          )
          .render('login', {
            title: 'Log into your account',
          });
      };

      
      exports.getAccount= (req, res) => {
        res
          .status(200)
          .set(
            'Content-Security-Policy',
            "connect-src 'self' https://cdnjs.cloudflare.com"
          )
          .render('login', {
            title: 'your account',
          });
      };

      exports.updateUserData=catchAsync(async(req,res,next)=>{
          const user=await User.findByIdAndUpdate(req.user.id,{
            name:req.body.name,
            email:req.body.email



          },{
            new:true,
            runValidators:true
          }
        
        );

        res.status(200).render('account',{
          title:'your account',

          user:"updated user"
        })
          
      });



             
//exports.getOv=(req,res)=>{
  ////       res.status(200).render('base',{
      //     tour:'The Forest Hiker',
        //   user:'Jonas'
           // these variables local in the pug file
        // });
       
         /// it basicaally go it render it and then basically send  it as response to the browser
//};