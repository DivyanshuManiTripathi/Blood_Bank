const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose=require('mongoose');
const createInventoryController=async(req,res)=>{
   try{
     const {email}=req.body;
     // validation
     const user=await userModel.findOne({email});
     if(!user){
         throw new Error('User not found');
     }
   //   if(inventoryType==='in' && user.role!=='donor'){
   //      throw new Error('Not a donor account');
   //   }
   //   if(inventoryType==='out' && user.role!=='hospital'){
   //      throw new Error('Not a hospital');
   //   }
   if(req.body.inventoryType == 'out'){
      const requestedBloodGroup=req.body.bloodGroup;
      const requestedQuantityOfBlood=req.body.quantity;
      const organization=new mongoose.Types.ObjectId(req.user.userId);
      // Calculate blood quantity
      const totalInOfRequestedBlood=await inventoryModel.aggregate([
         {$match:{
            organization,
            inventoryType:'in',
            bloodGroup:requestedBloodGroup
         }},{
            $group:{
               _id:'$bloodGroup',
               total:{$sum:'$quantity'}
            }
         }
      ])
     // console.log('Total In', totalInOfRequestedBlood);
     const totalIn=totalInOfRequestedBlood[0]?.total || 0;
      // Calculate out blood quantity
      const totalOutOfRequestedBlood=await inventoryModel.aggregate([
         {$match:{
            organization,
            inventoryType:'out',
            bloodGroup:requestedBloodGroup
         }},{
            $group:{
               _id:'$bloodGroup',
               total:{$sum:'$quantity'}
            }
         }
      ])
      const totalOut=totalOutOfRequestedBlood[0]?.total || 0;
    // in and out cal
    const availableQuantityOfBloodGroup=totalIn-totalOut;
    // quantity validation
    if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
      return res.status(500).send({
         success:false,
         message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
      })
    }
      req.body.hospital=user?._id;
   }else{
      req.body.donar=user?._id;
   }
     // save record
     const inventory=new inventoryModel(req.body);
     await inventory.save();
     return res.status(201).send({
        success:true,
        message:'new Blood Record Added'
     })
   }
   catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"Error in Create Inventory API",
        error
    })
   }
}
// get hospital blood records
const getInventoryHospitalController=async (req,res)=>{
   try{
    //  console.log("User Id",req.user.userId);
     const inventory=await inventoryModel.find(req.body.filters).populate('donar').populate('hospital').populate('organization').sort({createdAt:-1});
     return res.status(200).send({
       success:true,
       message:"get hospital consumer records successfully",
       inventory
     })
   }
   catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:"Error in get consumer Inventory",
         error,
      })
   }
}
const getInventoryController=async (req,res)=>{
   try{
    //  console.log("User Id",req.user.userId);
     const inventory=await inventoryModel.find({organization:req.user.userId}).populate('donar').populate('hospital').sort({createdAt:-1});
     return res.status(200).send({
       success:true,
       message:"get all records successfully",
       inventory
     })
   }
   catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:"Error in get all Inventory",
         error,
      })
   }
}
// get blood records of 3
const getRecentInventoryController = async(req,res) =>{
     try{
        const inventory=await inventoryModel.find({
         organization:req.user.userId
        }).limit(3).sort({createdAt:-1});
        return res.status(200).send({
         success:true,
         message:"recent Inventory Data",
         inventory
        })
     }
     catch(error){
      console.log(error);
      res.status(500).send({
         success:false,
         message:"Error in recent Inventory API",
         error
      })
     }
}
// Get Donar Records
const getDonarsController=async(req,res)=>{
    try{
        const organization=req.user.userId;
        const donarId=await inventoryModel.distinct("donar",{
           organization
        })
       const donars=await userModel.find({_id:{$in:donarId}})
      return res.status(200).send({
         success: true,
         message: "Donar Record Fetched Successfully",
         donars,
    });
    }
    catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:'Error in donar records',
         error
      })
    }
}
const getHospitalController=async (req,res)=>{
   try{
      const organization=req.user.userId;
      // get hospital id
      const hospitalId=await inventoryModel.distinct('hospital',{organization});
      // hospital
      const hospitals=await userModel.find({
         _id:{$in:hospitalId}
      })
      return  res.status(200).send({
         success:true,
         message:'Hospital data fetched successfully',
         hospitals
      })
   }
   catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:'Error in get hospital API',
         error
      })
   }
}
// Get ORG profiles
const getOrganizationController=async (req,res)=>{
   try{
      const donar=req.user.userId;
      const orgId= await inventoryModel.distinct('organization',{donar});
      // find org
      const organizations=await userModel.find({
         _id:{$in:orgId}
      })
      return res.status(200).send({
         success:true,
         message:'Org data fetched successfully',
         organizations,
      });
   }
   catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:'Error in Org Api',
         error
      })
   }
}

// Get ORG for hospital
const getOrganizationForHospitalController=async (req,res)=>{
   try{
      const hospital=req.user.userId;
      const orgId= await inventoryModel.distinct('organization',{hospital});
      // find org
      const organizations=await userModel.find({
         _id:{$in:orgId}
      })
      return res.status(200).send({
         success:true,
         message:'Hospital Org data fetched successfully',
         organizations,
      });
   }
   catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:'Error in Hospital Org Api',
         error
      })
   }
}
module.exports={createInventoryController,getInventoryController, getDonarsController,getHospitalController,getOrganizationController,getOrganizationForHospitalController,getInventoryHospitalController,getRecentInventoryController};