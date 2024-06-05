import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import {useSelector} from "react-redux";

export default function Feed() {
  const {tweets} = useSelector(store=>store.tweet);
  return (
    <div className='w-[50%] border border-green-100'>
      <div>
        <CreatePost/>
        {
          tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
        }
      </div>
    </div>
  )
}
