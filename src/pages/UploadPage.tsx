import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHome from "../components/BackHome";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setTimeout(() => {
      navigate("/forecast");
    }, 800);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Back to Home */}
      <BackHome />

      <h1 className="text-2xl font-bold">Upload Barometer Data (Phyphox ZIP)</h1>

      {/* Hidden Input */}
      <input
        id="file-input"
        type="file"
        accept=".zip"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Styled Upload Button */}
      <button
        className="px-4 py-2 w-fit bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        Select ZIP File
      </button>

      {/* Show selected filename */}
      {file && (
        <div className="text-gray-700 text-sm">
          Selected: <span className="font-medium">{file.name}</span>
        </div>
      )}

      {/* Upload submit */}
      <button
        disabled={!file}
        className="px-4 py-2 w-fit bg-green-600 disabled:bg-gray-400 text-white rounded-lg"
        onClick={handleUpload}
      >
        Upload & View Forecast
      </button>
    </div>
  );
};

export default UploadPage;
