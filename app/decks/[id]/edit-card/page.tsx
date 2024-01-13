"use client";
import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { RobotOutlined } from "@ant-design/icons";
const CreateDeck = (props: any) => {
  const [cards, setCards] = useState({
    front: "",
    back: { definition: "", synonyms: "", example: "" },
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const deck_id = props.params?.id;

  const handleCreateDeck = async () => {
    console.log("Input:", cards);
    const { front, back } = cards;
    const { definition, synonyms, example } = back;

    const cardsData = {
      front,
      back: `<p>${definition}</p><p>${synonyms}</p><p>${example}</p>`,
    };

    try {
      const res = await fetch(`http://localhost:3001/decks/${deck_id}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(cardsData),
      });

      if (res.ok) {
        message.success("Tạo thành công");
      } else {
        // Xử lý khi tạo thẻ thất bại
        throw new Error("Lỗi khi tạo thẻ");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCards((prevCards) => ({
      ...prevCards,
      [name]: value,
    }));
  };

  const handleBackInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCards((prevCards) => ({
      ...prevCards,
      back: {
        ...prevCards.back,
        [name]: value,
      },
    }));
  };

  return (
    <div className="p-8 height-wrapper">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <span className="ml-2">Tạo bộ thẻ</span>
        </div>
      </div>
      <div>
        <div className="my-4">
          <label htmlFor="folder-select">Chọn thư mục:</label>
          <div className="my-4">
            <div className="flex gap-6">
              <div className="flex-1">
                <label htmlFor="front-input">Mặt trước:</label>
                <div className="flex gap-6">
                  <Input
                    id="front-input"
                    name="front"
                    value={cards.front}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div>
                  <label htmlFor="definition-input">Định nghĩa:</label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined />}
                      id="definition-input"
                      name="definition"
                      value={cards.back.definition}
                      onChange={handleBackInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="synonyms-input">Từ đồng nghĩa:</label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined />}

                      id="synonyms-input"
                      name="synonyms"
                      value={cards.back.synonyms}
                      onChange={handleBackInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="example-input">Ví dụ:</label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined />}

                      id="example-input"
                      name="example"
                      value={cards.back.example}
                      onChange={handleBackInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleCreateDeck}>Tạo thẻ</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
