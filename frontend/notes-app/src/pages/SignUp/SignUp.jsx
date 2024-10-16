import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar  from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please Enter a Name.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please Enter a Valid Email.");
      return;
    }

    if(!password){
      setError("Please Enter the Password.");
      return;
    }

    setError("")

    //SignUp Api Call
    try{
      const response = await axiosInstance.post("/create-account", {
          fullName : name,
          email : email,
          password : password,
      });

      //Handle successful register response
      if(response.data && response.data.accessToken){
          setError(response.data.message)
          return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
  } catch(error){
      //Handle SignUp error
      if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
      } else{
          setError("An unexpected error occured. Please try again.")
      }
  }
  };

  return (
    <div>
      <Navbar />

        <div className='flex items-center justify-center mt-28'>
          <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl mb-7'>SignUp</h4>
              <input type='text' placeholder='Name' className='input-box' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
              />

              <input type='text' placeholder='Email' className='input-box' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput value={password}
                    onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className='text-red-500 text-xs -pb-1'>{error}</p>}

              <button type='submit' className='btn-primary'>Create Account</button>
              <p className='text-sm text-center mt-4'>
                  Already Have an Account? {""} <Link to="/login" className='font-medium text-primary underline'>Login</Link>
              </p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default SignUp