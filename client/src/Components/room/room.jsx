import React from "react";
import { useState, useEffect } from "react";
import "./room.css";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "../navbar/navbar";
import { Socket } from "socket.io-client";
import Rps from "../mainpage/rps";

const socket = io.connect("http://192.168.1.29:3001");

export const Room = () => {
  const [roomId, setRoomId] = useState("");
  const [play, setPlay] = useState(false);
  // const [msg, setMsg] = useState("0");
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

  const createGame = () => {
    socket.emit("createGame");
    socket.on("newGame", (data) => {
      console.log("room ID - ", data);
      setPlay(true)
    });
  };

  const joinGame = () => {
    socket.emit("joinGame", roomId); // roomId(state) = input value
    console.log(roomId)
  };

  socket.on("play", () => {
    setPlay(true);
    // alert("connected");
  });
  socket.on("err", () => {
    setPlay(false);
    // alert("wrong code");
  });

  return (
    <div className="navbarDiv">
      <Navbar />
      {/* <button><NavLink to={'/game'}>Play</NavLink></button> */}
      {play === false ? (
        <div className="initial">
          <button onClick={createGame}>Create Game</button>
          <div>or</div>
          <input
            type="text"
            id="roomID"
            placeholder="Enter room code"
            onChange={(event) => {
              setRoomId(event.target.value);
            }}
          ></input>
          <button onClick={joinGame}>Join Game</button>
        </div>
      ) : (
        <Rps />
      )}
    </div>
  );
};
