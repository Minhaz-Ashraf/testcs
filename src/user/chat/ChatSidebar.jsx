import React, { useEffect, useState } from 'react'
import { about } from '../../assets'
import apiurl from '../../util';
import { useSelector } from 'react-redux';
import { userDataStore } from '../../Stores/slices/AuthSlice';


const ChatSidebar = () => {
  const {userId} = useSelector(userDataStore);
  const [chatUsers, setChatUsers] = useState([])

  const fetchChatUsers = async (userId) => {
    try {
      const response = await apiurl.get(`/get-chat-listing/${userId}`);
      console.log('Chat users:', response.data.users);
      setChatUsers(response.data.users)
    } catch (error) {
      console.error('Error fetching chat users:', error);
    }
  };
  
  useEffect(() =>{fetchChatUsers(userId)}, [userId])
  return (
    <div className='mx-12 w-96 '>
        <p className=' font-montserrat font-semibold text-[30px]  mt-16'>Recent Chats</p>
        <div className='w-96 hover:bg-[#A9252533] rounded-lg py-3  mt-5 bg-[#FCFCFC]'>
            {chatUsers?.map((item,index) => 
              <span className='flex justify-around '>
                <span>
                <img
                  src={item?.profilePictureUrl || ""}
                  alt=""
                  onError={(e) =>
                    (e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s")
                  }
                  className="rounded-full w-16 h-16"
                />
                </span> 
                <span className='flex flex-col'>
                  <p className='text-[#2E2E2E] font-montserrat font-semibold '>{item.name}</p>
                  <p className='font-thin'>{item.userId}</p>
                </span>
                <span className='font-extralight'>
                  23:00 PM
                </span>
              </span>
            )}
        </div>
    </div>
  )
}

export default ChatSidebar