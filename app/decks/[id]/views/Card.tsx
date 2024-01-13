"use client";
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./views.css";

const Card = ({ deck_id }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
              Authorization: `${token}`,
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
      setCurrentCardIndex((prevIndex) => {
        if (prevIndex === 0) {
          return cardData.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) => {
        if (prevIndex === cardData.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }
  };

  useEffect(() => {
    setIsFlipped(false);
    setIsAnimating(false);
  }, [currentCardIndex]);

  return (
    <div>
      <div className="mt-6 flex items-center justify-center h-[500px] cursor-pointer	">
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
            {cardData.length > 0 && (
              <>
                {isFlipped ? (
                  <div className=" flip-card-back w-[100%] h-[100%] bg-cover text-black p-4 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
                    <h1 className="text-3xl  flex  w-[100%] h-[100%] flexCenter">
                      {cardData[currentCardIndex]?.front}
                    </h1>
                  </div>
                ) : (
                  <div className=" flip-card-front w-[100%] h-[100%] bg-cover text-black shadow-md hover:shadow-xl rounded-2xl border border-slate-200 p-4">
                   <h1 className="flex flex-col text-3xl w-[100%] h-[100%] flexCenter">
                                {cardData[currentCardIndex]?.back && (
                <>
                  <p>Định nghĩa: {cardData[currentCardIndex]?.back.split("</p><p>")[0].replace(/<p>/g, '')}</p>
                  <p>Trái nghĩa: {cardData[currentCardIndex]?.back.split("</p><p>")[1].replace(/<p>/g, '')}</p>
                  <p>Ví dụ: {cardData[currentCardIndex]?.back.split("</p><p>")[2].replace(/<\/p>/g, '')}</p>
                </>
              )}
              </h1>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mr-2 text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handlePrevious}
        >
          Quay lại
        </button>
        <button
          className="px-4 py-2 text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handleNext}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default Card;
