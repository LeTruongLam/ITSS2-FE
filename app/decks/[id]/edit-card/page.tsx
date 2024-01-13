"use client";
import React, { useState, useEffect } from "react";
import { Input,  Button , message} from "antd";

const CreateDeck = (props: any) => {
  const [cards, setCards] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const deck_id = props.params?.id;

  const handleAddCard = () => {
    setCards([
      ...cards,
      { front: "", back: { definition: "", synonyms: "", example: "" } },
    ]);
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
    };
    setCards(updatedCards);
  };

  const handleRemoveCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const handleCreateDeck = async () => {
    const deck = {
      cards: cards.map((card) => ({
        front: card.front,
       
      })),
    };
    console.log("Input:", deck.cards);

    try {
      const res = await fetch(
        `http://localhost:3001/decks/${deck_id}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
          body: JSON.stringify(deck.cards),
        }
      );

      if (res.ok) {
        message.success("Tạo thành công");
      } else {
        // Xử lý khi tạo thư mục thất bại
        throw new Error("Lỗi khi tạo ");
      }
    } catch (error: any) {
      message.error(error.message);
    }
    // Tiến hành lưu trữ bộ thẻ
    // ...
  };

  return (
    <div className="p-8 height-wrapper ">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <span className="ml-2">Tạo bộ thẻ</span>
        </div>
      </div>
      <div>
        <div className="my-4">
          <label htmlFor="folder-select">Chọn thư mục:</label>
          <div className="my-4">
            {cards.map((card, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-1">
                  <label htmlFor={`front-input-${index}`}>Mặt trước:</label>
                  <div className="flex gap-6">
                    <Input
                      id={`front-input-${index}`}
                      value={card.front}
                      onChange={(e) =>
                        handleCardChange(index, "front", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <label htmlFor={`definition-input-${index}`}>
                      Định nghĩa:
                    </label>
                    <div className="flex gap-6">
                      <Input
                        id={`definition-input-${index}`}
                        value={card.definition}
                        onChange={(e) =>
                          handleCardChange(index, "definition", e.target.value)
                        }
                      />
                      <Button>Gửi</Button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`synonyms-input-${index}`}>
                      Từ đồng nghĩa:
                    </label>
                    <div className="flex gap-6">
                      <Input
                        id={`synonyms-input-${index}`}
                        value={card.synonyms}
                        onChange={(e) =>
                          handleCardChange(index, "synonyms", e.target.value)
                        }
                      />
                      <Button>Gửi</Button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`example-input-${index}`}>Ví dụ:</label>
                    <div className="flex gap-6">
                      <Input
                        id={`example-input-${index}`}
                        value={card.example}
                        onChange={(e) =>
                          handleCardChange(index, "example", e.target.value)
                        }
                      />
                      <Button>Gửi</Button>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleRemoveCard(index)}>Xóa</Button>
              </div>
            ))}
          </div>
          <Button onClick={handleAddCard}>Thêm thẻ</Button>
          <Button onClick={handleCreateDeck}>Tạo thẻ</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
