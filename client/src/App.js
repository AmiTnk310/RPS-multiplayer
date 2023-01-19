import "./App.css";
import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { Room } from "./Components/room/room";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rps from "./Components/mainpage/rps";

// const socket = io.connect("http://localhost:3001");

// import Rps from './Components/mainpage/rps';

function App() {
  // const[room,setRoom] = useState("")
  // const [msg, setMsg] = useState("");
  // const [recivedMsg, setRecivedMsg] = useState("");

  // const joinRoom =()=>{
  //     if(room !==""){
  //       socket.emit("join_room",room);
  //     }
  // }

  // const sendMsg = () => {
  //   socket.emit("send msg", { msg , room });
  //   console.log("send msg", msg);
  // };

  // useEffect(() => {
  //   socket.on("view msg", (data) => {
  //     console.log("messagesss", data);
  //     return setRecivedMsg(data);
  //   });
  // });

  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path="/" element={<Room/>}/>
        <Route path="/game" element={<Rps/>}/>
       </Routes>
      </Router>
      
      {/* <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>

      
      <input
        placeholder="msg.."
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      ></input>
      <button onClick={sendMsg}>Send</button>

      <p>msg = {recivedMsg}</p> */}
    </div>
  );
}

export default App;
