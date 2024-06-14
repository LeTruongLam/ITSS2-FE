"use client";
import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { RobotOutlined, RollbackOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateDeck = (props: any) => {
  const router = useRouter();

  const [cards, setCards] = useState({
    front_card: "",
    back_card: "",
  });

  const handleCreateDeck = async () => {
    const { front_card, back_card } = cards;
    console.log(cards);
    try {
      const res = await axios.post(
        `https://itss-2-be--one.vercel.app/api/v1/cards/create-card`,
        { front_card, back_card }
      );

      if (res.status === 201) {
        message.success("Add success!");
        setCards({
          front_card: "",
          back_card: "",
        });
      } else {
        // Handle the case when card creation fails
        throw new Error("Error creating card");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCards((prevCards) => ({
      ...prevCards,
      [name]: value,
    }));
  };

  return (
    <div className="p-8 height-wrapper">
      <div className="flex justify-between items-center">
        <div className="flex pt-1">
          <div
            className="flexStart items-start gap-1 text-black cursor-pointer"
            style={{ alignItems: "flex-start" }}
            onClick={() => {
              router.back();
            }}
          >
            <RollbackOutlined className="mb-4 text-2xl" />
            <span>Back</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="text-2xl font-bold">
          <span className="ml-2">Add card</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[50%] ">
          <div className="my-4 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex-1 ">
                <label htmlFor="front_card">Front view :</label>
                <div className="flex gap-6">
                  <Input
                    id="front_card"
                    name="front_card"
                    value={cards.front_card}
                    onChange={handleInputChange}
                    className="min-h-24"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div>
                  <label htmlFor="back_card">Back view :</label>
                  <div className="flex gap-6">
                    <Input
                      id="back_card"
                      name="back_card"
                      value={cards.back_card}
                      className="min-h-24"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleCreateDeck}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
