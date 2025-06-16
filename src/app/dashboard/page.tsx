

"use client";

import React, { useState, useRef, ChangeEvent } from "react";
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

// Types
type ImageItem = {
  id: string;
  src: string;
  name: string;
};

type AllValue = {
  title: string;
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
  const [allValue, setAllValue] = useState<AllValue>({
    title: "",
    journalContent: "",
    images: [],
    previewImages: [], // base64 previews before upload
    imagePosition: "right",
    textareaColor: "#1e1b4b",
    fontFamily: "Inter",
    fontSize: 16,
    showSettings: false,
  });

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
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCreate}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// "use client"

// import React, { useState, useRef } from 'react';
// import { Camera, Download, Type, Palette, AlignLeft, AlignRight, Save, Plus, Settings, User, LogOut, FileText } from 'lucide-react';
// import axios from "axios"

// export default function Dashboard() {
//   // Consolidated state management

 

// const [allValue, setAllValue] = useState({
//   title: '',
//   journalContent: '',
//   images: [],
//   imagePosition: 'right',
//   textareaColor: '#1e1b4b',
//   fontFamily: 'Inter',
//   fontSize: '16',
//   showSettings: false,
// });
//   const fileInputRef = useRef(null);

//   const colors = [
//     { name: 'Deep Purple', value: '#1e1b4b' },
//     { name: 'Royal Blue', value: '#1e3a8a' },
//     { name: 'Emerald', value: '#064e3b' },
//     { name: 'Rose', value: '#881337' },
//     { name: 'Amber', value: '#92400e' },
//     { name: 'Slate', value: '#0f172a' },
//     { name: 'Indigo', value: '#312e81' },
//     { name: 'Teal', value: '#134e4a' }
//   ];

//   const fonts = [
//     'Inter', 'Georgia', 'Times New Roman', 'Arial', 'Helvetica', 
//     'Courier New', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'
//   ];

//   const updateState = (key, value) => {
//     setAllValue(prev => ({ ...prev, [key]: value }));
//   };





// const handleImageUpload = async (e) => {
//   const files = Array.from(e.target.files || []);
//   const urls = [];

//   for (const file of files) {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post('/api/users/uploadImage', formData); // No need for method override
//       const data = res.data; // axios auto-parses JSON

//       if (data.url) {
//         urls.push(data.url);
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   }

//   setAllValue((prev) => ({
//     ...prev,
//     images: [...prev.images, ...urls],
//   }));
// };


//   const removeImage = (id) => {
//     setAllValue(prev => ({
//       ...prev,
//       images: prev.images.filter(img => img.id !== id)
//     }));
//   };

//   const generatePDF = () => {
//     const printWindow = window.open('', '_blank');
    
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>${allValue.title || 'Journal Entry'} - ${new Date().toLocaleDateString()}</title>
//           <style>
//             body {
//               font-family: ${allValue.fontFamily}, sans-serif;
//               font-size: ${allValue.fontSize}px;
//               line-height: 1.6;
//               margin: 20px;
//               color: #333;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;
//               border-bottom: 2px solid #8b5cf6;
//               padding-bottom: 20px;
//             }
//             .date {
//               color: #8b5cf6;
//               font-size: 14px;
//               margin-bottom: 10px;
//             }
//             .title {
//               font-size: 24px;
//               font-weight: bold;
//               margin: 0;
//             }
//             .content-section {
//               margin: 30px 0;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: bold;
//               color: #8b5cf6;
//               margin-bottom: 15px;
//             }
//             .journal-text {
//               background-color: #f8fafc;
//               padding: 20px;
//               border-radius: 8px;
//               border-left: 4px solid #8b5cf6;
//               white-space: pre-wrap;
//             }
//             .images-section {
//               margin-top: 30px;
//             }
//             .image-item {
//               margin: 20px 0;
//               text-align: center;
//             }
//             .image-item img {
//               max-width: 100%;
//               max-height: 400px;
//               border-radius: 8px;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .stats {
//               margin-top: 30px;
//               padding: 15px;
//               background-color: #f1f5f9;
//               border-radius: 8px;
//               text-align: center;
//               color: #64748b;
//               font-size: 14px;
//             }
//             @media print {
//               body { margin: 0; }
//               .no-print { display: none; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div class="date">${new Date().toLocaleDateString('en-US', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}</div>
//             <h1 class="title">${allValue.title || 'Journal Entry'}</h1>
//           </div>
          
