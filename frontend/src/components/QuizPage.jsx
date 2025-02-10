import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RiLoader3Line } from "react-icons/ri";
import { motion } from 'framer-motion';

const socket = io.connect("/");

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
  const selectUser = useSelector(state => state.auth.loggedInUser);
  const location = useLocation();

  const questions = location?.state?.questions || [];
  const p1 = location?.state?.player1 || {};
  const p2 = location?.state?.player2 || {};
  const roomId = location?.state?.roomDetails?._id || "";
  const lang = location?.state?.lang || "";

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
      socket.on("gameOver", () => setGameOver(true));
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
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">

      {/* Player Sections */}
      <div className="flex-1 bg-gradient-to-b from-rose-600 to-red-500 text-white p-6 md:p-10 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold">{p1.id === selectUser.id ? "You" : p1.name}</p>
        <p className="text-xl mt-4">Score: <span className="text-4xl font-extrabold">{player_1}</span></p>
      </div>

      <div className="flex-1 bg-gradient-to-b from-sky-900 to-indigo-600 text-white p-6 md:p-10 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold">{p2.id === selectUser.id ? "You" : p2.name}</p>
        <p className="text-xl mt-4">Score: <span className="text-4xl font-extrabold">{player_2}</span></p>
      </div>

      {/* Quiz Content */}
      <div className="absolute inset-0 flex justify-center items-center">
        {gameOver ? (
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
              {player_1 > player_2 ? (
                <p className="text-2xl font-bold">{p1.name} Won with <span className="text-green-800">{player_1}</span> Points</p>
              ) : player_2 > player_1 ? (
                <p className="text-2xl font-bold">{p2.name} Won with <span className="text-green-800">{player_2}</span> Points</p>
              ) : (
                <p className="text-2xl font-bold">Match Drawn</p>
              )}
            </motion.div>
            <button
              className="mt-6 bg-black text-white px-4 py-2 rounded-lg text-lg"
              onClick={closeGame}>
              {loading ? <RiLoader3Line className="animate-spin" /> : "Close"}
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-80 md:w-[30rem]">
            <p className="text-lg font-semibold text-gray-700">Question {index + 1}/{questions.length}</p>
            <h2 className="text-xl font-bold mt-3">{questions[index]?.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {questions[index]?.options?.map((option, ind) => (
                <div
                  key={ind}
                  className={`p-4 rounded-lg cursor-pointer font-semibold ${selectedOption === ind ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-200'
                    }`}
                  onClick={() => increase(questions[index]._id, ind, index)}
                >
                  {ind + 1} {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default QuizPage;
