"use client";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import dayjs from "dayjs"; // Import dayjs để xử lý ngày tháng

const fetcher = (url) => axios.get(url).then((res) => res.data);

function SchedulePage() {
  const router = useRouter();
  const { data: cardData } = useSWR(
    "http://localhost:8800/api/v1/cards/all-cards",
    fetcher
  );
  const [groupedCards, setGroupedCards] = useState({});

  useEffect(() => {
    if (cardData) {
      // Phân loại các card thành các cụm theo ngày tháng và nhóm "Cần học ngay"
      const grouped = {};
      cardData.forEach((card) => {
        let date;
        if (card.learn_date) {
          date = dayjs(card.learn_date).format("YYYY-MM-DD");
        } else {
          date = "Cần học ngay";
        }
        if (grouped[date]) {
          grouped[date].push(card);
        } else {
          grouped[date] = [card];
        }
      });

      // Sắp xếp các key để đưa nhóm "Cần học ngay" lên đầu
      const sortedKeys = Object.keys(grouped).sort((a, b) => {
        if (a === "Cần học ngay") return -1;
        if (b === "Cần học ngay") return 1;
        return a.localeCompare(b);
      });

      // Tạo một object mới với key đã sắp xếp
      const sortedGroupedCards = {};
      sortedKeys.forEach((key) => {
        sortedGroupedCards[key] = grouped[key];
      });

      setGroupedCards(sortedGroupedCards);
    }
  }, [cardData]);

  return (
    <div className="bg-slate-100 h-full min-h-screen py-5">
      <div className="py-4 mx-8 flex justify-start">
        <div
          className="flex justify-center items-center gap-1 text-black cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <RollbackOutlined className="text-xl" />
          <span>Back</span>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        {/* Lặp qua từng cụm ngày tháng và hiển thị */}
        {Object.keys(groupedCards).map((date) => (
          <div key={date} className="w-full max-w-[50%]">
            <h2 className="text-xl font-semibold mt-4 mb-2">{date}</h2>
            {groupedCards[date].map((card) => (
              <div key={card.id} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-lg font-semibold">{card.front_card}</h3>
                <p className="mt-2 text-sm text-gray-600">{card.back_card}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchedulePage;
