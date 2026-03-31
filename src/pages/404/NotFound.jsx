import { Link } from 'react-router-dom'
import { IoHome, IoArrowBack } from 'react-icons/io5'

// Generate stars OUTSIDE component to avoid impure function error
const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  size: ((i * 7) % 3) + 1,
  top: ((i * 17) % 100),
  left: ((i * 23) % 100),
  delay: ((i * 13) % 30) / 10,
  duration: ((i * 11) % 30) / 10 + 2
}))

// CSS styles
const styles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(-5deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @keyframes gradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-twinkle {
    animation: twinkle ease-in-out infinite;
  }

  .animate-gradient {
    background-size: 200% auto;
    animation: gradient 3s ease infinite;
  }
`

function NotFound() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-linear-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Inject CSS */}
      <style>{styles}</style>

      {/* Animated stars background */}
      <div className="absolute inset-0">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          {/* Floating Astronaut */}
          <div className="mb-8 flex justify-center">
            <div className="animate-float">
              <svg
                className="w-48 h-48"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Astronaut illustration */}
                <circle cx="100" cy="80" r="35" fill="#E8EAED" />
                <circle cx="100" cy="80" r="30" fill="#1A73E8" opacity="0.3" />
                <circle cx="90" cy="75" r="4" fill="#1A1A1A" />
                <circle cx="110" cy="75" r="4" fill="#1A1A1A" />
                <path d="M 90 90 Q 100 95 110 90" stroke="#1A1A1A" strokeWidth="2" fill="none" />

                {/* Body */}
                <ellipse cx="100" cy="130" rx="30" ry="40" fill="#E8EAED" />
                <rect x="85" y="110" width="30" height="40" fill="#E8EAED" />
                <circle cx="100" cy="125" r="8" fill="#1A73E8" />

                {/* Arms */}
                <ellipse cx="70" cy="120" rx="10" ry="25" fill="#E8EAED" transform="rotate(-30 70 120)" />
                <ellipse cx="130" cy="120" rx="10" ry="25" fill="#E8EAED" transform="rotate(30 130 120)" />

                {/* Legs */}
                <ellipse cx="88" cy="165" rx="8" ry="20" fill="#E8EAED" />
                <ellipse cx="112" cy="165" rx="8" ry="20" fill="#E8EAED" />

                {/* Oxygen tube */}
                <path d="M 120 80 Q 140 90 140 110" stroke="#FFA500" strokeWidth="3" fill="none" />
                <circle cx="140" cy="115" r="6" fill="#FFA500" />
              </svg>
            </div>
          </div>

          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              Không tìm thấy trang này
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto">
              Trang bạn đang tìm kiếm đã trôi đi đâu đó trong không gian...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              <IoHome size={20} />
              <span>Về trang chủ</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105"
            >
              <IoArrowBack size={20} />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-sm text-gray-400">
            <p>Cần trợ giúp? <a href="mailto:support@example.com" className="text-blue-400 hover:text-blue-300 transition-colors">Liên hệ hỗ trợ</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
