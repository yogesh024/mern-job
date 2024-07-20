import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import{message} from 'antd'
const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/auth/register', {
        method: 'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(values)
       });
      const data=await res.json();
      if (res.status === 201) {
        message.success(data.message);
        await login(data.token, data.user);
      }
      else if(res.status===400){
        setError(data.message);
      }
      else{
        message.error('registration failed')
      }
    } catch (err) {
      message.error(err)
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, error, loading };
};

export default useLogin
