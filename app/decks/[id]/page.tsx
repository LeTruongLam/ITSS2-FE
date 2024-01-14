"use client";
import {
  FolderOpenOutlined,
  FireFilled,
  MoreOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, message, Dropdown, Menu } from "antd";
import { useRouter } from "next/navigation";

import CreateDeck from "../../../components/decks/CreateDecks";
import EditDecks from "../../../components/collections/EditFolder";

const TheDeck = (props: any) => {
  const router = useRouter();

  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [editDeck, setEditDeck] = useState({});
  const [decks, setDecks] = useState([]);
  const [parent, setParent] = useState({});

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const parent_id = props.params?.id;
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
      await selectDeck(data);
      console.log(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thư mục:", error);
    }
  };
  useEffect(() => {
    console.log(decks);
    fetchData();
  }, []);

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
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setEditDeck(deck);
    setShowEditDeck(true);
    fetchData();
  };

  const handleDelete = async (e: any, id: number) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
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
  const menu = (deck) => (
    <Menu>
      <Menu.Item key="add">
        <Link href={`/decks/${deck.id}/edit-card`}>Add card</Link>
      </Menu.Item>
      <Menu.Item key="edit" onClick={(e) => handleEditDeck(e, deck)}>
        Edit deck
      </Menu.Item>
      <Menu.Item key="delete" onClick={(e) => handleDelete(e, deck.id)}>
        Delete deck
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="p-8 pt-4 height-wrapper bg-slate-100">
      <div className="flexStart pt-1 " style={{ alignItems: "flex-start" }}>
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
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <FolderOpenOutlined />
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
            <div
              key={deck.id}
              className="w-[23%] h-56 shadow-md hover:shadow-xl rounded-2xl border bg-white border-slate-200"
            >
              <div className="flex flex-col m-4 justify-between h-full pb-8 ">
                <div className="flex justify-between align-middle">
                  <p className="text-ml mb-4 font-bold">{deck.name}</p>
                  <Dropdown overlay={menu(deck)} trigger={["click"]}>
                    <MoreOutlined className="bg-slate-300  h-6 pl-1 pr-1 rounded-full font-bold " />
                  </Dropdown>
                </div>
                <div className="flexCenter">
                  <Link href={`/decks/${deck.id}/views`}>
                    <p className="px-4 py-2 mr-2 text-black bg-slate-100 rounded hover:bg-slate-200">
                      Open
                    </p>
                  </Link>
                </div>
                <div className="flex justify-between align-middle ">
                  <Link
                    href={`/decks/${deck.id}/cards-learn-today`}
                    className="underline text-red-600 flex gap-2"
                  >
                    <FireFilled />
                    Cards to learn today ({deck.number_of_cards_today})
                  </Link>
                </div>
              </div>
            </div>
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
          fetchData={fetchData}
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
