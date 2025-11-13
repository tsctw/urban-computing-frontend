import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

const UploadSection: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** 處理檔案選取（支援多次選取、避免重複） */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return; // 使用者按取消不影響現有列表

    const newFiles = Array.from(selected);
    const unique = [...files];
    newFiles.forEach((f) => {
      const duplicate = files.some(
        (existing) => existing.name === f.name && existing.size === f.size
      );
      if (!duplicate) unique.push(f);
    });

    setFiles(unique);
    e.target.value = ""; // 允許再次選同檔案
  };

  /** 上傳檔案（根據數量自動選 API） */
  const handleUpload = async () => {
    if (files.length === 0) {
      setNotification("⚠️ No file selected");
      return;
    }

    setUploading(true);
    setNotification("📤 Uploading...");

    try {
      const formData = new FormData();
      let message = "";

      // 單檔案 → /upload
      if (files.length === 1) {
        formData.append("file", files[0]);
        const res = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
        message = "✅ Upload completed successfully!";
      }

      // 多檔案 → /upload_batch
      else {
        files.forEach((f) => formData.append("files", f));
        const res = await fetch(`${API_BASE}/upload_batch`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Batch upload failed");

        const data = await res.json();

        // 🧠 根據回傳內容製作通知
        const { success_count, failed_count, failed_files } = data;

        if (success_count > 0 && failed_count === 0) {
          message = "✅ All files uploaded successfully!";
        } else if (success_count === 0 && failed_count > 0) {
          message =
            `❌ Upload failed for ${failed_count} file(s):\n` +
            failed_files.map((f: string) => `• ${f.trim()}`).join("\n");
        } else if (success_count > 0 && failed_count > 0) {
          message =
            `⚠️ Some uploads failed (${failed_count} file(s)):\n` +
            failed_files.map((f: string) => `• ${f.trim()}`).join("\n");
        } else {
          message = "✅ Upload completed!";
        }
      }

      setNotification(message);
    } catch (error) {
      console.error(error);
      setNotification("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setFiles([]); // ✅ 上傳後清空列表
      setTimeout(() => setNotification(null), 5000);
    }
  };

  /** 清空檔案列表 */
  const handleClear = () => {
    setFiles([]);
    setNotification("🗑 Cleared all files");
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Upload Section</h2>
      <p className="text-gray-600 mb-6">
        Select one or more files to upload to the cloud service.
      </p>

      {/* 選擇 + 上傳 + 清除 */}
      <div className="flex flex-col items-center space-y-4">
        {/* 檔案選擇 */}
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          Select Files
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* 檔案列表 */}
        {files.length > 0 && (
          <ul className="text-gray-700 bg-white rounded-lg shadow p-4 w-80 max-h-60 overflow-auto text-left">
            {files.map((file, i) => (
              <li key={i} className="truncate">
                • {file.name}
              </li>
            ))}
          </ul>
        )}

        {/* 按鈕列 */}
        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-5 py-2 rounded-lg shadow`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={handleClear}
            disabled={uploading || files.length === 0}
            className={`${
              uploading || files.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            } px-5 py-2 rounded-lg shadow`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Notification with animation */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg whitespace-pre-line text-left max-w-sm"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadSection;
