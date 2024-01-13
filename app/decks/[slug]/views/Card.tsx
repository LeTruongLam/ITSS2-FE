import React, { useState } from "react";
import { motion } from "framer-motion";
import "./views.css";

const Card = () => {
    const cardData = [
        { id: 1, frontContent: "Front of Card 1", backContent: "Back of Card 1" },
        { id: 2, frontContent: "Front of Card 2", backContent: "Back of Card 2" },
        { id: 3, frontContent: "Front of Card 3", backContent: "Back of Card 3" },
        // Thêm các thẻ khác vào đây
      ];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
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
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) =>
        (prevIndex + 1) % cardData.length
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-[800px] cursor-pointer">
      <div
        className="flip-card w-[600px] h-[360px] rounded-md"
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
              <h1>{cardData[currentCardIndex].frontContent}</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center flip-card-front w-[100%] h-[100%] bg-cover text-black shadow-md hover:shadow-xl rounded-2xl border border-slate-200 p-4">
              <h1>{cardData[currentCardIndex].backContent}</h1>
            </div>
          )}
        </motion.div>
      </div>

      <button onClick={handlePrevious}>
        Quay lại
      </button>
      <button onClick={handleNext}>
        Tiếp theo
      </button>
    </div>
  );
};

export default Card;