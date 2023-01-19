import React, { useEffect, useRef, useState } from "react";
import { Paper } from "../../icons/paper";
import { Rock } from "../../icons/rock";
import { Scissior } from "../../icons/scissior";
import rules from "../../icons/rules-image.png";
import "../room/room.css";
import Navbar from "../navbar/navbar";
import "./rps.css";
import { Cancel } from "../../icons/cancel";
import { selectSound } from "../../Audio/sound.wav";
import io from "socket.io-client";
// check for git 
const socket = io.connect("http://192.168.1.15:3001");

const Rps = () => {
  const [showChoice, setShowChoice] = useState(false);
  const [room, setRoom] = useState("");
  const [play, setPlay] = useState(false);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [playerOnevalue, setPlayerOneValue] = useState(null);
  const [playerTwovalue, setPlayerTwoValue] = useState(null);

  const [rock, setRock] = useState(false);
  const [paper, setPaper] = useState(false);
  const [scissior, setScissior] = useState(false);

  const [cpuRock, setCpuRock] = useState(false);
  const [cpuPaper, setCpuPaper] = useState(false);
  const [cpuScissior, setCpuScissior] = useState(false);

  const [showRules, setShowRules] = useState(false);

  const [result, setResult] = useState("");
  const [winner, setWinner] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [disable, setDisable] = useState(false);

  const [val, setVal] = useState();
  const cpuWin = useRef();

  const ruleImage = () => {
    setShowRules(true);
  };

  const reset = () => {
    socket.emit("resetGame");
    socket.on("yesRestart", () => {
      setPlayerOneValue(null);
      setPlayerTwoValue(null);
      setVal(null);
      setPlay(true);
      setPlayerScore(0);
      setCpuScore(0);
      setResult("");
      setWinner(false);
      setWinnerName("");
      setDisable(false);
    });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setPlay(true);
    }
  };
  const playerOneAction = (value) => {
    socket.emit("send val", { value, room });
    setShowChoice(true);
    var audio = document.getElementById("audio");
    audio.play();
    // var cpuWin = document.getElementById('cpuWin')
    // console.log("player", value);
    // console.log("cpu", cpuNumber);

    if (value === 0) {
      setRock(true);
      setPaper(false);
      setScissior(false);
      setPlayerOneValue("0");
      console.log("p1 0", playerOnevalue);
    }
    if (value === 1) {
      setRock(false);
      setPaper(true);
      setScissior(false);
      setPlayerOneValue("1");
      console.log("p1 1", playerOnevalue);
    }
    if (value === 2) {
      setRock(false);
      setPaper(false);
      setScissior(true);
      setPlayerOneValue("2");
      console.log("p1 2", playerOnevalue);
      console.log("state-", Scissior);
    }

    // let cpuNumber = getRandomInt(3);

    // if (cpuNumber === 0) {
    //   setCpuRock(true);
    //   setCpuPaper(false);
    //   setCpuScissior(false);
    // }
    // if (cpuNumber === 1) {
    //   setCpuRock(false);
    //   setCpuPaper(true);
    //   setCpuScissior(false);
    // }
    // if (cpuNumber === 2) {
    //   setCpuRock(false);
    //   setCpuPaper(false);
    //   setCpuScissior(true);
    // }

    // let playerIndex = playerOnevalue;
    // let cpuIndex = playerTwovalue;
  };

  useEffect(() => {
    if (playerOnevalue !== null && playerTwovalue !== null)
      playRound(playerOnevalue, playerTwovalue);
  }, [playerTwovalue, playerOnevalue]);

  // useEffect(() => {
  //   if (playerTwovalue !== null) playRound(playerOnevalue, playerTwovalue);
  // }, [playerTwovalue]);

  useEffect(() => {
    socket.on("recived val", (data) => {
      console.log("recieved val", data);

      playerTwoAction(data);
      setVal(data);
    });
  });

  const playerTwoAction = (value) => {
    var audio = document.getElementById("audio");
    audio.play();

    if (value === 0) {
      setCpuRock(true);
      setCpuPaper(false);
      setCpuScissior(false);
      setPlayerTwoValue("0");
      console.log("p2 0", playerTwovalue);
    }
    if (value === 1) {
      setCpuRock(false);
      setCpuPaper(true);
      setCpuScissior(false);
      setPlayerTwoValue("1");
      console.log("p2 1", playerTwovalue);
    }
    if (value === 2) {
      setCpuRock(false);
      setCpuPaper(false);
      setCpuScissior(true);
      setPlayerTwoValue("2");
      console.log("p2 2", playerTwovalue);
      // console.log("type",typeof(playerTwovalue))
    }

    // Result ......................................
  };
  function playRound(playerOnevalue, playerTwovalue) {
    console.log("concat", playerOnevalue + playerTwovalue);
    console.log("type", typeof playerOnevalue);

    // alert(playerOnevalue + playerTwovalue)
    switch (playerOnevalue + playerTwovalue) {
      case "00":
      case "11":
      case "22":
        setResult("TIE");
        // setDisable(true);

        // setShowChoice(false)

        break;
      case "02":
      case "10":
      case "21":
        setResult("YOU WON THIS ROUND");
        // setDisable(true);

        // playerScore += 1;
        setPlayerScore(playerScore + 1);
        // setShowChoice(false)

        break;
      case "20":
      case "01":
      case "12":
        setResult("OPPONENT WON THIS ROUND ");
        // setDisable(true);

        // cpuScore += 1;
        setCpuScore(cpuScore + 1);
        // setShowChoice(false)

        break;
      default:
        setResult("select");
        break;
    }

    setTimeout(() => {
      setShowChoice(false);
      setPlayerOneValue(null);
      setPlayerTwoValue(null);
      setCpuPaper(false);
      setCpuRock(false);
      setCpuScissior(false);
      setResult("Make choice");
      // setDisable(false);
    }, 1000);

    // console.log("playerScore", playerScore);
    // console.log("cpuScore", cpuScore);
  }

  useEffect(() => {
    // cpuWin.current.play()
    var audio = document.getElementById("audio");

    if (playerScore === 3) {
      // alert("PLAYER WINN");
      setWinner(true);
      setWinnerName("YOU WIN");
      // setDisable(true);
      audio.play();

      return;
    } else if (cpuScore === 3) {
      // alert("CPU WON");
      setWinner(true);
      setWinnerName("OPPONENT WON");
      // setDisable(true);
      audio.play();
      // let playerWin = document.getElementById('cpuWin')
      // playerWin.play()

      return;
    }
    // let cpuWin = document.getElementById("cpuWin")
    // cpuWin.play()
  }, [cpuScore, playerScore]);

  // if(cpuScore===5){
  //   let cpuWin = document.getElementById('cpuWin')
  //     cpuWin.play()
  // }
  // if(playerScore===5){
  //   let cpuWin = document.getElementById('cpuWin')
  //     cpuWin.play()
  // }

  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * max);
  // }

  return (
    <div className="container">
      <Navbar />{" "}
      {play === false ? (
        <div className="room-details">
          <div className="room-no">
            <input
              type="text"
              name="room"
              id=""
              placeholder="Enter Room code ..."
              required
              onChange={(e) => {
                setRoom(e.target.value);
                console.log("rrom00", room);
              }}
            ></input>
          </div>
          <div className="btn">
            <div className="buttn">
              <button onClick={joinRoom}>Enter Room</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="details">
            {/* <div className="box">
          <div className="scoreInfo">
            <div className="scoreCard">
              <div>{result}</div>
            </div>
          </div>
        </div> */}

            <div className="score-counter">
              <div className="player-counter">
                <div className="head">Your Score</div>
                <div className="score">{playerScore}</div>
              </div>
              <div className="cpu-counter">
                <div className="head">Opponent &nbsp;Score</div>
                <div className="score">{cpuScore}</div>
              </div>
            </div>
          </div>

          <div className="body">
            {/* <div className="scoreCard">
          <div>
            icon
          </div>
        </div> */}

            <div className="selectionItems">
              {/* PLAYER  */}
              <div className="selection">
                <h2>Make Your Choice</h2>
                {disable === false ? (
                  <>
                    <div className="list">
                      <button id="rock" onClick={() => playerOneAction(0)}>
                        <Rock />
                        <audio
                          id="audio"
                          src="https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3"
                        ></audio>
                      </button>
                    </div>
                    <div className="list" >
                      <button id="paper" onClick={() => playerOneAction(1)}>
                        <Paper />
                      </button>
                    </div>
                    <div className="list">
                      <button id="scissior" onClick={() => playerOneAction(2)}>
                        <Scissior />
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
              {/* battlefield */}
              {winner ? (
                <div
                  className="center-field"
                  // style={{width:"80%", position:"absolute"}}
                >
                  <div className="winner-name">
                    {winnerName} <br />
                    <audio
                      ref={cpuWin}
                      src="https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3"
                    />
                  </div>
                  <div className="reset-btn">
                    <div className="reset-bttn">
                      <button onClick={reset}>PLAY &nbsp; AGAIN</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="center-field">
                  {showChoice === true ? (
                    <>
                      <div className="heading">BATTLE &nbsp;GROUND</div>
                      <div className="battleground">
                        <div className="area">
                          {rock === true ? (
                            <>
                              <div className="choiceR">
                                <Rock />
                              </div>
                              <div className="choice">ROCK</div>
                            </>
                          ) : null}
                          {paper === true ? (
                            <>
                              <div className="choiceP">
                                <Paper />
                              </div>
                              <div className="choice">PAPER</div>
                            </>
                          ) : null}
                          {scissior === true ? (
                            <>
                              <div className="choiceS">
                                <Scissior />
                              </div>
                              <div className="choice">SCISSIOR</div>
                            </>
                          ) : null}
                        </div>

                        <span style={{ color: "rgb(209, 83, 181)" }}>
                          V / S
                        </span>

                        <div className="area">
                          {" "}
                          {cpuRock === true ? (
                            <>
                              <div className="choiceR">
                                <Rock />
                              </div>
                              <div className="choice">ROCK</div>
                            </>
                          ) : null}
                          {cpuPaper === true ? (
                            <>
                              <div className="choiceP">
                                <Paper />
                              </div>
                              <div className="choice">PAPER</div>
                            </>
                          ) : null}
                          {cpuScissior === true ? (
                            <>
                              <div className="choiceS">
                                <Scissior />
                              </div>
                              <div className="choice">SCISSIOR</div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="heading">BATTLE &nbsp;GROUND</div>
                      <div className="battleground">WELCOME !</div>
                    </>
                  )}
                  {result !== "" && (
                    <>
                      <div className="box">
                        <div className="scoreInfo">
                          <div className="scoreCard">
                            <div>{result}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* CPU */}
              <div className="selection">
                <h2>OPPONENT </h2>
                {disable === false ? (
                  <>
                    {" "}
                    <div className="list">
                      <button id="Orock">
                        <Rock />
                      </button>
                    </div>
                    <div className="list">
                      <button id="Opaper">
                        <Paper />
                      </button>
                    </div>
                    <div className="list">
                      <button id="Oscissior">
                        <Scissior />
                      </button>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="btmBody">
            <div className="reset">
              <button onClick={reset}>Restart</button>
            </div>
            <div className="reset">
              {showRules === false ? (
                <button className="rules" onClick={ruleImage}>
                  Rules
                </button>
              ) : null}
            </div>
          </div>
          {showRules === true ? (
            // <div className="rule-div">
            //   <div className="resett">
            //     <div className="cancel-btn"><button className="ruless" onClick={() => setShowRules(false)}>
            //       Hide
            //     </button></div>

            //   </div>
            //   <span id="rule-image">
            //     <img src={rules} alt="" />
            //   </span>
            // </div>

            <div
              className="overlay"
              onClick={() => {
                setShowRules(false);
              }}
            >
              <div className="show-rule">
                <div className="cancel-btn">
                  <button onClick={() => setShowRules(false)}>
                    <Cancel />
                  </button>
                </div>
                <div className="rule-desc">
                  <img src={rules} alt="" />
                  <br />
                  <br />
                  &#x2666; &nbsp; Rock beats Scissors. <br />
                  <br />
                  &#x2666; &nbsp; Paper beats Rock. <br />
                  <br />
                  &#x2666;&nbsp; Scissors beats Paper.
                </div>
              </div>
            </div>
          ) : null}
          <div className="footer"></div>
        </>
      )}
    </div>
  );
};

export default Rps;
