import {useEffect, useState, useRef} from "react";

import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";


const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = ({roomId, userName, password}) => {
  const [messages, setMessages] = useState([]); //messages
  const socketRef = useRef(); //use a reference to the socket rather than the socket

  useEffect(() => { 
  //create WebSocket
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {roomId},
    });
  
  //message listener
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
    const incomingMessage ={
      ...message,
      ownedByCurrentUser: message.senderId === socketRef.current.id,
    };
    setMessages(messages => [...messages, incomingMessage]);
  });

  // socketRef.current.on(USERNAME, username =>{
  //   const
  // })

  //cleanup, remove socket if connection closes
    return () =>{
    socketRef.current.disconnect();
  };
   }, [roomId]);
    
  //when a message is sent server takes it and 
  //echo messages to all users  
    const sendMessage = (messageBody) =>
    {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, 
      {
      user: userName,
      body: messageBody,
      senderId: socketRef.current.id,
      });

    }

  return { messages, sendMessage };


}

export default useChat;