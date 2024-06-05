import React from 'react'
import logo from '../Main.png'
import { BiSolidHomeHeart } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { GiCaptainHatProfile } from "react-icons/gi";
import { SiThymeleaf } from "react-icons/si";
import { FaBookmark } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link , useNavigate} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

export default function LeftSidebar() {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-[20%]'>
      <div>
        <div>
            <img width={"80px"} src={logo} alt="main logo" />
        </div>
        <div className='my-4'>
            <Link to="/" className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                     <BiSolidHomeHeart size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>Home</div>
            </Link>
            <div className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                    <FaSearch size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>Explore</div>
            </div>
            <div className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                <IoMdNotifications size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>Notification</div>
            </div>
            <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                <GiCaptainHatProfile size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>profile</div>
            </Link>
            <div className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                <SiThymeleaf size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>social Service</div>
            </div>
            <div className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                    <FaBookmark size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>Favourite</div>
            </div>
            <div onClick={logoutHandler} className='flex items-center my-2 px-3 py-4 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div className='px-1'>
                    <RiLogoutCircleRFill size="24px"/>
                </div>
                <div className='px-2 font-bold text-lg'>LogOut</div>
            </div>
            <button className='px-4 py-2 font-bold bg-[#228B22] w-full rounded-full border-none text-lg text-white hover:bg-gray-200 hover:cursor-pointer hover:text-black'>Post</button>
        </div>
      </div>
    </div>
  )
}
