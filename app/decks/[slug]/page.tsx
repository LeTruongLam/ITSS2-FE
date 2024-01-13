"use client";
import { FolderOpenOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message } from "antd";

const TheDeck = ({ params }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/decks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (res.status === 401) {
        console.log("Unauthorized");
        return;
      }
      if (res.status !== 200) {
        throw new Error("Failed to fetch folders");
      }
      const data = await res.json();
      setDatas(data);
    
   
    } catch (error) {
      console.error("Error fetching folders:", error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Giả định gọi API xóa thẻ
      const response = await fetch(
        `https://api.example.com/decks/${params.slug}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("Đã xóa!");
      } else {
        throw new Error("Không thể xóa thẻ");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <FolderOpenOutlined />
          <span className="ml-2">Tên thư mục</span>
        </div>
        <Link href="/decks/create-deck">
          <Button className="bg-lime-700" type="primary">
            Tạo bộ thẻ
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex justify-between gap-8">
        <Link
          href={`/decks/${params.slug}/views`}
          className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
        >
          <div className="flex flex-col m-4 justify-between h-full pb-8">
            <div>
              <p className="text-ml mb-4 font-bold">Tên bộ thẻ</p>
              <p className="mb-3">Mô tả</p>
            </div>
            <div className="flex justify-between">
              <span className="">Ngày cập nhật bộ thẻ</span>
              <DeleteOutlined
                style={{ fontSize: "24px" }}
                onClick={handleDelete}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TheDeck;
