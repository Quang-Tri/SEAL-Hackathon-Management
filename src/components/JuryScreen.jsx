import { useState } from 'react'
import { Github, FileText, Save, CheckCircle, Clock, Users, Star } from 'lucide-react'

function JuryScreen() {
  const [selectedTeam, setSelectedTeam] = useState(4)
  const [scores, setScores] = useState({
    features: 0,
    uiux: 0,
    technical: 0,
    presentation: 0,
  })
  const [comment, setComment] = useState('')
  const [saved, setSaved] = useState(false)

  const teams = [
    { id: 1, name: 'Đội 1', status: 'graded', github: 'github.com/team1', file: 'team1_submission.zip' },
    { id: 2, name: 'Đội 2', status: 'pending', github: 'github.com/team2', file: 'team2_submission.zip' },
    { id: 3, name: 'Đội 3', status: 'graded', github: 'github.com/team3', file: 'team3_submission.zip' },
    { id: 4, name: 'Nhóm 4', status: 'pending', github: 'github.com/team4', file: 'team4_submission.zip' },
    { id: 5, name: 'Đội 5', status: 'pending', github: 'github.com/team5', file: 'team5_submission.zip' },
    { id: 6, name: 'Đội 6', status: 'graded', github: 'github.com/team6', file: 'team6_submission.zip' },
  ]

  const selectedTeamData = teams.find(t => t.id === selectedTeam)

  const totalScore = (
    (scores.features * 0.4) +
    (scores.uiux * 0.2) +
    (scores.technical * 0.2) +
    (scores.presentation * 0.2)
  ).toFixed(1)

  const handleScoreChange = (field, value) => {
    const numValue = Math.min(100, Math.max(0, parseInt(value) || 0))
    setScores(prev => ({ ...prev, [field]: numValue }))
    setSaved(false)
  }

  const handleSaveDraft = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSubmit = () => {
    alert(`Đã hoàn tất chấm điểm cho ${selectedTeamData.name}!`)
  }

  return (
    <div className="flex gap-6">
      {/* Left Column - Team List */}
      <aside className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <span>Danh sách đội thi</span>
        </h3>

        <div className="space-y-2">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                selectedTeam === team.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="font-medium">{team.name}</span>
              {team.status === 'graded' ? (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTeam === team.id ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                }`}>
                  Đã chấm
                </span>
              ) : (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTeam === team.id ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  Chưa chấm
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Tổng số đội:</span>
            <span className="font-bold text-slate-700">{teams.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-slate-500">Đã chấm:</span>
            <span className="font-bold text-green-600">{teams.filter(t => t.status === 'graded').length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-slate-500">Chưa chấm:</span>
            <span className="font-bold text-yellow-600">{teams.filter(t => t.status === 'pending').length}</span>
          </div>
        </div>
      </aside>

      {/* Center Column - Team Details & Scoring */}
      <div className="flex-1 space-y-6">
        {/* Team Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">{selectedTeamData.name}</h3>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedTeamData.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {selectedTeamData.status === 'graded' ? 'Đã chấm' : 'Chưa chấm'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500">GitHub Repository</p>
                  <p className="font-medium text-slate-700 truncate">{selectedTeamData.github}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500">File đính kèm</p>
                  <p className="font-medium text-slate-700 truncate">{selectedTeamData.file}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Form nhập điểm</span>
          </h3>

          <div className="space-y-4">
            {/* Features */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-slate-700">Tính năng</label>
                <span className="text-sm text-slate-500">40%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={scores.features}
                onChange={(e) => handleScoreChange('features', e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* UI/UX */}
            <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-slate-700">UI/UX</label>
                <span className="text-sm text-slate-500">20%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={scores.uiux}
                onChange={(e) => handleScoreChange('uiux', e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:border-secondary focus:outline-none transition-colors"
              />
            </div>

            {/* Technical */}
            <div className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-slate-700">Kỹ thuật</label>
                <span className="text-sm text-slate-500">20%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={scores.technical}
                onChange={(e) => handleScoreChange('technical', e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Presentation */}
            <div className="bg-gradient-to-r from-warning/5 to-warning/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-slate-700">Thuyết trình</label>
                <span className="text-sm text-slate-500">20%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={scores.presentation}
                onChange={(e) => handleScoreChange('presentation', e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:border-warning focus:outline-none transition-colors"
              />
            </div>

            {/* Total Score */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6">
              <div className="text-center">
                <p className="text-white/80 text-sm font-medium mb-1">Điểm tổng kết</p>
                <p className="text-5xl font-bold text-white">{totalScore}</p>
                <p className="text-white/60 text-xs mt-2">/ 100 điểm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Nhận xét</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập nhận xét chi tiết về bài làm..."
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 min-h-[120px] focus:border-primary focus:outline-none transition-colors resize-none"
          />
          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={handleSaveDraft}
              className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Lưu tạm</span>
              {saved && <CheckCircle className="w-4 h-4 text-green-500" />}
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Hoàn tất chấm điểm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JuryScreen
