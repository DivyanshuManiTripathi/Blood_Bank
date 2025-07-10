const userModel = require("../models/userModel");
// Get Donar List
const getDonarListController=async (req,res)=>{
   try{
      const donarData=await userModel.find({role:'donar'}).sort({createdAt:-1});
      return res.status(200).send({
        success:true,
        TotalCount:donarData.length,
        message:'Donar List Fetched Successfully',
        donarData
      })
   }
   catch(error){
    console.log(error);
    res.send(500).send({
        success:false,
        message:'Error in Donar List API',
        error
    })
   }
};

// Get Hospital List
const getHospitalListController=async (req,res)=>{
   try{
      const hospitalData=await userModel.find({role:'hospital'}).sort({createdAt:-1});
      return res.status(200).send({
        success:true,
        TotalCount:hospitalData.length,
        message:'Hospital List Fetched Successfully',
        hospitalData
      })
   }
   catch(error){
    console.log(error);
    res.send(500).send({
        success:false,
        message:'Error in Hospital List API',
        error
    })
   }
};

// Get Organization List
const getOrgListController=async (req,res)=>{
   try{
      const orgData=await userModel.find({role:'organization'}).sort({createdAt:-1});
      return res.status(200).send({
        success:true,
        TotalCount:orgData.length,
        message:'Organization List Fetched Successfully',
        orgData
      })
   }
   catch(error){
    console.log(error);
    res.send(500).send({
        success:false,
        message:'Error in Organization List API',
        error
    })
   }
};
// Delete Donar
const deleteDonarController=async(req,res)=>{
      try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:'Record deleted successfully'
        })
      }
      catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error while deleting ',
            error
        })
      }
}

// export 
module.exports={getDonarListController,getHospitalListController,getOrgListController,deleteDonarController};