"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "antd";
import CreateFolder from "./CreateFolder";

const Collection = () => {
  const router = useRouter();
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState([]);

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
      setFolders(data);
    } catch (error) {
      console.error("Error fetching folders:", error.message);
    }
  };

  const handleCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleLinkClick = (folderId) => {
    router.push(`/decks/${folderId}`, { state: folders });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Thư mục của bạn</div>
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
          <div
            key={folder.id}
            onClick={() => handleLinkClick(folder.id)}
            className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
          >
            <p className="m-4">{folder.name}</p>
          </div>
        ))}
      </div>
      {showCreateFolder && (
        <CreateFolder setShowCreateFolder={setShowCreateFolder} />
      )}
    </div>
  );
};

export default Collection;