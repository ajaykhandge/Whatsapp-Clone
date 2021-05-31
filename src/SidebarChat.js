import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import db from "./firebase";
import {Link} from "react-router-dom"

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  const createChat = () => {
    const roomName = prompt("Please enter room name");
    if (roomName) {
      //add the new room
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(()=>{
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((onSnapshot)=>{
        setMessages(onSnapshot.docs.map((doc)=>doc.data()))
      });

    }

  },[id])

  useEffect(() => {
    //when components load
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

   

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat </h2>
    </div>
  );
}

export default SidebarChat;
