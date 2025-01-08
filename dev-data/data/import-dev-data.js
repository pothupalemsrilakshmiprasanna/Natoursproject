


const dotenv=require('dotenv');
const fs=require('fs');
dotenv.config({path:'./config.env'});
const mongoose=require('mongoose');
const  Tour=require('./../../model/tourmodel')
const  User=require('./../../model/userModel')
const  review=require('./../../model/reviewmodel')


//if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  ///   console.error('Database connection information is missing.');
     //    process.exit(1);
     //}
     
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
 

console.log('DATABASE:', process.env.DATABASE);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
 mongoose.connect(DB,
         
 )
 .then(()=>console.log("db connected sucessfully"))
 


 // read file node 
 const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));
 const users=JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8'));
 const reviews=JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,'utf-8'));
 
 // import data into db
 const importData= async()=>{
         try{
                  await Tour.create(tours);
                  await User.create(users,{validateBeforeSave :false});
                  await review.create(reviews);
                  console.log('data sucessfully loader!');
              

         }catch(err){
                  console.log(err);
         }
         process.exit();
 }

 // delete  data
 const deleteData=async()=>{

         try{
                  await Tour.deleteMany();
                  await User.deleteMany();
                  await review.deleteMany();
                  console.log("data successfully deleted");
       }catch(err){
                  console.log(err);
         }
         process.exit();
 }
 if(process.argv[2]==='--import'){
        importData();
 }else if(process.argv[2]==='--delete'){
        deleteData();
 }

console.log(process.argv);

//const port= process.env.PORT||5000;
//app.listen(port,()=>{
  //  console.log(`App running on port ${port}.....`);
//})
