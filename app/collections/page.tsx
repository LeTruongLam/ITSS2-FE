"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message } from "antd";
import CreateFolder from "../../components/collections/CreateFolder";
import EditFolder from "../../components/collections/EditFolder";
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from "@ant-design/icons";

const Collection = () => {

  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [editFolder, setEditFolder] = useState({});
  // const token = localStorage.getItem("token");
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchData();
  }, [folders]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/decks", {
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
      setFolders(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thư mục:", error);
    }
  };
  const handleCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleEditFolder = (e: any, folder: any) => {
    e.preventDefault();
    setEditFolder(folder);
    setShowEditFolder(true);
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
      } else {
        throw new Error("Không thể xóa thẻ");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <FolderOpenOutlined />
          <span className="ml-2">Thư mục của bạn</span>
        </div>
        <Button
          className="bg-lime-700"
          type="primary"
          onClick={handleCreateFolder}
        >
          Tạo thư mục
        </Button>
      </div>
      <div className="mt-6 flex gap-8 flex-wrap">
        {folders.map((folder: any) => (
          <Link
            key={folder.id}
            href={`/decks/${folder.id}`}
            className="w-[23%] h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
          >
            <div className="flex flex-col m-4 justify-between h-full pb-8">
              <div>
                <p className="text-ml mb-4 font-bold">{folder.name}</p>
                {/* <p className="mb-3">Mô tả</p> */}
              </div>
              <div className="flex justify-between">
                <span className="">Ngày cập nhật bộ thẻ</span>
                <div>
                  <EditOutlined
                    style={{ fontSize: "24px" }}
                    onClick={(e) => {
                      handleEditFolder(e, folder);
                    }}
                  />
                  <DeleteOutlined
                    className="ml-4 text-2xl"
                    onClick={(e) => {
                      handleDelete(e, folder.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showCreateFolder && (
        <CreateFolder setShowCreateFolder={setShowCreateFolder} />
      )}
      {showEditFolder && (
        <EditFolder setShowEditFolder={setShowEditFolder} name={editFolder.name} parent_id={editFolder.parent_id} id={editFolder.id} />
      )}
    </div>
  );
};
export default Collection;