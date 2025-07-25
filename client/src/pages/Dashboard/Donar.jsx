import React from 'react'
import {useState,useEffect} from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment'
const Donar = () => {
    const [data,setData]=useState([]);
    // find donar records
    const getDonars=async ()=>{
        try{
          const {data}=await API.get('/inventory/get-donars')
        //  console.log("These are donars:", data);
          if(data?.success){
            setData(data?.donars);
          }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getDonars();
    },[])
  return (
    <Layout>
     <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td>{record.name || record.organizationName + "(ORG)"}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>
                          {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                        </td>
                      </tr>
                    ))}
            </tbody>
      </table>
    </Layout>
  )
}

export default Donar