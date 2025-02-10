import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { RiLoader3Line } from "react-icons/ri";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [lang, setLang] = useState("HTML");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/user/highscores", { lang });
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-300">
      <Navbar />

      {/* Language Selection Buttons */}
      <div className="flex justify-center gap-4 py-6">
        {["HTML", "CSS", "JavaScript"].map((item) => (
          <button
            key={item}
            onClick={() => setLang(item)}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-300 
                        ${
                          lang === item
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "border-blue-300 hover:bg-blue-500 hover:text-white"
                        }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Top Scorers in <span className="text-blue-800">{lang}</span>
        </h2>

        {/* Loader */}
        {loading ? (
          <RiLoader3Line className="animate-spin text-blue-600 mx-auto text-5xl mt-10" />
        ) : (
          <div className="max-w-4xl mx-auto grid gap-6">
            {users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{user.name}</span>
                <div className="flex flex-col text-right">
                  {user.score_history.map((topic, i) =>
                    lang === topic.topic ? (
                      <div key={i}>
                        <p className="text-gray-700 font-medium">{topic.topic}</p>
                        <p className="text-3xl font-bold text-blue-600">{topic.score}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
