import React,{useState} from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import axios from "axios"
import { TWEET_API_END_POINT } from "../utils/constant";
import toast  from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import {  getIsActive, getRefresh } from '../redux/tweetSlice';

export default function CreatePost() {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setDescription("");
    }

    const forYouHandler = () => {
         dispatch(getIsActive(true));
    }
    const followingHandler = () => {
        
        dispatch(getIsActive(false));
    }

  return (
    <div className='w-[100%]'>
        <div className='m-3'>
            <div className='flex item-center justify-evenly my-4 border-b border-green-100'>
                <div onClick={forYouHandler} className={`${isActive? "border-b-4 border-green-600" : "border-b-4 border-transparent"}cursor-pointer hover:bg-green-200  w-full text-centre rounded-full px-4 py-3`}>
                    <h1 className='font-bold text-lg text-gray-600 '>For you</h1>
                </div>
                <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-green-600" : "border-b-4 border-transparent"}cursor-pointer hover:bg-green-200  w-full text-centre rounded-full px-4 py-3 `}>
                    <h1 className='font-bold text-lg text-gray-600   '>Following</h1>
                </div>
            </div>
            <div className='m-4'>
                <div className='flex items-centre'>
                    <div>
                        <Avatar src="https://imgs.search.brave.com/8u-6tWeMvcAHCvm83HfWl2cWQX_1bezh2Ajda4S8eqE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDk2MDc4NDc5MjYt/ZGE0NzAyZjAxZmVm/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/Qm9iM1J2ZkdWdWZE/QjhmREI4Zkh3dw.jpeg" size="40" round={true} />
                    </div>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none border-none w-full text-lg ml-2' type='text' placeholder='what is happening...?'/>
                    </div>
                </div>
                <div className='flex items-centre justify-between p-4 border-b border-green-100'>
                    <div className='ml-5'>
                        <CiImageOn size="24px" />
                    </div>
                    <button onClick={submitHandler} className='px-4 py-1 font-semibold bg-[#228B22]  rounded-full border-none  text-white hover:bg-gray-200 hover:cursor-pointer hover:text-black'>Post</button>
                </div>
        </div>

      
    </div>
  )
}
