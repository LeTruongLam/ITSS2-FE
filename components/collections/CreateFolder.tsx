"use client";
import React, { useState } from "react";
import { Input, message } from "antd";

const CreateFolder = ({ fetchData, setShowCreateFolder }) => {
  const [value, setValue] = useState({
    name: "",
    parent_id: "",
  });

  const handleClose = () => {
    setShowCreateFolder(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateFolder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
        body: JSON.stringify(value),
      });

      if (res.ok) {
        setShowCreateFolder(false);
        fetchData();
        message.success("Tạo thư mục thành công");
      } else {
        throw new Error("Lỗi khi tạo thư mục");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-200">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add new folder
                  </h3>
                  <div className="mt-2">
                    <div className="mt-2">
                      <Input
                        id="title"
                        placeholder="Enter name folder"
                        name="name"
                        value={value.name}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleCreateFolder}
                className="nline-flex w-full justify-center rounded-md bg-lime-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add folder
              </button>
              <button
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