//           <div class="content-section">
//             <h2 class="section-title">Your Thoughts</h2>
//             <div class="journal-text">${allValue.journalContent || 'No content written yet.'}</div>
//           </div>
          
//           ${allValue.images.length > 0 ? `
//             <div class="images-section">
//               <h2 class="section-title">Memories (${allValue.images.length} image${allValue.images.length > 1 ? 's' : ''})</h2>
//               ${allValue.images.map(image => `
//                 <div class="image-item">
//                   <img src="${image.src}" alt="${image.name}" />
//                 </div>
//               `).join('')}
//             </div>
//           ` : ''}
          
//           <div class="stats">
//             ${allValue.journalContent.length} characters • ${allValue.journalContent.split(' ').filter(word => word.length > 0).length} words
//             ${allValue.images.length > 0 ? ` • ${allValue.images.length} image${allValue.images.length > 1 ? 's' : ''}` : ''}
//           </div>
//         </body>
//       </html>
//     `;
    
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
    
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 1000);
//   };

//   const handleCreate = async () => {
//     try {
//       // Since we can't use axios in artifacts, we'll use fetch
//       const response = await fetch("/api/users/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...allValue,
//           timestamp: new Date().toISOString()
//         })
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         console.log("Document created successfully:", result);
//         alert("Document created successfully!");
//       } else {
//         console.error("Failed to create document");
//         alert("Failed to create document");
//       }
//     } catch (error) {
//       console.error("Error creating document:", error);
//       alert("Error creating document");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
//       {/* Header */}
//       <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">Auro Word</h1>
//                 <div className="flex items-center space-x-2 mt-1">
//                   <input 
//                     type="text" 
//                     placeholder="Enter journal title..." 
//                     value={allValue.title} 
//                     onChange={(e) => updateState('title', e.target.value)}
//                     className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white placeholder-purple-200 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
//                   />
//                 </div>
//                 <p className="text-xs text-purple-200">Journal Dashboard</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => updateState('showSettings', !allValue.showSettings)}
//                 className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
//               >
//                 <Settings className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
//                 <User className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Settings Panel */}
//           {allValue.showSettings && (
//             <div className="lg:col-span-1">
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-6">
//                 <h3 className="text-lg font-semibold text-white mb-4">Customization</h3>
                
//                 {/* Image Position */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">Image Position</label>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => updateState('imagePosition', 'left')}
//                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
//                         allValue.imagePosition === 'left' 
//                           ? 'bg-purple-500 text-white' 
//                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
//                       }`}
//                     >
//                       <AlignLeft className="w-4 h-4 mr-1" />
//                       Left
//                     </button>
//                     <button
//                       onClick={() => updateState('imagePosition', 'right')}
//                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
//                         allValue.imagePosition === 'right' 
//                           ? 'bg-purple-500 text-white' 
//                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
//                       }`}
//                     >
//                       <AlignRight className="w-4 h-4 mr-1" />
//                       Right
//                     </button>
//                   </div>
//                 </div>

