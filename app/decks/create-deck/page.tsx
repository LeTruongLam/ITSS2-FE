"use client"
import React, { useState } from "react";
import { Input, Select, Button } from "antd";

const { Option } = Select;

const CreateDeck = () => {
  const [cards, setCards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("default");

  const handleAddCard = () => {
    setCards([
      ...cards,
      { front: "", definition: "", synonyms: "", example: "" },
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
    const updatedCards = cards.filter((_, cardIndex) => cardIndex !== index);
    setCards(updatedCards);
  };

  const handleCreateDeck = () => {
    // Thực hiện xử lý lưu trữ bộ thẻ và các logic liên quan ở đây
    const deck = {
      name: deckName,
      folder: selectedFolder,
      cards: cards,
    };
    console.log("Bộ thẻ đã được tạo:", deck);
    // Tiến hành lưu trữ bộ thẻ
    // ...
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <span className="ml-2">Tạo bộ thẻ</span>
        </div>
      </div>
      <div>
        <div className="my-4">
          <label htmlFor="folder-select">Chọn thư mục:</label>
          <Select
            id="folder-select"
            defaultValue="default"
            value={selectedFolder}
            onChange={setSelectedFolder}
          >
            {/* Thêm các tùy chọn thư mục vào đây */}
          </Select>
        </div>
        {/* <div className="my-4">
          <label htmlFor="deck-name-input">Tên bộ thẻ:</label>
          <Input
            id="deck-name-input"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
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