import React, { useState, useEffect } from "react";
import axios from "axios";
import { APT_URL } from "../../constans/apiEndpoints";
import Layout from "../../layout/Layout";
import { useAuth } from "../../auth/AuthProvider";

const GamePage = () => {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(Array(6).fill(""));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("es");
  const { userInfo } = useAuth();
  const { username, wins, id } = userInfo.user;
 const userId = id;

  useEffect(() => {
    fetchRandomWord();
  }, [language]);

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get(`${APT_URL}/word/${language}`);
      setWord(response.data.word.toUpperCase());
      setAttempts(Array(6).fill(""));
      setCurrentAttempt(0);
      setMessage("");
    } catch (error) {
      console.error("Error fetching word:", error);
      setMessage("Error al obtener la palabra. Intenta de nuevo.");
    }
  };

  const handleGuess = async () => {
    if (!/^[A-Za-z]+$/.test(guess)) {
      setMessage("Solo se permiten letras.");
      return;
    }

    if (guess.length !== word.length) {
      setMessage(`La palabra debe tener ${word.length} letras.`);
      return;
    }

    const newAttempts = [...attempts];
    newAttempts[currentAttempt] = guess.toUpperCase();
    setAttempts(newAttempts);
    setCurrentAttempt(currentAttempt + 1);

    if (guess.toUpperCase() === word) {
      setMessage(
        `¡Felicidades ${username.toUpperCase()}! 🤩 ¡Has adivinado la palabra!`
      );
      try {
        await axios.post(`${APT_URL}/increment-wins`, {userId});
        userInfo.user.wins += 1; 
      } catch (error) {
        console.error("Error al incrementar victorias:", error);
      }
      setTimeout(() => {
        fetchRandomWord();
      }, 2000);
    } else if (currentAttempt + 1 >= 6) {
      setMessage(
        `¡Perdiste ${username.toUpperCase()}! 😪 La palabra era "${word}".`
      );
      setTimeout(() => {
        fetchRandomWord();
      }, 2000);
    } else {
      setMessage("Intenta de nuevo.");
    }

    setGuess("");
  };

  const getLetterColor = (letter, index, attempt) => {
    if (word[index] === letter) {
      return "green";
    } else if (word.includes(letter)) {
      return "yellow";
    } else {
      return "gray";
    }
  };

  return (
    <>
      <Layout>
        <div className="content-game">
          <h3>
            Hola! <span className="username"> {username.toUpperCase()}</span>{" "}
            Palabras ganadas: <span className="wins">{wins}</span>
          </h3>
          <div className="game__attempt">
            {attempts.map((attempt, rowIndex) => (
              <div key={rowIndex} className="game__attempt--items">
                {Array(word.length)
                  .fill("")
                  .map((_, colIndex) => {
                    const letter = attempt[colIndex] || "";
                    const color = attempt
                      ? getLetterColor(letter, colIndex, attempt)
                      : "white";
                    return (
                      <div
                        key={colIndex}
                        className={`game__attempt--item attemp-${color}`}
                      >
                        {letter}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
          <div className="game__input">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              maxLength={word.length}
            />
            <button
              onClick={handleGuess}
              className="game__btn"
              disabled={!guess || message.includes("¡Felicidades") || message.includes("¡Perdiste")}
            >
              Adivinar
            </button>
          </div>
          {message && <div className="message-game">{message}</div>}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;