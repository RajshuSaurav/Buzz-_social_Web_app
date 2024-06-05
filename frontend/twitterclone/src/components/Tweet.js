import React from 'react'
import Avatar from 'react-avatar';
import { FaCommentDots } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import {timeSince} from "../utils/constant";

export default function Tweet({tweet}) {
    const { user } = useSelector(store => store.user); 
     
    const dispatch = useDispatch();
    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);

        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }

  return (
    <div className='border-b border-green-200'>
      <div>
            <div className='flex ml-3 p-4'>
                <Avatar src="https://imgs.search.brave.com/8u-6tWeMvcAHCvm83HfWl2cWQX_1bezh2Ajda4S8eqE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDk2MDc4NDc5MjYt/ZGE0NzAyZjAxZmVm/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/Qm9iM1J2ZkdWdWZE/QjhmREI4Zkh3dw.jpeg" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-centre '>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-2'>{`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <div className='flex items-centre'>
                            <div className='p-2 hover:bg-green-100 rounded-full cursor-pointer'>
                            <FaCommentDots size="24px"/>
                            </div>
                            
                            <p className='ml-1 py-2'>0</p>
                        </div>
                        <div className='flex items-centre'>
                            <div  onClick={() => likeOrDislikeHandler(tweet?._id)}  className='p-2 hover:bg-pink-300 rounded-full cursor-pointer'>
                                <FaHeart size="24px" />
                            </div>
                            <p className='ml-1 py-2'>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-centre'>
                            <div className='p-2 hover:bg-green-100 rounded-full cursor-pointer'>
                            <FaRegBookmark size="24px"/>
                            </div>
                        
                            <p className='ml-1 py-2'>0</p>
                        </div>
                        {
                            user?._id === tweet?.userId && (
                                <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                    <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                        <MdOutlineDeleteOutline size="24px" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                
            </div>
      </div>
    </div>
  )
}