//                 {/* Background Color */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">
//                     <Palette className="w-4 h-4 inline mr-1" />
//                     Background Color
//                   </label>
//                   <div className="grid grid-cols-4 gap-2">
//                     {colors.map((color) => (
//                       <button
//                         key={color.value}
//                         onClick={() => updateState('textareaColor', color.value)}
//                         className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
//                           allValue.textareaColor === color.value 
//                             ? 'border-white scale-110' 
//                             : 'border-white/30 hover:border-white/60'
//                         }`}
//                         style={{ backgroundColor: color.value }}
//                         title={color.name}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Font Family */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">
//                     <Type className="w-4 h-4 inline mr-1" />
//                     Font Family
//                   </label>
//                   <select
//                     value={allValue.fontFamily}
//                     onChange={(e) => updateState('fontFamily', e.target.value)}
//                     className="w-full p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
//                   >
//                     {fonts.map(font => (
//                       <option key={font} value={font} style={{ fontFamily: font, backgroundColor: '#1e1b4b', color: 'white' }}>
//                         {font}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Font Size */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">Font Size</label>
//                   <input
//                     type="range"
//                     min="12"
//                     max="24"
//                     value={allValue.fontSize}
//                     onChange={(e) => updateState('fontSize', e.target.value)}
//                     className="w-full accent-purple-500"
//                   />
//                   <div className="text-center text-purple-200 text-sm mt-1">{allValue.fontSize}px</div>
//                 </div>

//                 {/* Actions */}
//                 <div className="space-y-3">
//                   <input
//   type="file"
//   accept="image/*"
//   multiple
//   ref={fileInputRef}
//   className="hidden"
//   onChange={handleImageUpload}
// />

// <button
//   onClick={() => fileInputRef.current?.click()}
//   className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
// >
//   <Camera className="w-4 h-4 mr-2" />
//   Add Images
// </button>


                  
//                   <button
//                     onClick={generatePDF}
//                     className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 mb-3"
//                   >
//                     <FileText className="w-4 h-4 mr-2" />
//                     Export as PDF
//                   </button>
                  
//                   <button
//                     onClick={saveAsJSON}
//                     className="w-full flex items-center justify-center p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Export as JSON
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Main Content Area */}
//           <div className={`${allValue.showSettings ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
//             <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">
//                   {allValue.title || "Today's Journal"}
//                 </h2>
//                 <div className="text-purple-200 text-sm">
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//               </div>

//               {/* Journal Layout */}
//               <div className={`flex ${allValue.imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
//                 {/* Images Section */}
//                 {allValue.images.length > 0 && (
//                   <div className="w-1/3 space-y-4">
//                     <h3 className="text-lg font-medium text-white mb-4">Memories</h3>
//                     {allValue.images.map((image) => (
//                       <div key={image.id} className="relative group">
//                         <img
//                           src={image.src}
//                           alt={image.name}
//                           className="w-full h-48 object-cover rounded-xl border border-white/20"
//                         />
//                         <button
//                           onClick={() => removeImage(image.id)}
//                           className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Text Content */}
//                 <div className={`${allValue.images.length > 0 ? 'w-2/3' : 'w-full'} space-y-4`}>
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-medium text-white">Your Thoughts</h3>
//                     {!allValue.showSettings && (
//                       <button
//                         onClick={() => updateState('showSettings', true)}
//                         className="text-purple-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
//                       >
//                         <Settings className="w-5 h-5" />
//                       </button>
//                     )}
//                   </div>
                  
//                   <textarea
//                     value={allValue.journalContent} 
//                     onChange={(e) => updateState('journalContent', e.target.value)}
//                     placeholder="What's on your mind today? Share your thoughts, feelings, and experiences..."
//                     className="w-full h-96 p-6 rounded-xl border border-white/20 text-white placeholder-purple-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
//                     style={{
//                       backgroundColor: allValue.textareaColor,
//                       fontFamily: allValue.fontFamily,
//                       fontSize: `${allValue.fontSize}px`,
//                       lineHeight: '1.6'
//                     }}
//                   />
                  
//                   <div className="flex justify-between items-center text-purple-200 text-sm">
//                     <span>{allValue.journalContent.length} characters</span>
//                     <span>{allValue.journalContent.split(' ').filter(word => word.length > 0).length} words</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="flex justify-center mt-8 space-x-4">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Image
//                 </button>
                
//                 <button
//                   onClick={generatePDF}
//                   className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
//                 >
//                   <FileText className="w-4 h-4 mr-2" />
//                   Export PDF
//                 </button>
                
//                 <button
//                   onClick={handleCreate}
//                   className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   Create Document
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hidden File Input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleImageUpload}
//         className="hidden"
//       />
//     </div>
//   );
// }






