
import React from 'react'
import { useAuth } from '../Providers/Auth';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {
  const navigate = useNavigate()

    const authState = useAuth()

    const handleLinkedInLogin = async () => {
        if(authState?.loggedUser){
          navigate(`/influencer`);
        }
    
        else{
        authState?.handleOpenLinkedin()
      }
      };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <button className='border bg-light-blue-800 text-white p-5' onClick={handleLinkedInLogin}>{authState?.loggedUser ? "My Account" : "Login with linkedin"}</button>
    </div>
  )
}

export default Login