import React, { useState, useEffect } from 'react'
import Header from '../../components/Shared/Layout/Header'
import API from "../../services/API";
import { toast } from 'react-toastify';
import moment from 'moment';
import { useSelector } from 'react-redux';
const Analytics = () => {
  const { loading, error } = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors=['#C562AF','#456882','#D2C1B6','#D1A980','#5EABD6','#FEFBC7','#FFB4B4','#D6D85D']
  // Get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get('/analytics/bloodGroups-data')
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  // lifecycle method
  useEffect(() => {
    getBloodGroupData();
  }, [])

    // get function
  const getBloodRecords=async()=>{
    try{
      const {data}=await API.get('/inventory/get-recent-inventory')
       console.log(data);
      if(data?.success){
        setInventoryData(data?.inventory);
      //  console.log(data);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
 useEffect(()=>{
  getBloodRecords();
 },[])
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record,i) => (
          <div className="card m-2 p-1" key={i} style={{ width: '18rem',backgroundColor:`${colors[i]}`}}>
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
               <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
          <div className="card-footer text-light bg-dark text-center">
            Total Available : {record.availableBlood} (ML)
          </div>
          </div>
        ))}
      </div>
      <div className="container mt-3 my-3">
          <h1 className='my-3'>Recent Blood Transactions</h1>
                    <table className="table ">
                      <thead>
                        <tr>
                          <th scope="col">Blood Group</th>
                          <th scope="col">Inventory Type</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Donar Email</th>
                          <th scope="col">TIme & Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryData?.map((record) => (
                          <tr key={record._id}>
                            <td>{record.bloodGroup}</td>
                            <td>{record.inventoryType}</td>
                            <td>{record.quantity} (ML)</td>
                            <td>{record.email}</td>
                            <td>
                              {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
      </div>
    </>
  )
}

export default Analytics