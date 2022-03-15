import React, { useState } from "react";
import Chat from "./chat.component";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3050/chat");

function Homepage() {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");

  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("join_room", roomname)
      setShowChat(true)
    }
  }
  return (
  <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
  <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join the Chat</h3>
        <input type="text" placeholder="Name here..."
          onChange={(e) => {
            setusername(e.target.value)
            }}
          />     
        <input type="text" placeholder="Room No ...."
          onChange={(e) => {
            setroomname(e.target.value)
            }}
          />
        <button onClick={joinRoom}>Join </button>
        
      </div>
          ) : (
      <Chat socket={socket} username={username} roomname={roomname} />
    )}
        </div>
      </div>
      </div>
    
  );
}
export default Homepage