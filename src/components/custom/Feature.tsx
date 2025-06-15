// Features.tsx
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { X, PenTool, BookOpen, Heart, Sparkles, Palette } from "lucide-react"

interface FeaturesProps {
  isOpen: boolean
  onClose: () => void
}

const features = [
  {
    id: 1,
    title: "✨ Rich Text Editor",
    description: "Create beautiful journals with our advanced text editor featuring formatting, emojis, and styling options.",
    icon: <PenTool className="w-12 h-12 text-yellow-400" />,
    bgGradient: "from-yellow-400 to-orange-500",
    content: "Rich formatting • Font styles • Color themes • Emoji support"
  },
  {
    id: 2,
    title: "📚 Smart Organization",
    description: "Organize your entries with tags, categories, and smart search to find any memory instantly.",
    icon: <BookOpen className="w-12 h-12 text-blue-400" />,
    bgGradient: "from-blue-400 to-purple-500",
    content: "Auto-categorization • Smart tags • Quick search • Date filtering"
  },
  {
    id: 3,
    title: "💖 Memory Keeper",
    description: "Preserve your precious moments with photo attachments, mood tracking, and timeline views.",
    icon: <Heart className="w-12 h-12 text-pink-400" />,
    bgGradient: "from-pink-400 to-red-500",
    content: "Photo galleries • Mood tracking • Timeline view • Memory highlights"
  },
  {
    id: 4,
    title: "🎨 Beautiful Themes",
    description: "Customize your journal experience with stunning themes and personalized layouts.",
    icon: <Palette className="w-12 h-12 text-purple-400" />,
    bgGradient: "from-purple-400 to-indigo-500",
    content: "Custom themes • Layout options • Color schemes • Font selections"
  },
  {
    id: 5,
    title: "✨ AI Insights",
    description: "Get writing prompts, mood insights, and personalized recommendations to enhance your journaling journey.",
    icon: <Sparkles className="w-12 h-12 text-green-400" />,
    bgGradient: "from-green-400 to-teal-500",
    content: "Writing prompts • Mood analysis • Smart suggestions • Progress tracking"
  }
]

export  default function Features({ isOpen, onClose }: FeaturesProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-[101] w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-[102] bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text drop-shadow-2xl font-mono animate-pulse">
            🚀 Explore Features
          </h2>
          <p className="text-white/90 text-lg font-serif mt-2">
            Discover what makes AuraWord special
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {features.map((feature) => (
              <CarouselItem key={feature.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="border-0 bg-transparent overflow-hidden group hover:scale-105 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-6 text-center space-y-4 shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[400px] flex flex-col justify-between backdrop-blur-sm border border-white/20`}>
                        
                        {/* Icon */}
                        <div className="flex justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:animate-bounce transition-all duration-300">
                            {feature.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                          <h3 className="text-2xl font-black text-white font-mono tracking-wide drop-shadow-lg">
                            {feature.title}
                          </h3>
                          
                          <p className="text-white/90 font-serif text-sm leading-relaxed">
                            {feature.description}
                          </p>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mt-4">
                            <p className="text-white/80 font-mono text-xs leading-relaxed">
                              {feature.content}
                            </p>
                          </div>
                        </div>

                        {/* Feature Number */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-white font-black text-sm">
                            {feature.id}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          <CarouselPrevious className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 -left-12" />
          <CarouselNext className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 -right-12" />
        </Carousel>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {features.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}