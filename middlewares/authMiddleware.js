const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
    try{
        const authHeader=req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith('Bearer ')){
             return res.status(401).send({
              success: false,
              message: 'Authorization token missing or malformed',
              });
        }
        const token=authHeader.split(' ')[1];

        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                console.log(err);
                return res.status(401).send({
                    success:false,
                   message: 'Auth Failed',
                })
            }
            else{
                 req.user = decode; // decode.userId
                next();
            }
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).send({
            success:false,
            error,
            message:'Auth Failed'
        })
    }
}