// // "use client"
// // import React, { useState, useRef } from 'react';
// // import { Camera, Download, Type, Palette, AlignLeft, AlignRight, Save, Plus, Settings, User, LogOut } from 'lucide-react';
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// // export default function Dashboard() {
// //   const [journalContent, setJournalContent] = useState('');
// //   const [images, setImages] = useState([]);
// //   const [imagePosition, setImagePosition] = useState('right'); // 'left' or 'right'
// //   const [textareaColor, setTextareaColor] = useState('#1e1b4b'); // Default purple
// //   const [fontFamily, setFontFamily] = useState('Inter');
// //   const [fontSize, setFontSize] = useState('16');
// //   const [showSettings, setShowSettings] = useState(false);
// //   const fileInputRef = useRef(null);
// //   const journalRef = useRef(null);


// //   const colors = [
// //     { name: 'Deep Purple', value: '#1e1b4b' },
// //     { name: 'Royal Blue', value: '#1e3a8a' },
// //     { name: 'Emerald', value: '#064e3b' },
// //     { name: 'Rose', value: '#881337' },
// //     { name: 'Amber', value: '#92400e' },
// //     { name: 'Slate', value: '#0f172a' },
// //     { name: 'Indigo', value: '#312e81' },
// //     { name: 'Teal', value: '#134e4a' }
// //   ];

// //   const fonts = [
// //     'Inter', 'Georgia', 'Times New Roman', 'Arial', 'Helvetica', 
// //     'Courier New', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'
// //   ];

// //   const handleImageUpload = (event) => {
// //     const files = Array.from(event.target.files);
// //     files.forEach(file => {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImages(prev => [...prev, {
// //           id: Date.now() + Math.random(),
// //           src: e.target.result,
// //           name: file.name
// //         }]);
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //   };

// //    const exportToPDF = async () => {
// //   if (!journalRef.current) return;

// //   const canvas = await html2canvas(journalRef.current, {
// //     scale: 2,
// //     useCORS: true,
// //   });

// //   const imgData = canvas.toDataURL('image/png');
// //   const pdf = new jsPDF('p', 'mm', 'a4');
// //   const pdfWidth = pdf.internal.pageSize.getWidth();
// //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

// //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //   pdf.save(`journal-${Date.now()}.pdf`);
// // };

// //   const removeImage = (id) => {
// //     setImages(prev => prev.filter(img => img.id !== id));
// //   };

// //   const saveAsJSON = () => {
// //     const journalData = {
// //       content: journalContent,
// //       images: images,
// //       imagePosition,
// //       styling: {
// //         backgroundColor: textareaColor,
// //         fontFamily,
// //         fontSize
// //       },
// //       timestamp: new Date().toISOString(),
// //       title: `Journal Entry - ${new Date().toLocaleDateString()}`
// //     };
    
// //     const dataStr = JSON.stringify(journalData, null, 2);
// //     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
// //     const exportFileDefaultName = `journal-${Date.now()}.json`;
    
// //     const linkElement = document.createElement('a');
// //     linkElement.setAttribute('href', dataUri);
// //     linkElement.setAttribute('download', exportFileDefaultName);
// //     linkElement.click();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
// //       {/* Header */}
// //       <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center py-4">
// //             <div className="flex items-center space-x-3">
// //               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
// //                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-bold text-white">Auro Word</h1>
// //                 <p className="text-xs text-purple-200">Journal Dashboard</p>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={() => setShowSettings(!showSettings)}
// //                 className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
// //               >
// //                 <Settings className="w-5 h-5" />
// //               </button>
// //               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
// //                 <User className="w-5 h-5" />
// //               </button>
// //               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
// //                 <LogOut className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //           {/* Settings Panel */}
// //           {showSettings && (
// //             <div className="lg:col-span-1">
// //               <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-6">
// //                 <h3 className="text-lg font-semibold text-white mb-4">Customization</h3>
                
