import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RiLoader3Line } from "react-icons/ri";
import { motion } from "framer-motion";

const socket = io.connect("/"); // Ensure correct server connection

const QuizPage = () => {
  const [index, setIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [roomCopy, setRoomCopy] = useState();
  const [copyStatus, setCopyStatus] = useState(false);
  const [player_1, setPlayer_1] = useState(0);
  const [player_2, setPlayer_2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const selectUser = useSelector((state) => state.auth.loggedInUser);
  const location = useLocation();

  const questions = location?.state?.questions;
  const p1 = location?.state?.player1;
  const p2 = location?.state?.player2;
  const roomId = location?.state?.roomDetails?._id;
  const lang = location?.state?.lang;

  useEffect(() => {
    socket.on("correct_ans", (data) => {
      setPlayer_1(data.p1);
      setPlayer_2(data.p2);
    });

    setRoomCopy(roomId);

    socket.on("gameOver", () => {
      setGameOver(true);
    });
  }, [player_1, player_2, gameOver]);

  const increase = (q_id, ind, index) => {
    if (index >= questions.length - 1) {
      socket.emit("endGame", { roomId, player_1, player_2, lang, p1, p2 });
      socket.on("gameOver", () => {
        setGameOver(true);
      });
    }

    if (questions[index].correctOptionIndex === ind) {
      setSelectedOption(ind);
      socket.emit("check_ans", { userId: selectUser.id, roomId, correct: true });
      setIsCorrect(true);
      setTimeout(() => {
        setIndex(index + 1);
        setSelectedOption(null);
        setIsCorrect(false);
      }, 500);
    } else {
      socket.emit("check_ans", { userId: selectUser.id, roomId, correct: false });
      setIsCorrect(false);
      setSelectedOption(ind);
      setTimeout(() => {
        setIsCorrect(false);
        setSelectedOption(null);
        setIndex(index + 1);
      }, 1000);
    }
  };

  const copyText = () => {
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 2000);
  };

  const closeGame = () => {
    setLoading(true);
    socket.emit("closeGame", { roomId, player_1, player_2, lang, p1, p2 });
    navigate("/quiz-homepage");
  };

  return (
    <>
      {/* Player Scores */}
      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="bg-gradient-to-b from-rose-600 to-red-500 w-full md:w-1/2 flex flex-col items-center justify-center p-5">
          <p className="text-2xl md:text-3xl font-extrabold">{p1.id === selectUser.id ? "You" : p1.name}</p>
          <p className="text-lg font-bold text-white mt-2">Score: <span className="text-4xl">{player_1}</span></p>
        </div>
        <div className="bg-gradient-to-b from-sky-900 to-indigo-600 w-full md:w-1/2 flex flex-col items-center justify-center p-5">
          <p className="text-2xl md:text-3xl font-extrabold">{p2.id === selectUser.id ? "You" : p2.name}</p>
          <p className="text-lg font-bold text-white mt-2">Score: <span className="text-4xl">{player_2}</span></p>
        </div>
      </div>

      {/* Question and Answer Section */}
      <div className="flex justify-center items-center mt-10">
        {p1 !== " " && p2 !== "" && !gameOver ? (
          <div className="w-[90%] md:w-[40rem] mx-auto bg-white shadow-md p-5 rounded-lg">
            {index > questions.length - 1 ? (
              <div className="flex flex-col items-center space-y-5 text-lg font-semibold">
                Result Pending <RiLoader3Line className="animate-spin mt-5" />
              </div>
            ) : (
              <>
                <p className="text-center text-2xl font-bold">{index + 1}/{questions.length}</p>
                <h2 className="text-xl font-semibold mb-4 mt-3">{questions[index]?.question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[index]?.options?.map((option, ind) => (
                    <div
                      key={ind}
                      className={`flex cursor-pointer items-center space-x-2 p-4 rounded-lg transition ${
                        selectedOption === ind ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-gray-200"
                      }`}
                      onClick={() => increase(questions[index]._id, ind, index)}
                    >
                      <label>{ind + 1})</label>
                      <label className="text-gray-800 cursor-pointer">{option}</label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-[90%] md:w-[30rem] mx-auto bg-white shadow-lg p-5 rounded-3xl">
            {gameOver ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="text-center font-bold text-lg">
                {player_1 > player_2 ? (
                  <div>{p1.name} Won with <span className="text-green-800 font-extrabold">{player_1}</span> Points</div>
                ) : player_2 > player_1 ? (
                  <div>{p2.name} Won with <span className="text-green-800 font-extrabold">{player_2}</span> Points</div>
                ) : (
                  <div className="text-green-950 font-extrabold">Match Drawn</div>
                )}
              </motion.div>
            ) : (
              <div className="text-center">
                <p className="font-semibold text-lg">Send this room ID to your friend:</p>
                <p className="text-xl font-bold mt-2">{roomId}</p>
                <CopyToClipboard text={roomCopy} onCopy={copyText}>
                  <button className="border-2 border-black px-4 py-2 rounded-lg mt-3 text-lg">Copy</button>
                </CopyToClipboard>
                <p className="text-green-500 font-bold mt-2">{copyStatus ? "Room ID copied!" : ""}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
