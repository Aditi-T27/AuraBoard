

"use client";

import React, { useState, useRef, ChangeEvent,useEffect } from "react";
import {
  Camera,
  Download,
  Type,
  Palette,
  AlignLeft,
  AlignRight,
  Save,
  Settings,
  User,
  LogOut,
  FileText,
} from "lucide-react";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import {Toaster,toast} from "react-hot-toast";
// Types
type ImageItem = {
  id: string;
  src: string;
  name: string;
};

type AllValue = {
  title: string;
  userId:string,
  journalContent: string;
  images: ImageItem[];
  previewImages: ImageItem[];// base64 previews before upload
  imagePosition: "left" | "right";
  textareaColor: string;
  fontFamily: string;
  fontSize: number;
  showSettings: boolean;
};

type ColorOption = {
  name: string;
  value: string;
};


export default function Dashboard() {


  const searchParams = useSearchParams();
 
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const title = searchParams.get('title');
  const id = searchParams.get('userId');
  const [update, setUpdate] = useState(false); // or true by default if needed

  const idData={
    username:username,
    email:email
  }

  const updateData={
    title:title,
    id:id,
  }
 
  const [allValue, setAllValue] = useState<AllValue>({
    title: "",
    userId:"",
    journalContent: "",
    images: [],
    previewImages: [], // base64 previews before upload
    imagePosition: "right",
    textareaColor: "#1e1b4b",
    fontFamily: "Inter",
    fontSize: 16,
    showSettings: false,
  });

   // Automatically runs on page load / reload
   useEffect(()=>{
    const fetchData = async () => {
      try {
      
        const res = await axios.get('/api/users/getId', { params: idData });
        const data = res.data; // Use Axios response data directly
        setAllValue({...allValue,userId:data.id});
        console.log(res.data.id);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email,username]); 




  useEffect(() => {
  const updateData = async () => {
    try {
      if (id && title) {
    setUpdate(true);
    console.log("Update mode: ON - Found id and title params");
  } else {
    setUpdate(false);
    console.log("Update mode: OFF - Missing id or title params");
  }
      const res = await axios.get('/api/users/getDetails', {
        params: { id, title },
      });

      const entries = res.data.data;

      if (entries && entries.length > 0) {
        const entry = entries[0];

        setAllValue((prev) => ({
          ...prev,
          title: entry.title || "",
          userId: String(entry.user_id) || "",
          journalContent: entry.content || "",
          images: entry.image_urls || [],
          textareaColor: entry.background_color || "#1e1b4b",
          fontFamily: entry.font_family || "Inter",
          fontSize: entry.font_size || 16,
        }));

        console.log("Entry loaded:", entry);
      } else {
        console.warn("No entries found for given id and title");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  updateData();
}, [title, id]);


  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const colors: ColorOption[] = [
    { name: "Deep Purple", value: "#1e1b4b" },
    { name: "Royal Blue", value: "#1e3a8a" },
    { name: "Emerald", value: "#064e3b" },
    { name: "Rose", value: "#881337" },
    { name: "Amber", value: "#92400e" },
    { name: "Slate", value: "#0f172a" },
    { name: "Indigo", value: "#312e81" },
    { name: "Teal", value: "#134e4a" },
  ];

  const fonts = [
    "Inter",
    "Georgia",
    "Times New Roman",
    "Arial",
    "Helvetica",
    "Courier New",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
  ];

  const updateState = <K extends keyof AllValue>(key: K, value: AllValue[K]) => {
    setAllValue((prev) => ({ ...prev, [key]: value }));
  };

  //preiview image




  // Image upload handler
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedImages: ImageItem[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post("/api/users/uploadImage", formData);
        const data = res.data;

        if (data.url) {
          uploadedImages.push({
            id: `${Date.now()}-${Math.random()}`,
            src: data.url,
            name: file.name,
          });
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    setAllValue((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
  };

  // Remove image handler
  const removeImage = (id: string) => {
    setAllValue((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  // PDF export
  const generatePDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${allValue.title || "Journal Entry"} - ${new Date().toLocaleDateString()}</title>
          <style>
            body {
              font-family: ${allValue.fontFamily}, sans-serif;
              font-size: ${allValue.fontSize}px;
              line-height: 1.6;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 20px;
            }
            .date {
              color: #8b5cf6;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin: 0;
            }
            .content-section {
              margin: 30px 0;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #8b5cf6;
              margin-bottom: 15px;
            }
            .journal-text {
              background-color: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #8b5cf6;
              white-space: pre-wrap;
            }
            .images-section {
              margin-top: 30px;
            }
            .image-item {
              margin: 20px 0;
              text-align: center;
            }
            .image-item img {
              max-width: 100%;
              max-height: 400px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .stats {
              margin-top: 30px;
              padding: 15px;
              background-color: #f1f5f9;
              border-radius: 8px;
              text-align: center;
              color: #64748b;
              font-size: 14px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="date">${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</div>
            <h1 class="title">${allValue.title || "Journal Entry"}</h1>
          </div>
          <div class="content-section">
            <h2 class="section-title">Your Thoughts</h2>
            <div class="journal-text">${allValue.journalContent || "No content written yet."}</div>
          </div>
          ${
            allValue.images.length > 0
              ? `
            <div class="images-section">
              <h2 class="section-title">Memories (${allValue.images.length} image${
                  allValue.images.length > 1 ? "s" : ""
                })</h2>
              ${allValue.images
                .map(
                  (image) => `
                <div class="image-item">
                  <img src="${image.src}" alt="${image.name}" />
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          <div class="stats">
            ${allValue.journalContent.length} characters • ${
      allValue.journalContent.split(" ").filter((word) => word.length > 0).length
    } words
            ${
              allValue.images.length > 0
                ? ` • ${allValue.images.length} image${
                    allValue.images.length > 1 ? "s" : ""
                  }`
                : ""
            }
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  // Save as JSON
  const saveAsJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(allValue, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `${allValue.title || "journal"}.json`
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

//delete funciton
const handleDelete = async () => {
  try {
    const response = await axios.delete('/api/users/deleteRecord', {
      params: {
        title:title,
        userId:id,
      },
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Failed to delete journal entry");
    console.error(error);
  }
};

//update function

const handleUpdate = async () => {
  try {
    const res = await axios.put('/api/users/updateContent', {
      id: allValue.userId,
      title: allValue.title,
      content: allValue.journalContent,
      fontSize: allValue.fontSize,
      fontFamily: allValue.fontFamily,
      backgroundColor: allValue.textareaColor,
      imageUrls: allValue.images,
    });

    if (res.data.ok) {
      console.log("Update successful", res.data.data);
      toast.success("Journal entry updated!");
    } else {
      toast.error("Update failed.");
    }

  } catch (error) {
    console.error("Update error:", error);
    toast.error("Something went wrong during update.");
  }
};


  // Save to server
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...allValue,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Document created successfully:", result);
        alert("Document created successfully!");
      } else {
        console.error("Failed to create document");
        alert("Failed to create document");
      }
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Error creating document");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Auro Word</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    placeholder="Enter journal title..."
                    value={allValue.title}
                    onChange={(e) => updateState("title", e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white placeholder-purple-200 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
                <p className="text-xs text-purple-200">Journal Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  updateState("showSettings", !allValue.showSettings)
                }
                className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Panel */}
          {allValue.showSettings && (
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Customization
                </h3>
                {/* Image Position */}
                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-3">
                    Image Position
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateState("imagePosition", "left")}
                      className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                        allValue.imagePosition === "left"
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 text-purple-200 hover:bg-white/10"
                      }`}
                    >
                      <AlignLeft className="w-4 h-4 mr-1" />
                      Left
                    </button>
                    <button
                      onClick={() => updateState("imagePosition", "right")}
                      className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                        allValue.imagePosition === "right"
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 text-purple-200 hover:bg-white/10"
                      }`}
                    >
                      <AlignRight className="w-4 h-4 mr-1" />
                      Right
                    </button>
                  </div>
                </div>
                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-3">
                    <Palette className="w-4 h-4 inline mr-1" />
                    Background Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() =>
                          updateState("textareaColor", color.value)
                        }
                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                          allValue.textareaColor === color.value
                            ? "border-white scale-110"
                            : "border-white/30 hover:border-white/60"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-3">
                    <Type className="w-4 h-4 inline mr-1" />
                    Font Family
                  </label>
                  <select
                    value={allValue.fontFamily}
                    onChange={(e) =>
                      updateState("fontFamily", e.target.value)
                    }
                    className="w-full p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {fonts.map((font) => (
                      <option
                        key={font}
                        value={font}
                        style={{
                          fontFamily: font,
                          backgroundColor: "#1e1b4b",
                          color: "white",
                        }}
                      >
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-3">
                    Font Size
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={24}
                    value={allValue.fontSize}
                    onChange={(e) =>
                      updateState("fontSize", Number(e.target.value))
                    }
                    className="w-full accent-purple-500"
                  />
                  <div className="text-center text-purple-200 text-sm mt-1">
                    {allValue.fontSize}px
                  </div>
                </div>
                {/* Actions */}
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Add Images
                  </button>
                  <button
                    onClick={generatePDF}
                    className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 mb-3"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                  </button>
                  <button
                    onClick={saveAsJSON}
                    className="w-full flex items-center justify-center p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export as JSON
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Main Content Area */}
          <div
            className={`${
              allValue.showSettings ? "lg:col-span-3" : "lg:col-span-4"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {allValue.title || "Today's Journal"}
                </h2>
                <div className="text-purple-200 text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <textarea
                style={{
                  backgroundColor: allValue.textareaColor,
                  fontFamily: allValue.fontFamily,
                  fontSize: allValue.fontSize,
                  color: "white",
                  minHeight: "200px",
                  width: "100%",
                  borderRadius: "8px",
                  padding: "16px",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  marginBottom: "24px",
                }}
                placeholder="Start writing your journal..."
                value={allValue.journalContent}
                onChange={(e) =>
                  updateState("journalContent", e.target.value)
                }
              />
              {/* Display uploaded images with remove option */}
              {allValue.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Memories
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {allValue.images.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.src}
                          alt={image.name}
                          className="max-h-32 rounded-lg shadow-lg"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {update?
                    <div className="mt-8 flex justify-end">
                <button
                  onClick={ handleDelete}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                 Delete Entry
                </button>
                <button
                  onClick={ handleUpdate}
                  className="flex ml-2 items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                 Update
                </button>
              </div>:

                    <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCreate }
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                 Create Document
                </button>
                <button
                  onClick={generatePDF}
                  className="flex ml-2 items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                 generatePDF
                </button>
              </div>}
            </div>
          </div>
        </div>
      </div>
       <Toaster position="top-center"/>
    </div>
  );
}
