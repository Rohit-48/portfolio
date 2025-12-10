'use client';

import { GeminiChat } from "../components/GeminiChat";

export default function Contact() {
    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="font-electrolize font-bold text-6xl tracking-tighter border-4 rounded-full px-6 py-2 bg-amber-300 shadow-[2px_4px_0px_0px_black] hover:scale-105 uppercase transition-transform cursor-pointer">
                Contact
            </h1>
            <p className="font-electrolize font-medium text-sm mt-4 opacity-60 text-center selection:bg-yellow-400 selection:text-black">
                Interested in working together or have a question? Let's connect.
            </p>
            <div className="w-160 border-b-4 border-dashed border-yellow-400 mt-6 mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-4">
                {/* Left Column - Info */}
                <div className="bg-amber-50 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] p-6 h-fit">
                    <h2 className="font-electrolize font-bold text-3xl uppercase mb-4 selection:bg-yellow-400 selection:text-black">
                        LET'S TALK
                    </h2>
                    <p className="font-electrolize font-medium text-lg text-gray-700 selection:bg-yellow-400 selection:text-black mb-6">
                        Fill out the form or chat with my AI assistant. I'll get back to you as soon as possible.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-300 border-2 border-black rounded-lg flex items-center justify-center">
                                📧
                            </div>
                            <span className="font-electrolize font-medium">rohit@example.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-300 border-2 border-black rounded-lg flex items-center justify-center">
                                📍
                            </div>
                            <span className="font-electrolize font-medium">BITS Pilani, India</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - AI Chat */}
                <div className="flex flex-col">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-black text-lg">AI ASSISTANT</h2>
                        <span className="flex items-center gap-2 px-3 py-1 bg-retro-green border-2 border-retro-dark rounded-full text-[10px] font-black uppercase animate-bounce shadow-retro-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            Online
                        </span>
                    </div>
                    <GeminiChat />
                </div>
            </div>
        </div>
    )
}