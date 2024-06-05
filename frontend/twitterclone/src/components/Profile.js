import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link ,useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

export default function Profile() {
  const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            
        }else{
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }
  return (
    <div className="w-[50%] border-l border-r border-green-200">
      <div>
        <div>
          <div className="flex items-center ">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-green-100 cursor-pointer"
            >
              <FaArrowAltCircleLeft size="24px" />
            </Link>
            <div className="ml-2 py-2">
              <h1 className="font-bold text-lg">{profile?.name}</h1>
              <p className="text-grav-500 text-sm ">10 post</p>
            </div>
          </div>
          <img
            className="w-full"
            src="https://imgs.search.brave.com/0pHyPgbY-SzIX75S_8BVdfXHq-amZuoHiGl3P5tuS3w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTUzMTIwNDA4MDIt/YTkyOWNkMTRhNmFi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhObng4ZkdWdWZE/QjhmSHg4ZkE9PQ.jpeg"
            alt="background"
          />
          <div className='absolute top-52 ml-2 border-4 border-green rounded-full'>
            <Avatar
              src="https://imgs.search.brave.com/8u-6tWeMvcAHCvm83HfWl2cWQX_1bezh2Ajda4S8eqE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDk2MDc4NDc5MjYt/ZGE0NzAyZjAxZmVm/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/Qm9iM1J2ZkdWdWZE/QjhmREI4Zkh3dw.jpeg"
              size="120"
              round={true}
            />
          </div>
          <div className="text-right">
            {
              profile?._id === user?._id ? (
                <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-green-500 hover:text-white font-bold mt-2'>Edit Profile</button>

            ) : (
                <button onClick={followAndUnfollowHandler} className='px-4 py-1  bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
            )
          }
            
          </div>
          <div >
            <h1 className="font-bold text-xl">{profile?.name}</h1>
            <p>{`@${profile?.username}`}</p>
          </div>
          <div className="m-4 text-sm">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sed repudiandae quibusdam provident delectus porro quasi iusto nisi mollitia laboriosam, vel, tempore facere dignissimos, molestiae ab quam fuga dolore quisquam?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
