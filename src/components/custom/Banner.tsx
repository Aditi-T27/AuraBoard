// import React from 'react';
// import { PenTool, BookOpen, Sparkles, Heart, Star, Zap } from 'lucide-react';
// import Features  from "@/components/custom/Feature"
// export default function JournalBanner() {
//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         {/* Floating Shapes */}
//         <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-lg animate-bounce"></div>
//         <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400/25 to-orange-400/25 rounded-full blur-lg animate-bounce delay-500"></div>
        
//         {/* Sparkle Effects */}
//         <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
//           <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
//         </div>
//         <div className="absolute bottom-1/3 right-1/4">
//           <Star className="w-6 h-6 text-pink-300 animate-pulse" />
//         </div>
//         <div className="absolute top-1/2 left-1/4">
//           <Zap className="w-7 h-7 text-blue-300 animate-bounce" />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
//         <div className="max-w-4xl mx-auto text-center space-y-8">
          
//           {/* Main Title */}
//           <div className="space-y-4">
//             <h1 className="text-6xl md:text-8xl font-black tracking-wider text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text drop-shadow-2xl animate-pulse font-mono">
//               ✨ AuraWord
//             </h1>
//             <div className="flex items-center justify-center gap-4 animate-bounce">
//               <PenTool className="w-12 h-12 text-yellow-400 animate-spin" />
//               <BookOpen className="w-12 h-12 text-pink-400 animate-pulse" />
//               <Heart className="w-12 h-12 text-purple-400 animate-bounce" />
//             </div>
//           </div>

//           {/* Subtitle */}
//           <h2 className="text-2xl md:text-4xl font-bold text-white font-serif tracking-wide drop-shadow-lg animate-pulse delay-500">
//             Your Personal Digital Journal Companion
//           </h2>

//           {/* Description */}
//           <div className="max-w-3xl mx-auto space-y-6">
//             <p className="text-lg md:text-xl text-purple-100 font-medium leading-relaxed font-serif">
//               Transform your thoughts, dreams, and memories into beautiful digital journals. 
//               AuraWord brings together the art of storytelling with modern technology to create 
//               a sanctuary for your most precious moments.
//             </p>
            
//             <div className="grid md:grid-cols-3 gap-6 mt-12">
//               {/* Feature Cards */}
//               <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
//                 <div className="text-center space-y-3">
//                   <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-spin transition-all duration-300">
//                     <PenTool className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-black text-white font-mono">Create</h3>
//                   <p className="text-purple-200 font-serif text-sm">Express yourself with rich formatting and beautiful layouts</p>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
//                 <div className="text-center space-y-3">
//                   <div className="bg-gradient-to-br from-pink-400 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-bounce transition-all duration-300">
//                     <BookOpen className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-black text-white font-mono">Organize</h3>
//                   <p className="text-purple-200 font-serif text-sm">Keep your memories organized with intuitive categorization</p>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-pink-600/30 to-yellow-600/30 backdrop-blur-md rounded-2xl p-6 border border-pink-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
//                 <div className="text-center space-y-3">
//                   <div className="bg-gradient-to-br from-blue-400 to-indigo-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-pulse transition-all duration-300">
//                     <Heart className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-black text-white font-mono">Cherish</h3>
//                   <p className="text-purple-200 font-serif text-sm">Relive your favorite moments with our beautiful memory keeper</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="pt-8 space-y-6">
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-black px-8 py-4 rounded-2xl text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 font-mono tracking-wide">
//                 🚀 Start Your Journey
//               </button>
//               <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-8 py-4 rounded-2xl text-lg hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-2xl hover:shadow-purple-400/50 font-mono tracking-wide border-2 border-purple-400/50">
//                 📖 Explore Features
//               </button>
//             </div>
            
//             <p className="text-purple-300 font-serif text-sm animate-pulse">
//               ✨ Join thousands of writers who trust AuraWord with their stories
//             </p>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//             <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-gradient-to-b from-purple-300 to-transparent rounded-full mt-2 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"
type CustomeNavProps={
  username:string|null;
}
import React, { useState } from 'react';
import { PenTool, BookOpen, Sparkles, Heart, Star, Zap } from 'lucide-react';
import Features  from "@/components/custom/Feature"
import Link from "next/link"

export default function JournalBanner({username}:CustomeNavProps) {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
     <>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 overflow-hidden pt-20 md:pt-24 z-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400/25 to-orange-400/25 rounded-full blur-lg animate-bounce delay-500"></div>
        
        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
          <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <Star className="w-6 h-6 text-pink-300 animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <Zap className="w-7 h-7 text-blue-300 animate-bounce" />
        </div>
      </div>

      {/* Main Content */}
     <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-16">

        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-wider text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text drop-shadow-2xl animate-pulse font-mono">
              ✨ AuraWord
            </h1>
            <div className="flex items-center justify-center gap-4 animate-bounce">
              <PenTool className="w-12 h-12 text-yellow-400 animate-spin" />
              <BookOpen className="w-12 h-12 text-pink-400 animate-pulse" />
              <Heart className="w-12 h-12 text-purple-400 animate-bounce" />
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl font-bold text-white font-serif tracking-wide drop-shadow-lg animate-pulse delay-500">
            Your Personal Digital Journal Companion
          </h2>

          {/* Description */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-purple-100 font-medium leading-relaxed font-serif">
              Transform your thoughts, dreams, and memories into beautiful digital journals. 
              AuraWord brings together the art of storytelling with modern technology to create 
              a sanctuary for your most precious moments.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* Feature Cards */}
              <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-spin transition-all duration-300">
                    <PenTool className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white font-mono">Create</h3>
                  <p className="text-purple-200 font-serif text-sm">Express yourself with rich formatting and beautiful layouts</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-br from-pink-400 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-bounce transition-all duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white font-mono">Organize</h3>
                  <p className="text-purple-200 font-serif text-sm">Keep your memories organized with intuitive categorization</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-600/30 to-yellow-600/30 backdrop-blur-md rounded-2xl p-6 border border-pink-400/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:animate-pulse transition-all duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white font-mono">Cherish</h3>
                  <p className="text-purple-200 font-serif text-sm">Relive your favorite moments with our beautiful memory keeper</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-black px-8 py-4 rounded-2xl text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 font-mono tracking-wide">
              {username?(<Link href="/dashboard"> New Journal</Link>):(
             <Link href="/signup"> 🚀 Start Your Journey</Link>)}
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-8 py-4 rounded-2xl text-lg hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-2xl hover:shadow-purple-400/50 font-mono tracking-wide border-2 border-purple-400/50"
                onClick={() => setIsFeaturesOpen(true)}>
                📖 Explore Features
              </button>
            </div>
            
            <p className="text-purple-300 font-serif text-sm animate-pulse">
              ✨ Join thousands of writers who trust AuraWord with their stories
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-purple-300 to-transparent rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Modal */}
      <Features 
        isOpen={isFeaturesOpen} 
        onClose={() => setIsFeaturesOpen(false)} 
      />
      </div>
    </>
  );
}