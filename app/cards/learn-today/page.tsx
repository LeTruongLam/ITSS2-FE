"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../views.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { RollbackOutlined } from "@ant-design/icons";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const LearnCardToday = () => {
  const router = useRouter();
  const { data: cardData } = useSWR(
    "https://itss-2-be--one.vercel.app/api/v1/cards/learn-today",
    fetcher
    // { refreshInterval: 100 }
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardId, setCardId] = useState();
  const [isAnimating, setIsAnimating] = useState(false);
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
        return nextIndex;
      });
    }
  };
  useEffect(() => {
    setIsFlipped(false);
    setIsAnimating(false);
  }, [currentCardIndex]);

  return (
    <div className="bg-slate-100 h-screen">
      <div className="py-4 mx-8 flex justify-start">
        <div
          className="flex justify-center items-center gap-1 text-black cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <RollbackOutlined className=" text-xl" />
          <span>Back</span>
        </div>
      </div>
      <div className=" pt-6 flex items-center justify-center h-[500px]  flex-col	">
        <h2 className="font-semibold text-3xl">Cards to learn today</h2>
        <span>
          {currentCardIndex + 1}/{cardData?.length}
        </span>
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
            {cardData?.length > 0 && (
              <>
                {isFlipped ? (
                  <div className="flip-card-back w-[100%] h-[100%] bg-white text-black p-4 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
                    <h1 className="text-3xl flex w-[100%] h-[100%] bg-white flexCenter flex-col">
                      {cardData[currentCardIndex]?.back_card && (
                        <div className="">
                          <p>
                            {cardData[currentCardIndex]?.back_card
                              .split("</p><p>")[0]
                              .replace(/<p>/g, "")}
                          </p>
                        </div>
                      )}
                    </h1>
                  </div>
                ) : (
                  <div className="flip-card-front w-[100%] h-[100%] bg-white text-black shadow-md hover:shadow-xl rounded-2xl border border-slate-200 p-4">
                    <h1 className="flex  text-3xl w-[100%] h-[100%] flexCenter">
                      {cardData[currentCardIndex]?.front_card}
                    </h1>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <button
          className="px-4 py-2 mr-2 disabled:opacity-25 disabled:cursor-no-drop text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handlePrevious}
          disabled={currentCardIndex + 1 === 1}
        >
          Back
        </button>
        <button
          className="px-4 py-2 disabled:opacity-25 disabled:cursor-no-drop text-white bg-lime-700 rounded hover:bg-lime-600"
          onClick={handleNext}
          disabled={currentCardIndex + 1 === cardData?.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LearnCardToday;
