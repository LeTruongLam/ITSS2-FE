"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./views.css";

const Card = ({ deck_id }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [cardData, setCardData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/decks/${deck_id}/cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}` ,
            },
          }
        );
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [deck_id, token]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[500px] cursor-pointer	">
        <div
          className="flip-card w-[800px] h-[450px] rounded-md "
          onClick={handleFlip}
        >
          <motion.div
            className="flip-card-card-inner w-[100%] h-[100%]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            {isFlipped ? (
              <div className="flex items-center justify-center flip-card-back w-[100%] h-[100%] bg-cover text-black p-4 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
                <h1>{cardData[currentCardIndex]?.front}</h1>
              </div>
            ) : (
              <div className="flex items-center justify-center flip-card-front w-[100%] h-[100%] bg-cover text-black shadow-md hover:shadow-xl rounded-2xl border border-slate-200 p-4">
                <h1>{cardData[currentCardIndex]?.back}</h1>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <button onClick={handlePrevious}>Quay lại</button>
      <button onClick={handleNext}>Tiếp theo</button>
    </div>
  );
};

export default Card;