// //                 {/* Image Position */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-purple-100 mb-3">Image Position</label>
// //                   <div className="flex space-x-2">
// //                     <button
// //                       onClick={() => setImagePosition('left')}
// //                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
// //                         imagePosition === 'left' 
// //                           ? 'bg-purple-500 text-white' 
// //                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
// //                       }`}
// //                     >
// //                       <AlignLeft className="w-4 h-4 mr-1" />
// //                       Left
// //                     </button>
// //                     <button
// //                       onClick={() => setImagePosition('right')}
// //                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
// //                         imagePosition === 'right' 
// //                           ? 'bg-purple-500 text-white' 
// //                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
// //                       }`}
// //                     >
// //                       <AlignRight className="w-4 h-4 mr-1" />
// //                       Right
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Background Color */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-purple-100 mb-3">
// //                     <Palette className="w-4 h-4 inline mr-1" />
// //                     Background Color
// //                   </label>
// //                   <div className="grid grid-cols-4 gap-2">
// //                     {colors.map((color) => (
// //                       <button
// //                         key={color.value}
// //                         onClick={() => setTextareaColor(color.value)}
// //                         className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
// //                           textareaColor === color.value 
// //                             ? 'border-white scale-110' 
// //                             : 'border-white/30 hover:border-white/60'
// //                         }`}
// //                         style={{ backgroundColor: color.value }}
// //                         title={color.name}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Font Family */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-purple-100 mb-3">
// //                     <Type className="w-4 h-4 inline mr-1" />
// //                     Font Family
// //                   </label>
// //                   <select
// //                     value={fontFamily}
// //                     onChange={(e) => setFontFamily(e.target.value)}
// //                     className="w-full p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
// //                   >
// //                     {fonts.map(font => (
// //                       <option key={font} value={font} style={{ fontFamily: font, backgroundColor: '#1e1b4b', color: 'white' }}>
// //                         {font}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 {/* Font Size */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-purple-100 mb-3">Font Size</label>
// //                   <input
// //                     type="range"
// //                     min="12"
// //                     max="24"
// //                     value={fontSize}
// //                     onChange={(e) => setFontSize(e.target.value)}
// //                     className="w-full accent-purple-500"
// //                   />
// //                   <div className="text-center text-purple-200 text-sm mt-1">{fontSize}px</div>
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="space-y-3">
// //                   <button
// //                     onClick={() => fileInputRef.current?.click()}
// //                     className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
// //                   >
// //                     <Camera className="w-4 h-4 mr-2" />
// //                     Add Images
// //                   </button>
                  
// //                   <button
// //                     onClick={saveAsJSON}
// //                     className="w-full flex items-center justify-center p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
// //                   >
// //                     <Download className="w-4 h-4 mr-2" />
// //                     Export Journal
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Main Content Area */}
// //           <div className={`${showSettings ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
// //             <div className="  ref={journalRef}bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-2xl font-bold text-white">Today's Journal</h2>
// //                 <div className="text-purple-200 text-sm">
// //                   {new Date().toLocaleDateString('en-US', { 
// //                     weekday: 'long', 
// //                     year: 'numeric', 
// //                     month: 'long', 
// //                     day: 'numeric' 
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Journal Layout */}
// //               <div className={`flex ${imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
// //                 {/* Images Section */}
// //                 {images.length > 0 && (
// //                   <div className="w-1/3 space-y-4">
// //                     <h3 className="text-lg font-medium text-white mb-4">Memories</h3>
// //                     {images.map((image) => (
// //                       <div key={image.id} className="relative group">
// //                         <img
// //                           src={image.src}
// //                           alt={image.name}
// //                           className="w-full h-48 object-cover rounded-xl border border-white/20"
// //                         />
// //                         <button
// //                           onClick={() => removeImage(image.id)}
// //                           className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
// //                         >
// //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                           </svg>
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {/* Text Content */}
// //                 <div className={`${images.length > 0 ? 'w-2/3' : 'w-full'} space-y-4`}>
// //                   <div className="flex justify-between items-center">
// //                     <h3 className="text-lg font-medium text-white">Your Thoughts</h3>
// //                     {!showSettings && (
// //                       <button
// //                         onClick={() => setShowSettings(true)}
// //                         className="text-purple-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
// //                       >
// //                         <Settings className="w-5 h-5" />
// //                       </button>
// //                     )}
// //                   </div>
                  
