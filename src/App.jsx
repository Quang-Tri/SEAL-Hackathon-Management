import { useState } from 'react'
import CandidateDashboard from './components/CandidateDashboard'
import JuryScreen from './components/JuryScreen'
import Leaderboard from './components/Leaderboard'
import { Users, FileText, Trophy, Menu, X } from 'lucide-react'

function App() {
  const [activeScreen, setActiveScreen] = useState('candidate')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const screens = [
    { id: 'candidate', name: 'Dashboard Thí Sinh', icon: Users },
    { id: 'jury', name: 'Màn Hình Chấm Điểm', icon: FileText },
    { id: 'leaderboard', name: 'Bảng Xếp Hạng', icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SEAL Hackathon
                </h1>
                <p className="text-xs text-slate-500">Hệ thống quản lý cuộc thi</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {screens.map((screen) => {
                const Icon = screen.icon
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(screen.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeScreen === screen.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{screen.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
            {screens.map((screen) => {
              const Icon = screen.icon
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    setActiveScreen(screen.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeScreen === screen.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{screen.name}</span>
                </button>
              )
            })}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeScreen === 'candidate' && <CandidateDashboard />}
        {activeScreen === 'jury' && <JuryScreen />}
        {activeScreen === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  )
}

export default App
