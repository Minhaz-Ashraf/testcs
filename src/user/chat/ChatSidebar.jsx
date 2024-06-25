import React, { useEffect, useState } from 'react'
import { about } from '../../assets'
import apiurl from '../../util';
import { useSelector } from 'react-redux';
import { userDataStore } from '../../Stores/slices/AuthSlice';


const ChatSidebar = ({ chatUsers, onSelectUser }) => {
  const {userId} = useSelector(userDataStore);
  // const [chatUsers, setChatUsers] = useState([])
  const handleUserClick = (user) => {
    onSelectUser(user);
  };

  const fetchChatUsers = async (userId) => {
    try {
      const response = await apiurl.get(`/get-chat-listing/${userId}`);
      console.log('Chat users:', response.data.users);
      // setChatUsers(response.data.users)
      // console.log(response.data.users, "ff");
    } catch (error) {
      console.error('Error fetching chat users:', error);
    }
  };
  
  const chatUserData = [
    {
      "profilePictureUrl": "https://example.com/profile1.jpg",
      "name": "Alice Smith",
      "userId": "CSIDPN2356003",
      "time": " 10:00 AM"
    },
    {
      "profilePictureUrl": "https://example.com/profile2.jpg",
      "name": "Bob Johnson",
      "userId": "CSIDPN2356003",
      "time": " 10:05 AM"
    },
    {
      "profilePictureUrl": "https://example.com/profile3.jpg",
      "name": "Charlie Brown",
      "userId": "CSIDPN2356003",
      "time": " 10:10 AM"
    },
    {
      "profilePictureUrl": "https://example.com/profile4.jpg",
      "name": "David Wilson",
      "userId": "CSIDPN2356003",
      "time": " 10:15 AM"
    },
    {
      "profilePictureUrl": "https://example.com/profile5.jpg",
      "name": "Eve Davis",
      "userId": "CSIDPN2356003",
      "time": " 10:20 AM"
    }
  ]
  

console.log(chatUsers);
  // useEffect(() =>{fetchChatUsers(userId)}, [userId])
  return (
    <div className='mx-12 w-96 mt-20'>
        <p className=' font-montserrat font-semibold text-[25px]  mt-16'>Recent Chats</p>
        {chatUsers?.map((item,index) => 
        <div     key={index}   onClick={() => handleUserClick(item)} className='w-96 font-DMsans hover:bg-[#A9252533] rounded-lg py-3 mt-1 bg-[#FCFCFC] cursor-pointer'>
         
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
                  <p className='font-extralight text-[13px]'>recent chat</p>
                </span>
                <span className='font-extralight text-[13px]'>
                  {item.time}
                </span>
              </span>
              </div>
            )}
      
    </div>
  )
}

export default ChatSidebar