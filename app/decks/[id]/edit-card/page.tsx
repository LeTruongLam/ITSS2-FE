"use client"
import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";

const CreateDeck = () => {
  const url = window.location.href;

  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const id = url.split("/")[4];
    setDeckId(id);
  }, [url]);

  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        front: "",
        back: {
          definition: "",
          synonyms: "",
          example: "",
        },
        deck_id: deckId,
      },
    ]);
  };

  const handleCardChange = (index, field, value) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const updatedCard = {
        ...updatedCards[index],
        back: {
          ...updatedCards[index].back,
          [field]: value,
        },
      };
      updatedCards[index] = updatedCard;
      return updatedCards;
    });
  };

  const handleRemoveCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  const handleCreateDeck = () => {
    const deck = {
      cards: cards,
    };
    console.log("Bộ thẻ đã được tạo:", deck);
    // Tiến hành lưu trữ bộ thẻ
    // ...
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
                      value={card.back.definition}
                      onChange={(e) =>
                        handleCardChange(index, "definition", e.target.value)
                      }
                    />
                    <Button onClick={() => handleCardChange(index, "definition", card.back.definition)}>Gửi</Button>
                  </div>
                </div>
                <div>
                  <label htmlFor={`synonyms-input-${index}`}>
                    Từ đồng nghĩa:
                  </label>
                  <div className="flex gap-6">
                    <Input
                      id={`synonyms-input-${index}`}
                      value={card.back.synonyms}
                      onChange={(e) =>
                        handleCardChange(index, "synonyms", e.target.value)
                      }
                    />
                    <Button onClick={() => handleCardChange(index, "synonyms", card.back.synonyms)}>Gửi</Button>
                  </div>
                </div>
                <div>
                  <label htmlFor={`example-input-${index}`}>Ví dụ:</label>
                  <div className="flex gap-6">
                    <Input
                      id={`example-input-${index}`}
                      value={card.back.example}
                      onChange={(e) =>
                        handleCardChange(index, "example", e.target.value)
                      }
                    />
                    <Button onClick={() => handleCardChange(index, "example", card.back.example)}>Gửi</Button>
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
  );
};

export default CreateDeck;