import React, { useEffect, useState } from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment';
const HospitalList = () => {
   const [data,setData]=useState([]);
     // find donar records
     const getDonars=async ()=>{
         try{
           const {data}=await API.get('/admin/hospital-list')
         //  console.log("These are donars:", data);
           if(data?.success){
             setData(data?.hospitalData);
           }
         }
         catch(error){
             console.log(error);
         }
     }
     useEffect(()=>{
         getDonars();
     },[])
     // Delete Function
     const handleDelete=async(id)=>{
       let answer=window.prompt('Are you sure to delete this hospital',"Sure")
       if(!answer) return;
         try{
            const {data}=await API.delete(`/admin/delete-donar/${id}`);
            alert(data?.message);
            window.location.reload();
         }
         catch(error){
           console.log(error);
         }
     }
   return (
     <Layout>
      <table className="table ">
                   <thead>
                     <tr>
                       <th scope="col">Name</th>
                       <th scope="col">Email</th>
                       <th scope="col">Phone</th>
                       <th scope="col">Date</th>
                       <th scope="col">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((record) => (
                       <tr key={record._id}>
                         <td>{record.hospitalName}</td>
                         <td>{record.email}</td>
                         <td>{record.phone}</td>
                         <td>
                           {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                         </td>
                          <td>
                          <button className="btn btn-danger" onClick={()=>handleDelete(record._id)}>Delete</button>
                         </td>
                       </tr>
                     ))}
             </tbody>
       </table>
     </Layout>
   )
}

export default HospitalList