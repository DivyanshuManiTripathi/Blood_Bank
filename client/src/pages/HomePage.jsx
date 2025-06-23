import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Shared/Spinner';
import Layout from '../components/Shared/Layout/Layout';
import { toast } from 'react-toastify'; // ✅ add this
import Modal from '../components/Shared/modal/Modal';
import API from '../services/API';
import moment from 'moment'
function HomePage() {
  const { loading, error } = useSelector(state => state.auth);
  const [data,setData]= useState([]);
  // get function
  const getBloodRecords=async()=>{
    try{
      const {data}=await API.get('/inventory/get-inventory')
    //   console.log(data);
      if(data?.success){
        setData(data?.inventory);
      //  console.log(data);
      }
    }
    catch{
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
    <Layout>
      {loading ? <Spinner /> : (
        <>
          <div className="container">
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i>
              Add Inventory
            </h4>
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
                {data?.map((record) => (
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

            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
}

export default HomePage;
