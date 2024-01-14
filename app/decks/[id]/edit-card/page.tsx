"use client";
import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { RobotOutlined } from "@ant-design/icons";
const CreateDeck = (props: any) => {
  const [cards, setCards] = useState({
    front: "",
    back: { definition: "", usage: "", example: "" },
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const deck_id = props.params?.id;

  const handleCreateDeck = async () => {
    console.log("Input:", cards);
    const { front, back } = cards;
    const { definition, usage, example } = back;

    const cardsData = {
      front,
      back: `<p>${definition}</p><p>${usage}</p><p>${example}</p>`,
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
        message.success("Add success!  ");
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

  const handleGenerateDefinition = async (front: string) => {
    const value = { "word": front }
    console.log(value);

    try {
      const res = await fetch(`http://localhost:3000/api/card/def`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(value),
      });
      if (res.status === 401) {
        // Xử lý trường hợp không xác thực thành công
        console.log("Unauthorized");
        return;
      }
      const data = await res.json();
      const result = data.res.split('\n')[1];
      setCards((prevCards) => ({
        ...prevCards,
        back: {
          ...prevCards.back,
          definition: result,
        },
      }));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thư mục:", error);
    }
  };

  const handleGenerateUsage = async (front: string) => {
    const value = { "word": front }
    console.log(value);

    try {
      const res = await fetch(`http://localhost:3000/api/card/usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(value),
      });
      if (res.status === 401) {
        // Xử lý trường hợp không xác thực thành công
        console.log("Unauthorized");
        return;
      }
      const data = await res.json();
      const result = data.res;
      setCards((prevCards) => ({
        ...prevCards,
        back: {
          ...prevCards.back,
          usage: result,
        },
      }));
    } catch (error) {
      console.error("Error getting directory list!!!");
    }
  };

  const handleGenerateExample = async (front: string) => {
    const value = { "word": front }
    console.log(value);

    try {
      const res = await fetch(`http://localhost:3000/api/card/example`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(value),
      });
      if (res.status === 401) {
        console.log("Unauthorized");
        return;
      }
      const data = await res.json();
      const result = data.res;
      setCards((prevCards) => ({
        ...prevCards,
        back: {
          ...prevCards.back,
          example: result,
        },
      }));
    } catch (error) {
      console.error("Error getting directory list!!!");
    }
  };

  return (
    <div className="p-8 height-wrapper">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <span className="ml-2">Add card</span>
        </div>
      </div>
      <div>
        <div className="my-4">
          <div className="my-4">
            <div className="flex gap-6">
              <div className="flex-1">
                <label htmlFor="front-input">Front view :</label>
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
                  <label htmlFor="definition-input">Definition :</label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined onClick={() => handleGenerateDefinition(cards.front)} />}
                      id="definition-input"
                      name="definition"
                      value={cards.back.definition}
                      onChange={handleBackInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`usage-input`}>
                  Usage :
                  </label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined onClick={() => handleGenerateUsage(cards.front)} />}

                      id="usage-input"
                      name="usage"
                      value={cards.back.usage}
                      onChange={handleBackInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="example-input">Example :</label>
                  <div className="flex gap-6">
                    <Input
                      addonAfter={<RobotOutlined onClick={() => handleGenerateExample(cards.front)} />}

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
          <Button onClick={handleCreateDeck}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
