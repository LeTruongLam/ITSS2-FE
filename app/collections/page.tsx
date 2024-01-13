"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message } from "antd";
import CreateFolder from "../../components/collections/CreateFolder";
import EditFolder from "../../components/collections/EditFolder";
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from "@ant-design/icons";

const Collection = () => {
  const router = useRouter();
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [editFolder, setEditFolder] = useState({});
  // const token = localStorage.getItem("token");
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchData();
  }, []);

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
        console.log("Unauthorized");
        return;
      }
      if (res.status !== 200) {
        throw new Error("Failed to fetch folders");
      }
      const data = await res.json();
      setFolders(data);
    } catch (error) {
      console.error("Error fetching folders:", error.message);
    }
  };

  const handleCreateFolder = () => {
    setShowCreateFolder(true);
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
      <div className="mt-6 flex justify-between gap-8">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/decks/${folder.id}`}
            className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
          >
            <p className="m-4">{folder.name}</p>
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