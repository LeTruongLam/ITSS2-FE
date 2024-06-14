"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./views.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface Card {
  id: number;
  front_card: string;
  back_card: string;
  learn_date: string | null;
}
const ViewCards = () => {
  const router = useRouter();
  const { data: cards } = useSWR<Card[]>(
    "https://itss-2-be--one.vercel.app/api/v1/cards/learn-today",
    fetcher,
    { refreshInterval: 100 }
  );

  // const { data: currentDateData } = useSWR(
  //   "https://itss-2-be--one.vercel.app/api/v1/cards/card-learn",
  //   fetcher,
  //   { refreshInterval: 100 }
  // );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [cardData, setCardData] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardId, setCardId] = useState<string | undefined>();
  const [isAnimating, setIsAnimating] = useState(false);

  const rating = [
    {
      id: 0,
      text: "Again",
      label: "1m",
    },
    {
      id: 1,
      text: "Hard",
      label: "10m",
    },
    {
      id: 2,
      text: "Good",
      label: "1h",
    },
    {
      id: 3,
      text: "Easy",
      label: "1d",
    },
    {
      id: 4,
      text: "Very Easy",
      label: "2d",
    },
  ];

  const calculateNextTime = (text: string) => {
    const now = new Date();
    let nextTime;

    switch (text) {
      case "Again":
        nextTime = new Date(now.getTime() + 1 * 60000); // 1 minute
        break;
      case "Hard":
        nextTime = new Date(now.getTime() + 10 * 60000); // 10 minutes
        break;
      case "Good":
        nextTime = new Date(now.getTime() + 60 * 60000); // 1 hour
        break;
      case "Easy":
        nextTime = new Date(now.getTime() + 24 * 60 * 60000); // 1 day
        break;
      case "Very Easy":
        nextTime = new Date(now.getTime() + 2 * 24 * 60 * 60000); // 2 days
        break;
      default:
        nextTime = now;
        break;
    }

    // Convert date and time to 'YYYY-MM-DD HH:MM:SS' format
    const year = nextTime.getFullYear();
    const month = String(nextTime.getMonth() + 1).padStart(2, "0"); // Months are 0 indexed
    const day = String(nextTime.getDate()).padStart(2, "0");
    const hours = String(nextTime.getHours()).padStart(2, "0");
    const minutes = String(nextTime.getMinutes()).padStart(2, "0");
    const seconds = String(nextTime.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  const handlePrevious = () => {
    if (!isAnimating && cardData.length > 0) {
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
  const handleRating = async (id: number, text: string) => {
    const newDate = calculateNextTime(text);
    console.log(newDate);
    try {
      const response = await fetch(
        `https://itss-2-be--one.vercel.app/api/v1/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token format is correct
          },
          body: JSON.stringify({ newDate }),
        }
      );

      if (!response.ok) {
        // Handle non-2xx status codes
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    setIsFlipped(false);
    setIsAnimating(false);
  }, [currentCardIndex]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("https://itss-2-be--one.vercel.app/api/v1/cards/all-cards") // Adjust the URL according to your backend setup
      .then((response) => {
        setCardData(response.data);
        setCardId(response.data[0].id);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  return (
    <div className="bg-slate-100 h-screen">
      <div className="py-4 mx-8 flex justify-end">
        <button
          className="px-4 py-2 mr-2 text-white font-semibold bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/cards/learn-today");
          }}
        >
          Card learn today ({cards?.length})
        </button>
        <button
          className="px-4 py-2 mr-2 text-white font-semibold bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/cards/schedule");
          }}
        >
          Schedule
        </button>
        <button
          className="px-4 py-2 mr-2 text-white font-semibold bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/cards/add-card");
          }}
        >
          Add card
        </button>
      </div>
      <div className=" pt-6 flex items-center justify-center h-[500px]  flex-col	">
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
            {cardData.length > 0 && (
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
        <div className="m-6 flex flexCenter bg-white justify-center w-[800px] rounded-md">
          <div className="p-6 flex justify-center gap-3 w-full">
            {rating.map((item, index) => (
              <div key={item.id}>
                <button
                  className="px-4 py-2 mr-2 text-black bg-slate-100 rounded hover:bg-slate-200"
                  onClick={() => {
                    handleRating(item.id, item.text);
                    handleNext();
                  }}
                >
                  {item.text}({item.label})
                </button>
              </div>
            ))}
          </div>
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

export default ViewCards;
