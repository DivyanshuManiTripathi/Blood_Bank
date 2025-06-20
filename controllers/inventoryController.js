const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController=async(req,res)=>{
   try{
     const {email,inventoryType}=req.body;
     // validation
     const user=await userModel.findOne({email});
     if(!user){
         throw new Error('User not found');
     }
   //   if(inventoryType==='in' && user.role!=='donor'){
   //      throw new Error('Not a donor account');
   //   }
     if(inventoryType==='out' && user.role!=='hospital'){
        throw new Error('Not a hospital');
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
const getInventoryController=async (req,res)=>{
   try{
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
module.exports={createInventoryController,getInventoryController};