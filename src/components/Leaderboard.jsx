import { useState } from 'react'
import { Trophy, Medal, Search, Crown, Award, Star } from 'lucide-react'

function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const teams = [
    { rank: 1, name: 'Đội 1', features: 38, uiux: 18, technical: 19, presentation: 19, total: 94.0 },
    { rank: 2, name: 'Đội 3', features: 36, uiux: 17, technical: 18, presentation: 18, total: 89.0 },
    { rank: 3, name: 'Nhóm 4', features: 35, uiux: 16, technical: 17, presentation: 17, total: 85.0 },
    { rank: 4, name: 'Đội 2', features: 32, uiux: 15, technical: 16, presentation: 16, total: 79.0 },
    { rank: 5, name: 'Đội 5', features: 30, uiux: 14, technical: 15, presentation: 15, total: 74.0 },
    { rank: 6, name: 'Đội 6', features: 28, uiux: 13, technical: 14, presentation: 14, total: 69.0 },
  ]

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const top3 = filteredTeams.slice(0, 3)
  const remainingTeams = filteredTeams.slice(3)

  return (
    <div className="space-y-8">
      {/* Header with Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Bảng Xếp Hạng</h2>
              <p className="text-sm text-slate-500">Kết quả cuộc thi SEAL Hackathon 2026</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đội thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl w-full md:w-80 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Podium - Top 3 */}
      {top3.length >= 3 && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-lg p-8">
          <h3 className="text-center text-lg font-bold text-slate-700 mb-8 flex items-center justify-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Bục Danh Dự</span>
            <Crown className="w-5 h-5 text-yellow-500" />
          </h3>

          <div className="flex items-end justify-center gap-4 md:gap-8">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <Medal className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <div className="bg-gradient-to-t from-slate-400 to-slate-300 w-24 md:w-32 h-32 md:h-40 rounded-t-2xl flex flex-col items-center justify-end pb-4 shadow-lg">
                  <span className="text-3xl md:text-4xl font-bold text-white mb-1">2</span>
                  <span className="text-white font-bold text-sm md:text-base text-center px-2">{top3[1].name}</span>
                  <span className="text-white/80 text-xs md:text-sm">{top3[1].total} điểm</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl">
                  <Crown className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="bg-gradient-to-t from-yellow-500 to-yellow-400 w-28 md:w-36 h-40 md:h-52 rounded-t-2xl flex flex-col items-center justify-end pb-4 shadow-xl">
                  <span className="text-4xl md:text-5xl font-bold text-white mb-1">1</span>
                  <span className="text-white font-bold text-base md:text-lg text-center px-2">{top3[0].name}</span>
                  <span className="text-white/80 text-sm md:text-base">{top3[0].total} điểm</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <Award className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <div className="bg-gradient-to-t from-amber-700 to-amber-600 w-24 md:w-32 h-28 md:h-36 rounded-t-2xl flex flex-col items-center justify-end pb-4 shadow-lg">
                  <span className="text-3xl md:text-4xl font-bold text-white mb-1">3</span>
                  <span className="text-white font-bold text-sm md:text-base text-center px-2">{top3[2].name}</span>
                  <span className="text-white/80 text-xs md:text-sm">{top3[2].total} điểm</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Rankings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Bảng xếp hạng chi tiết</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Hạng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Tên Đội</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Tính năng (40%)</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">UI/UX (20%)</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Kỹ thuật (20%)</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Thuyết trình (20%)</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Tổng Điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTeams.map((team, index) => (
                <tr
                  key={team.rank}
                  className={`hover:bg-slate-50 transition-colors ${
                    index < 3 ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      team.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      team.rank === 2 ? 'bg-slate-300 text-slate-700' :
                      team.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {team.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">{team.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-slate-700">{team.features}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-slate-700">{team.uiux}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-slate-700">{team.technical}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-slate-700">{team.presentation}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {team.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTeams.length === 0 && (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Không tìm thấy đội thi nào</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