// //                   <textarea
// //                     value={journalContent}
// //                     onChange={(e) => setJournalContent(e.target.value)}
// //                     placeholder="What's on your mind today? Share your thoughts, feelings, and experiences..."
// //                     className="w-full h-96 p-6 rounded-xl border border-white/20 text-white placeholder-purple-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
// //                     style={{
// //                       backgroundColor: textareaColor,
// //                       fontFamily: fontFamily,
// //                       fontSize: `${fontSize}px`,
// //                       lineHeight: '1.6'
// //                     }}
// //                   />
                  
// //                   <div className="flex justify-between items-center text-purple-200 text-sm">
// //                     <span>{journalContent.length} characters</span>
// //                     <span>{journalContent.split(' ').filter(word => word.length > 0).length} words</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Quick Actions */}
// //               <div className="flex justify-center mt-8 space-x-4">
// //                 <button
// //                   onClick={() => fileInputRef.current?.click()}
// //                   className="flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
// //                 >
// //                   <Plus className="w-4 h-4 mr-2" />
// //                   Add Image
// //                 </button>
                
// //                 <button
// //                   onClick={saveAsJSON}
// //                   className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
// //                 >
// //                   <Save className="w-4 h-4 mr-2" />
// //                   Save Entry
// //                 </button>
// //                 <button
// //   onClick={exportToPDF}
// //   className="flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
// // >
// //   <Download className="w-4 h-4 mr-2" />
// //   Export as PDF
// // </button>

// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Hidden File Input */}
// //       <input
// //         ref={fileInputRef}
// //         type="file"
// //         accept="image/*"
// //         multiple
// //         onChange={handleImageUpload}
// //         className="hidden"
// //       />
// //     </div>
// //   );
// // }

// "use client"

// import React, { useState, useRef } from 'react';
// import { Camera, Download, Type, Palette, AlignLeft, AlignRight, Save, Plus, Settings, User, LogOut, FileText } from 'lucide-react';
// import axios from "axios"
// export default function Dashboard() {



//   const [allValue,setAllValue]=React.useState({
//     title:"",
//     journalContent:journalContent,
//     images:images,
//     textareaColor:textareaColor,
//     fontFamily:fontFamily,
//     fontSize:fontSize,
//     })

//   const colors = [
//     { name: 'Deep Purple', value: '#1e1b4b' },
//     { name: 'Royal Blue', value: '#1e3a8a' },
//     { name: 'Emerald', value: '#064e3b' },
//     { name: 'Rose', value: '#881337' },
//     { name: 'Amber', value: '#92400e' },
//     { name: 'Slate', value: '#0f172a' },
//     { name: 'Indigo', value: '#312e81' },
//     { name: 'Teal', value: '#134e4a' }
//   ];

