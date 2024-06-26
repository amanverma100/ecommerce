const express=require('express');
const userSignup = require('../controller/userSignup');
const userSignin =require('../controller/userSignin');
const userVerified=require('../controller/userVerified');
const router=express.Router();
const Auth=require('../middleware/auth');
const users = require('../controller/users');
const updateuser=require('../controller/updateuser');
const uploadproduct=require('../controller/uploadproduct');
const getproduct=require('../controller/getproduct');
const updateproduct=require('../controller/updateproduct');
const getcategoryproduct=require('../controller/getcategoryproduct');
const getcategorywiseproduct = require('../controller/getcategorywiseproduct');
const getproductdetail = require('../controller/getproductdetail');
router
 .post('/signup',userSignup)
 .post('/login',userSignin)
 .get('/verified',Auth,userVerified)
 .get('/users',Auth,users)
 .post('/updateuser',Auth,updateuser)
 .post('/uploadproduct',Auth,uploadproduct)
 .get('/getproduct',getproduct)
 .post('/updateproduct',Auth,updateproduct)
 .get('/categoryproduct',getcategoryproduct)
 .post('/categorywise',getcategorywiseproduct)
 .post('/productdetail',getproductdetail)
 module.exports=router;