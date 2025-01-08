const express=require('express');
const viewController=require('./../controllers/viewsController')
const authController=require('./../controllers/authController')
const router=express.Router();


//router.get('/login',authController.isLoggedIn)
//router.get('/',viewController.getOverview)   
///router.get('/tour/:slug',authController.protect,viewController.getTour)// login
 

//router.use(authController.isLoggedIn);

router.get('/',authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn,viewController.getTour);//
//router.get('/login',viewController.getLoginForm)
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

//127.0.0.1/8000/tours/${tour.slug}



module.exports=router;
