import React, { useEffect } from 'react'
import { useState } from 'react'
import axios  from "axios";

const ChatPage = () => {

  const [chat,setchat] = useState()



  useEffect(()=>{
    fetchData()
  })

  const fetchData = async ()=>{
    

  }


  return (
    <div>ChatPage</div>
  )

}

export {ChatPage}