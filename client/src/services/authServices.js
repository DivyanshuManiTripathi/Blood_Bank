export const handleLogin=(e,name,role,email,password)=>{
   e.preventDefault();
   try{
    if(!role || !email || !password){
        return alert("Please provide all fields");
    }
    console.log('login',e,name,role,email,password);
   }
   catch(error){
    console.log(error);
   }
};
export const handleRegister=(e,email,password,role,organisationName,hospitalName,website,address,phone)=>{
   e.preventDefault();
   try{
    console.log('Register ->',email,password,role,organisationName,hospitalName,website,address,phone)
   }
   catch(error){
    console.log(error);
   }
};