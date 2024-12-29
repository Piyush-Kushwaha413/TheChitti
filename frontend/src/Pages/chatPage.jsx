import React, { useEffect } from 'react'
import { useState } from 'react'
import axios  from "axios";

const ChatPage = () => {

  const [chat,setchat] = useState()



  useEffect(()=>{
    fetchData()
  })

  const fetchData = async ()=>{
    const data = await axios.get("/api/chats");
    console.log(data);
    if (data){ setchat(data)}
  }


  return (
    <div>ChatPage</div>
  )

}

export {ChatPage}