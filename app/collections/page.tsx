"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import CreateFolder from "./CreateFolder";

const Collection = () => {
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const handleCreateFolder = () => {
    setShowCreateFolder(true);
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
        <Link href="/decks" className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
            <p className="m-4">Tên thư mục</p>
        </Link>
        <Link href="/decks" className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
            <p className="m-4">Tên thư mục</p>
        </Link>
        <Link href="/decks" className="w-4/12 h-56 shadow-md hover:shadow-xl rounded-2xl border border-slate-200">
            <p className="m-4">Tên thư mục</p>
        </Link>

        
      </div>
      {showCreateFolder && (
        <CreateFolder setShowCreateFolder={setShowCreateFolder} />
      )}
    </div>
  );
};

export default Collection;