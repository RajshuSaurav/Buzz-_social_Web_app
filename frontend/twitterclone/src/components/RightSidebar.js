import React from "react";
import { FaSearch } from "react-icons/fa";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

export default function RightSideBar({otherUsers}) {
  return (
    <div className="w-[25%] my-2 ">
      <div className="flex items-centre p-2 bg-green-200 rounded-full outline-none">
        <FaSearch className="my-1" />
        <input
          type="text"
          className="bg-transparent outline-none px-2 ml-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4 my-4 bg-green-100 rounded-2xl" >
        <h1 className="font-bold text-lg my-2">Who to Follow !</h1>
        {
          otherUsers?.map((user) => {
            return(
              <div key={user?._id}className="flex items-centre justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar
                    src="https://imgs.search.brave.com/8u-6tWeMvcAHCvm83HfWl2cWQX_1bezh2Ajda4S8eqE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDk2MDc4NDc5MjYt/ZGE0NzAyZjAxZmVm/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/Qm9iM1J2ZkdWdWZE/QjhmREI4Zkh3dw.jpeg"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>

                </div>
              </div>
              <div>
              <Link to={`/profile/${user?._id}`}>
                <button className="px-4 py-1 bg-black text-white rounded-full"> Profile </button>
              </Link>
                
              </div>
            </div>
            )
          })
        }
        
      </div>
    </div>
  );
}