//   const fonts = [
//     'Inter', 'Georgia', 'Times New Roman', 'Arial', 'Helvetica', 
//     'Courier New', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'
//   ];

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImages(prev => [...prev, {
//           id: Date.now() + Math.random(),
//           src: e.target.result,
//           name: file.name
//         }]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (id) => {
//     setImages(prev => prev.filter(img => img.id !== id));
//   };
// const generatePDF = () => {
//     // Create a new window for PDF generation
//     const printWindow = window.open('', '_blank');
    
//     // Generate HTML content for PDF
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Journal Entry - ${new Date().toLocaleDateString()}</title>
//           <style>
//             body {
//               font-family: ${fontFamily}, sans-serif;
//               font-size: ${fontSize}px;
//               line-height: 1.6;
//               margin: 20px;
//               color: #333;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;
//               border-bottom: 2px solid #8b5cf6;
//               padding-bottom: 20px;
//             }
//             .date {
//               color: #8b5cf6;
//               font-size: 14px;
//               margin-bottom: 10px;
//             }
//             .title {
//               font-size: 24px;
//               font-weight: bold;
//               margin: 0;
//             }
//             .content-section {
//               margin: 30px 0;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: bold;
//               color: #8b5cf6;
//               margin-bottom: 15px;
//             }
//             .journal-text {
//               background-color: #f8fafc;
//                background-color:${textareaColor}
//               padding: 20px;
//               border-radius: 8px;
//               border-left: 4px solid #8b5cf6;
//               white-space: pre-wrap;
//             }
//             .images-section {
//               margin-top: 30px;
//             }
//             .image-item {
//               margin: 20px 0;
//               text-align: center;
//             }
//             .image-item img {
//               max-width: 100%;
//               max-height: 400px;
//               border-radius: 8px;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .stats {
//               margin-top: 30px;
//               padding: 15px;
//               background-color: #f1f5f9;
//               border-radius: 8px;
//               text-align: center;
//               color: #64748b;
//               font-size: 14px;
              
//             }
//             @media print {
//               body { margin: 0; }
//               .no-print { display: none; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div class="date">${new Date().toLocaleDateString('en-US', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}</div>
//             <h1 class="title">Journal Entry</h1>
//           </div>
          
//           <div class="content-section">
//             <h2 class="section-title">Your Thoughts</h2>
//             <div class="journal-text">${journalContent || 'No content written yet.'}</div>
//           </div>
          
//           ${images.length > 0 ? `
//             <div class="images-section">
//               <h2 class="section-title">Memories (${images.length} image${images.length > 1 ? 's' : ''})</h2>
//               ${images.map(image => `
//                 <div class="image-item">
//                   <img src="${image.src}" alt="${image.name}" />
//                 </div>
//               `).join('')}
//             </div>
//           ` : ''}
          
//           <div class="stats">
//             ${journalContent.length} characters • ${journalContent.split(' ').filter(word => word.length > 0).length} words
//             ${images.length > 0 ? ` • ${images.length} image${images.length > 1 ? 's' : ''}` : ''}
//           </div>
//         </body>
//       </html>
//     `;
    
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
    
//     // Wait for images to load, then print
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 1000);}
  
// const handleCreate =async()=>{
//     const response= axios.post("/api/users/create",allValue);

//     console.log(response);
// }


 

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">

//       {/* Header */}
//       <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">Auro Word</h1>
//                 <h1>Enter Title</h1>
//                 <input type="text" placeholder="title" value={allValue.title} 
//                 onChange={(e) => setAllValue({ ...allValue, title: e.target.value })}
//                 />
//                 <p className="text-xs text-purple-200">Journal Dashboard</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowSettings(!showSettings)}
//                 className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
//               >
//                 <Settings className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
//                 <User className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Settings Panel */}
//           {showSettings && (
//             <div className="lg:col-span-1">
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-6">
//                 <h3 className="text-lg font-semibold text-white mb-4">Customization</h3>
                
//                 {/* Image Position */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">Image Position</label>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setImagePosition('left')}
//                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
//                         imagePosition === 'left' 
//                           ? 'bg-purple-500 text-white' 
//                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
//                       }`}
//                     >
//                       <AlignLeft className="w-4 h-4 mr-1" />
//                       Left
//                     </button>
//                     <button
//                       onClick={() => setImagePosition('right')}
//                       className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
//                         imagePosition === 'right' 
//                           ? 'bg-purple-500 text-white' 
//                           : 'bg-white/5 text-purple-200 hover:bg-white/10'
//                       }`}
//                     >
//                       <AlignRight className="w-4 h-4 mr-1" />
//                       Right
//                     </button>
//                   </div>
//                 </div>

//                 {/* Background Color */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">
//                     <Palette className="w-4 h-4 inline mr-1" />
//                     Background Color
//                   </label>
//                   <div className="grid grid-cols-4 gap-2">
//                     {colors.map((color) => (
//                       <button
//                         key={color.value}
//                         onClick={() => setTextareaColor(color.value)}
//                         className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
//                           textareaColor === color.value 
//                             ? 'border-white scale-110' 
//                             : 'border-white/30 hover:border-white/60'
//                         }`}
//                         style={{ backgroundColor: color.value }}
//                         title={color.name}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Font Family */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">
//                     <Type className="w-4 h-4 inline mr-1" />
//                     Font Family
//                   </label>
//                   <select
//                     value={fontFamily}
//                     onChange={(e) => setFontFamily(e.target.value)}
//                     className="w-full p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
//                   >
//                     {fonts.map(font => (
//                       <option key={font} value={font} style={{ fontFamily: font, backgroundColor: '#1e1b4b', color: 'white' }}>
//                         {font}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Font Size */}
//                 <div>
//                   <label className="block text-sm font-medium text-purple-100 mb-3">Font Size</label>
//                   <input
//                     type="range"
//                     min="12"
//                     max="24"
//                     value={fontSize}
//                     onChange={(e) => setFontSize(e.target.value)}
//                     className="w-full accent-purple-500"
//                   />
//                   <div className="text-center text-purple-200 text-sm mt-1">{fontSize}px</div>
//                 </div>

//                 {/* Actions */}
//                 <div className="space-y-3">
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
//                   >
//                     <Camera className="w-4 h-4 mr-2" />
//                     Add Images
//                   </button>
                  
//                   <button
//                     onClick={generatePDF}
//                     className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 mb-3"
//                   >
//                     <FileText className="w-4 h-4 mr-2" />
//                     Export as PDF
//                   </button>
                  
//                   <button
//                     onClick={saveAsJSON}
//                     className="w-full flex items-center justify-center p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Export as JSON
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Main Content Area */}
//           <div className={`${showSettings ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
//             <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">Today's Journal</h2>
//                 <div className="text-purple-200 text-sm">
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//               </div>

