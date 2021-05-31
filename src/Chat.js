import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from '@material-ui/icons/Send';
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./Stateprovider";
import firebase from "firebase"

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const {roomId} = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{user},dispatch] = useStateValue();
  

  useEffect(() => {
    //whenever the room id changes the function in this should executed
    if(roomId){
      setSeed(Math.floor(Math.random() * 5000));

      db.collection("rooms").doc(roomId).onSnapshot((snapShot) =>{
        setRoomName(snapShot.data().name);

      });

      db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot((snapShot)=>{
           setMessages(snapShot.docs.map(doc=>doc.data()
           ));
      });
    
    }


    
  }, [roomId])

 

  const sendMessage = (event) => {
      event.preventDefault();
      setInput(event.target.value);
      //upload the message too firebase 

      db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        user: user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });
      setInput('');
   
 
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
  <p>Last seen {" "+  new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">

        {messages.map(message=> (
        
           <p className={`chat__message ${ message.user===user.displayName && "chat__reciever"}`}>
           <span className="chat__name">{message.user}</span>
           {message.message}
           <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
         </p>
 
         
        
          
        )
        )}
       

       

      </div>


      <div className="chat__footer">
        <IconButton>
          <InsertEmotionIcon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Send a message"
            type="text"
            
          />
          <button onClick={sendMessage} ></button>
          
        </form>
        <IconButton>
        <SendIcon onClick={sendMessage}/>
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
