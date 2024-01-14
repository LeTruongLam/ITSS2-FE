"use client";
import React, { useState, useEffect } from "react";
import { Button, message, Dropdown, Menu } from "antd";
import { FolderOpenOutlined, MoreOutlined } from "@ant-design/icons";
import CreateFolder from "../../components/collections/CreateFolder";
import EditFolder from "../../components/collections/EditFolder";
import Link from "next/link";
const Collection = () => {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [editFolder, setEditFolder] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/decks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.status === 401) {
        console.log("Unauthorized");
        return;
      }
      const data = await res.json();
      setFolders(data);
    } catch (error) {
      console.error("Error fetching folder list:", error);
    }
  };

  const handleCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleEditFolder = (e, folder) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setEditFolder(folder);
    setShowEditFolder(true);
  };

  const handleDelete = async (e, id) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch(`http://localhost:3001/decks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        fetchData();

        message.success("Deleted!");
      } else {
        throw new Error("Failed to delete the folder");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const menu = (folder) => (
    <Menu>
      <Menu.Item key="edit" onClick={(e) => handleEditFolder(e, folder)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={(e) => handleDelete(e, folder.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-8 height-wrapper">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          <FolderOpenOutlined />
          <span className="ml-2">Your folders</span>
        </div>
        <Button
          className="bg-lime-700"
          type="primary"
          onClick={handleCreateFolder}
        >
          Add Folder
        </Button>
      </div>
      <div className="mt-6 flex gap-8 flex-wrap">
      {folders.map((folder) => (
          <div
            key={folder.id}
            className="w-[23%] h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200"
          >
            <div className="flex flex-col m-4 justify-start h-full pb-8">
              <div className="flex justify-between align-middle">
                <p className="text-ml mb-4 font-bold">{folder.name}</p>
                <Dropdown overlay={menu(folder)} trigger={["click"]}>
                  <MoreOutlined className="bg-slate-300  h-6 pl-1 pr-1 rounded-full font-bold " />
                </Dropdown>
              </div>
              <div className="mt-8 flexCenter">
                <Link href={`/decks/${folder.id}`}>
                  <p className="px-4 py-2 mr-2 text-black bg-slate-100 rounded hover:bg-slate-200">Open</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateFolder && (
        <CreateFolder 
        fetchData={fetchData}
        
        setShowCreateFolder={setShowCreateFolder} />
      )}
      {showEditFolder && (
        <EditFolder
          fetchData={fetchData}
          setShowEditFolder={setShowEditFolder}
          name={editFolder.name}
          parent_id={editFolder.parent_id}
          id={editFolder.id}
        />
      )}
    </div>
  );
};

export default Collection;
