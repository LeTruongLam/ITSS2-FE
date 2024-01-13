"use client";
import React, { useState } from "react";
import { Input, message } from "antd";

const CreateDeck = ({ setShowCreateDeck, id, fetchData }) => {
  const [value, setValue] = useState({
    name: "",
    parent_id: id,
  });

  const handleClose = () => {
    setShowCreateDeck(false);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setValue(() => ({
      name: value,
      parent_id: id,
    }));
    console.log(id);
  };

  const handleCreateDeck = async () => {
    // Xử lý logic tạo thư mục ở đây
    const token = localStorage.getItem("token");
    console.log(token);
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
        fetchData();
        setShowCreateDeck(false);
        message.success("Tạo thư mục thành công");
      } else {
        // Xử lý khi tạo thư mục thất bại
        throw new Error("Lỗi khi tạo thư mục");
      }
    } catch (error: any) {
      // Xử lý khi có lỗi xảy ra
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
                    Tạo thư mục mới
                  </h3>
                  <div className="mt-2">
                    <div className="mt-2">
                      <Input
                        id="title"
                        placeholder="Nhập tên thư mục"
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
                onClick={handleCreateDeck}
                className="nline-flex w-full justify-center rounded-md bg-lime-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Tạo thư mục
              </button>
              <button
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
