import React from "react";
import logo from "../Main.png";
import { useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/userSlice';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }


  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-around w-[50%]">
        <div>
          <img width={"500px"} src={logo} alt="main logo" />
        </div>
        <div>
          <div className="flex justify-center flex m-2">
            <h1 className="text-4xl font-bold">{isLogin ? "Login" : "Signup"}</h1>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col w-full">
            {!isLogin && (
              <>
                <input
                  className="rounded-full outline-none bg-gray-100 m-1 p-3 hover:bg-green-200 w-full text-sm font-semibold"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  className="rounded-full outline-none bg-gray-100 m-1 p-3 hover:bg-green-200 w-full font-semibold"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User Name"
                />
              </>
            )}
            <input
              className="rounded-full outline-none bg-gray-100 m-1 p-3 hover:bg-green-200 w-full font-semibold"
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="rounded-full outline-none bg-gray-100 m-1 p-3 hover:bg-green-200 w-full font-semibold"
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="px-4 py-2 font-bold bg-[#228B22] w-full rounded-full border-none text-lg text-white hover:bg-gray-200 hover:cursor-pointer hover:text-black"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
              <span className="cursor-pointer font-bold text-green-600"onClick={loginSignupHandler}> {isLogin ? "Register" : "Login"} </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
