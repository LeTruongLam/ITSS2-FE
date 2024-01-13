"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";

const { Option } = Select;

const CreateDeck = (props: any) => {
  const [cards, setCards] = useState([]);
  const [frontCard, setFrontCard] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const parent_id = props.params?.id;

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

  const handleCreateDeck = () => {
    const deck = {
      cards: cards.map((card) => ({
        front: card.front,
        back: {
          definition: card.definition,
          synonyms: card.synonyms,
          example: card.example,
        },
      })),
    };
    console.log("Bộ thẻ đã được tạo:", deck.cards);
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
          {/* <Select
            id="folder-select"
            defaultValue="default"
            value={selectedFolder}
            onChange={setSelectedFolder}
            className="w-full"
          >
            {decks.map((deck) => (
              <Option key={deck.id} value={deck.id}>
                {deck.name}
              </Option>
            ))}
          </Select> */}
        </div>
        {/* <div className="my-4">
          <label htmlFor="deck-name-input">Tên bộ thẻ:</label>
          <Input
            id="deck-name-input"
            value={frontCard}
            onChange={(e) => setFrontCard(e.target.value)}
          />
        </div> */}
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
  );
};

export default CreateDeck;
