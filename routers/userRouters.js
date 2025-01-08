

const express=require('express');
const authController=require('./../controllers/authController')

const userController=require('./../controllers/userController');

const router=express.Router();
router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.get('/logout',authController.logout);

router.get('/me',authController.protect,userController.getme,userController.getuser);
router.post('/forgotpassword',authController.forgotpassword);
router.patch('/resetpassword/:token',authController.resetpassword);
/// protect all routes after this middleware
router.use(authController.protect);
router.patch('/updatemypassword',authController.updatepassword);
router.patch('/updateme',userController.updateme);
router.delete('/deleteme',userController.deleteme);

router.use(authController.restrictTo('admin'));
   router
     .route('/')
     .get(userController.getAllusers)
     .post(userController.createuser);
    router
       .route('/:id')
       .get(userController.getuser)
       .patch(userController.updateuser)
       .delete(userController.deleteuser);


       


       module.exports=router;