"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./views.css";
import {

  RollbackOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Card = ({ deck_id }) => {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [cardData, setCardData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardId, setCardId] = useState();
  const [isAnimating, setIsAnimating] = useState(false);
  const [rating, setRating] = useState([
    {
      id: 0,
      text: "Again",
    },
    {
      id: 1,
      text: "Hard",
    },
    {
      id: 2,
      text: "Good",
    },
    {
      id: 3,
      text: "Easy",
    },
    // Add more objects as needed
  ]);
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
        console.log(data);

        await setCardId(data[0].id);
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

      const previousIndex =
        currentCardIndex === 0 ? cardData.length - 1 : currentCardIndex - 1;
      console.log(cardData[previousIndex].id);

      setCardId(cardData[previousIndex].id);
    }
  };
  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) => {
        const nextIndex = prevIndex === cardData.length - 1 ? 0 : prevIndex + 1;
        setCardId(cardData[nextIndex].id);
        console.log(cardData[nextIndex].id);
        return nextIndex;
      });
    }
  };
  const handleRating = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/decks/${deck_id}/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ rating: id }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating card rating:", error);
    }
  };
  useEffect(() => {
    setIsFlipped(false);
    setIsAnimating(false);
  }, [currentCardIndex]);

  return (
    <div >
       <div className="flexStart pt-1 ml-8 mr-8 " style={{ alignItems: "flex-start" }}>
        <div
          className="flexStart items-start gap-1 mt-6 text-black cursor-pointer"
          style={{ alignItems: "flex-start" }}
          onClick={() => {
            router.back();
          }}
        >
          <RollbackOutlined className="mb-4 text-2xl" />
          <span>Back</span>
        </div>
      </div>
      <div className=" pt-6 flex items-center justify-center h-[500px]  flex-col	">
        <div
          className="flip-card w-[800px] h-[450px] rounded-md cursor-pointer "
          onClick={handleFlip}
        >
          <motion.div
            className="flip-card-card-inner w-[100%] h-[100%]"
            initial={false}
            animate={{ rotateX: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setIsAnimating(false);
            }}
          >
            {cardData.length > 0 && (
              <>
                {isFlipped ? (
                  <div className="flip-card-back w-[100%] h-[100%] bg-white text-black p-4 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
                    <h1 className="text-3xl flex w-[100%] h-[100%] bg-white flexCenter flex-col">
                      {cardData[currentCardIndex]?.back && (
                        <div className="">
                          <p>
                            Định nghĩa:
                            {cardData[currentCardIndex]?.back
                              .split("</p><p>")[0]
                              .replace(/<p>/g, "")}
                          </p>
                          <p>
                            Cách sử dụng:
                            {cardData[currentCardIndex]?.back
                              .split("</p><p>")[1]
                              .replace(/<p>/g, "")}
                          </p>
                          <p>
                            Ví dụ:
                            {cardData[currentCardIndex]?.back
                              .split("</p><p>")[2]
                              .replace(/<\/p>/g, "")}
                          </p>
                        </div>
                      )}
                    </h1>
                  </div>
                ) : (
                  <div className="flip-card-front w-[100%] h-[100%] bg-white text-black shadow-md hover:shadow-xl rounded-2xl border border-slate-200 p-4">
                    <h1 className="flex  text-3xl w-[100%] h-[100%] flexCenter">
                      {cardData[currentCardIndex]?.front}
                    </h1>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
        <div className="m-6 flex flexCenter bg-white justify-center w-[800px] rounded-md">
          <div className="p-6 flex justify-center gap-3 w-full">
            {rating.map((item) => (
              <div key={item.id}>
                <button
                  className="px-4 py-2 mr-2 text-black bg-slate-100 rounded hover:bg-slate-200"
                  onClick={() => {
                    handleRating(item.id);
                    handleNext();
                  }}
                >
                  {item.text}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <button
          className="px-4 py-2 mr-2 text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handlePrevious}
        >
          Back
        </button>
        <button
          className="px-4 py-2 text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
