
const express=require('express');
const reviewController=require('./../controllers/reviewController')
const authController=require('./../controllers/authController')
const router=express.Router({mergeParams:true});
//
// post/tour/2435467/reviews----nestedroute
//get/tour/5465/reviews
// post/reviews 
 router.use(authController.protect);
 router
     .route('/')
     .get(reviewController.getAllreviews)
     .post(authController.protect,authController.restrictTo('user'),reviewController.setTourUserids,reviewController.createreview);

   router.route('/:id').get(reviewController.getreview)
   .patch(authController.restrictTo('admin','user'),reviewController.updateReview)
   .delete(authController.restrictTo('admin','user'),reviewController.deleteReview);
     
     module.exports=router;