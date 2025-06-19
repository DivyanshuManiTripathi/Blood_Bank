import React, { useEffect } from 'react'
import  Form  from '../../components/Shared/Form/Form'
import {useSelector} from 'react-redux'
import Spinner from '../../components/Shared/Spinner'
import { toast } from 'react-toastify'
function Login() {
    const {loading,error}=useSelector(state=>state.auth)
    useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
    return (
           <>
        {loading ? <Spinner/>:(
           <div className="row g-0">
                <div className="col-md-8 form-banner">
                    <img src="./assets/images/banner1.jpg" alt="loginImage" />
                </div>
                <div className="col-md-4 form-container">
                  <Form formTitle={'login Page'} submitBtn={'Login'} formType={'login'} />
                </div>
            </div>
        )}
          
        </>
    )
}

export default Login