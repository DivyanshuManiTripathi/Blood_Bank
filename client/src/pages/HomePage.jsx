import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Shared/Spinner';
import Layout from '../components/Shared/Layout/Layout';
import { toast } from 'react-toastify'; // ✅ add this

function HomePage() {
  const { loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      {loading ? <Spinner /> : (
        <>
          <h1>Home Page</h1>
        </>
      )}
    </Layout>
  );
}

export default HomePage;
