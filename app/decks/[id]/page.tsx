"use client";
import {
  FolderOpenOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, message } from "antd";
import CreateDeck from "../../../components/decks/CreateDecks";
import EditDecks from "../../../components/collections/EditFolder";

const TheDeck = (props: any) => {
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [editDeck, setEditDeck] = useState({});
  // const [deck, setDeck] = useState([]);
  const [decks, setDecks] = useState([]);
  const [parent, setParent] = useState({});

  // const token = localStorage.getItem("token");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const parent_id = props.params?.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/decks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (res.status === 401) {
        // Xử lý trường hợp không xác thực thành công
        console.log("Unauthorized");
        return;
      }
      const data = await res.json();
      selectDeck(data);
      console.log(data)
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thư mục:", error);
    }
  };

  const selectDeck = async (data: any) => {
    data.forEach((deck: any) => {
      if (deck.id == parent_id) {
        setDecks(deck);
        return;
      }
    });
  };

  const handleCreateDeck = () => {
    setShowCreateDeck(true);
  };

  const handleEditDeck = (e: any, deck: any) => {
    e.preventDefault();
    setEditDeck(deck);
    setShowEditDeck(true);
    fetchData();
  };

  const handleDelete = async (e: any, id: number) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/decks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        message.success("Đã xóa!");
        fetchData();
      } else {
        throw new Error("Không thể xóa thẻ");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="p-8 height-wrapper">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <FolderOpenOutlined />
          <span className="ml-2">Tên thư mục</span>
        </div>
      
        <Button
          className="bg-lime-700"
          type="primary"
          onClick={handleCreateDeck}
        >
          Add deck
        </Button>
      </div>
      <div className="mt-6 flex gap-8 flex-wrap">
        {decks.children &&
          decks.children.map((deck: any) => (
            <Link
              key={deck.id}
              href={`/decks/${deck.id}/views`}
              className="w-[23%] h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
            >
              <div className="flex flex-col m-4 justify-between h-full pb-8">
                <div>
                  <p className="text-ml mb-4 font-bold">{deck.name}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <EditOutlined
                      style={{ fontSize: "24px" }}
                      onClick={(e) => {
                        handleEditDeck(e, deck);
                      }}
                    />
                    <DeleteOutlined
                      className="ml-4 text-2xl"
                      onClick={(e) => {
                        handleDelete(e, deck.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {showCreateDeck && (
        <CreateDeck
          fetchData={fetchData}
          setShowCreateDeck={setShowCreateDeck}
          id={parent_id}
        />
      )}
      {showEditDeck && (
        <EditDecks
          setShowEditFolder={setShowEditDeck}
          name={editDeck.name}
          parent_id={editDeck.parent_id}
          id={editDeck.id}
        />
      )}
    </div>
  );
};

export default TheDeck;
