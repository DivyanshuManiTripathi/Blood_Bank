import React, { useState, useEffect } from 'react'
import Header from '../../components/shared/Layout/Header'
import API from "../../services/API";
const Analytics = () => {
  const [data, setData] = useState([]);
  const colors=['#C562AF','#456882','#D2C1B6','#D1A980','#5EABD6','#FEFBC7','#FFB4B4','#D6D85D']
  // Get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get('/analytics/bloodGroups-data')
      if (data?.success) {
        setData(data?.bloodGroupData);
       // console.log(data);
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
    </>
  )
}

export default Analytics