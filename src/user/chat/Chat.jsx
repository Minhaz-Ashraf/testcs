// import React, { useState, useEffect } from 'react';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { MdSend } from 'react-icons/md';
// import Header from '../../components/Header';
// import ChatSidebar from './ChatSidebar';
// import { about } from '../../assets';
// import io from 'socket.io-client';
// import axios from 'axios'; 
// import apiurl from '../../util';

// // const socket = io(` ${apiurl}`);

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');


//   useEffect(() => {
//     fetchMessages();

//     socket.on('chat message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });
   
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(` ${apiurl}/api/chat/messages`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const receiverId = 'receiverUserId123';

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit('chat message', { msg: inputMessage, receiverId: receiverId });
//     setInputMessage('');
//   };

//   return (
//     <>
//       <Header />
//       <div className='flex justify-start gap-3 '>
//         <ChatSidebar />
//         <span>
//           <div className='bg-primary flex relative  items-center mt-5 w-[120vh]  rounded-2xl px-9 py-3'>
//             <span> <img src={about} alt="" className='rounded-full w-12 h-12 ' /> </span>
//             <span className='flex flex-col mx-3 text-white '>
//               <p >ABCD</p>
//               <p className='font-thin text-[12px]'>Active Now</p>
//             </span>
//             <span className='text-white text-[23px] cursor-pointer  absolute right-6'><BsThreeDotsVertical /></span>
//           </div>
//           <div className='items-center text-black bg-[#FCFCFC] h-96 overflow-y-scroll scrollbar-hide'>
//             {messages.map((msg, index) => (
//               <div key={index} className='flex gap-3 items-end justify-start px-9'>
//                 <div className='flex flex-col gap-1'>
//                   <div className='bg-[#A9252533] rounded-md py-2 mt-5 text-start px-5'>{msg}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <span className='relative '>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 className='bg-[#FCFCFC] py-5 mt-5 w-full rounded-md placeholder:font-DMsans placeholder:font-extralight focus:outline-none px-3'
//                 placeholder='Enter Messages...'
//               />
             
              
//               <button type="submit" className='absolute right-3 text-[33px] mt-9 text-primary cursor-pointer'><MdSend /></button>
//             </form>
//           </span>
//         </span>
//       </div>
//     </>
//   );
// };

<<<<<<< HEAD
// export default Chat;
=======
// export default Chat;
>>>>>>> 5fb1f20c6fc601e5fb1052bdba09e198826edf0d
