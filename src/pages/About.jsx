import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  const cards = [
    {
      title: "Life & Philosophy",
      emoji: "🌱",
      content: "I value directness and simplicity. Why use many words when a few clear ones do the job? Outside of code, you'll find me strategizing in Chess, Estimation, or competing in online games.",
      color: "border-blue-500"
    },
    {
      title: "Work & Teamwork",
      emoji: "🤝",
      content: "A collaborative player who believes a team's growth is a win for everyone. I aim for 'out-of-the-box' solutions that simply work. I'm ready to contribute immediately while gaining experience to eventually lead.",
      color: "border-green-500"
    },
    {
      title: "The Computer Journey",
      emoji: "💻",
      content: "Started with childhood play, peeked at Visual Basic at 10, and experimented with Photoshop. My real turning point was a mini laptop with Ubuntu; I've been a continuous learner ever since.",
      color: "border-purple-500"
    },
    {
      title: "Science & Physics",
      emoji: "🧪",
      content: "Deeply curious about wave mechanics. I've experimented with how sound affects water and its 'memory' of frequencies. I’m not a scientist, but physics is the lens through which I view the world.",
      color: "border-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50
     bg-gradient-to-tr from-blue-200 to-blue-400
    py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <Navbar/>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">About Me</h1>
        <p className="text-gray-600 text-center mb-12">A look into my world, one card at a time.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`group relative bg-white p-8 rounded-2xl shadow-sm border-l-4 ${card.color} 
                          transition-all duration-300 ease-out
                          hover:scale-[1.03] hover:rotate-1 hover:shadow-xl cursor-default`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{card.emoji}</span>
                <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {card.content}
              </p>
              
              {/* Subtle accent circle for the 'out of the box' feel */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className={`w-12 h-12 rounded-full border-4 ${card.color.replace('border-', 'border-')}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;