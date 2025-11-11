import React from 'react'

export default function Hero() {
  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
        poster="https://flightticket.co/wp-content/uploads/2023/11/flight-poster.jpg"
      >
        <source src="https://flightticket.co/wp-content/uploads/2023/11/flight-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute z-10 w-full h-full bg-black/40"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-20 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight shadow-lg">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed shadow-md">
          Search for the best flight deals from hundreds of airlines and travel agencies.
        </p>

        {/* Scroll down arrow */}
        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