//               {/* Journal Layout */}
//               <div className={`flex ${imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
//                 {/* Images Section */}
//                 {images.length > 0 && (
//                   <div className="w-1/3 space-y-4">
//                     <h3 className="text-lg font-medium text-white mb-4">Memories</h3>
//                     {images.map((image) => (
//                       <div key={image.id} className="relative group">
//                         <img
//                           src={image.src}
//                           alt={image.name}
//                           className="w-full h-48 object-cover rounded-xl border border-white/20"
//                         />
//                         <button
//                           onClick={() => removeImage(image.id)}
//                           className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Text Content */}
//                 <div className={`${images.length > 0 ? 'w-2/3' : 'w-full'} space-y-4`}>
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-medium text-white">Your Thoughts</h3>
//                     {!showSettings && (
//                       <button
//                         onClick={() => setShowSettings(true)}
//                         className="text-purple-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
//                       >
//                         <Settings className="w-5 h-5" />
//                       </button>
//                     )}
//                   </div>
                  
//                   <textarea
//                     value={journalContent} 
//                     onChange={(e) => setJournalContent(e.target.value)}
//                     placeholder="What's on your mind today? Share your thoughts, feelings, and experiences..."
//                     className="w-full h-96 p-6 rounded-xl border border-white/20 text-white placeholder-purple-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
//                     style={{
//                       backgroundColor: textareaColor,
//                       fontFamily: fontFamily,
//                       fontSize: `${fontSize}px`,
//                       lineHeight: '1.6'
//                     }}
//                   />
                  
//                   <div className="flex justify-between items-center text-purple-200 text-sm">
//                     <span>{journalContent.length} characters</span>
//                     <span>{journalContent.split(' ').filter(word => word.length > 0).length} words</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="flex justify-center mt-8 space-x-4">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Image
//                 </button>
                
//                 <button
//                   onClick={generatePDF}
//                   className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
//                 >
//                   <FileText className="w-4 h-4 mr-2" />
//                   Export PDF
//                 </button>
                
//                 <button
//                   onClick={handleCreate}
//                   className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   Create Document
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hidden File Input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleImageUpload}
//         className="hidden"
//       />
//     </div>
//   );
// }

