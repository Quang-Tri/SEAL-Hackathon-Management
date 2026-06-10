import { useState, useEffect } from 'react'
import { Clock, Download, Upload, Github, FileText, CheckCircle, Hourglass, AlertCircle } from 'lucide-react'

function CandidateDashboard() {
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 30, seconds: 0 })
  const [dragActive, setDragActive] = useState(false)
  const [githubLink, setGithubLink] = useState('')
  const [submissions, setSubmissions] = useState([
    { id: 1, time: '10:30 AM', date: '10/06/2026', status: 'success', file: 'submission_v1.zip' },
    { id: 2, time: '14:45 PM', date: '10/06/2026', status: 'grading', file: 'submission_v2.zip' },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds -= 1
        } else if (minutes > 0) {
          minutes -= 1
          seconds = 59
        } else if (hours > 0) {
          hours -= 1
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleSubmit = () => {
    const newSubmission = {
      id: submissions.length + 1,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'grading',
      file: githubLink || 'dragged_file.zip',
    }
    setSubmissions([newSubmission, ...submissions])
    setGithubLink('')
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-72 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">4</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Team 4</h2>
            <p className="text-sm text-slate-500">Phạm Minh Tâm</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-slate-600">Thời gian còn lại</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-slate-500 mt-1">{timeLeft.hours} giờ {timeLeft.minutes} phút</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Thông tin cuộc thi</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Vòng thi:</span>
                <span className="font-medium text-slate-700">Vòng loại</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số thành viên:</span>
                <span className="font-medium text-slate-700">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lần nộp bài:</span>
                <span className="font-medium text-slate-700">{submissions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Download Problem Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <Download className="w-5 h-5 text-primary" />
            <span>Đề bài cuộc thi</span>
          </h3>
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-medium text-slate-700">SEAL_Hackathon_2026_Problem.pdf</p>
                <p className="text-sm text-slate-500">Cập nhật: 09/06/2026</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Tải xuống Đề bài (PDF)</span>
            </button>
          </div>
        </div>

        {/* Submission Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Nộp bài thi</span>
          </h3>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-slate-300 hover:border-primary hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${dragActive ? 'bg-primary/20' : 'bg-slate-100'}`}>
                <Upload className={`w-8 h-8 ${dragActive ? 'text-primary' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className="font-medium text-slate-700">Kéo & Thả file .zip vào đây</p>
                <p className="text-sm text-slate-500 mt-1">hoặc dán link GitHub bên dưới</p>
              </div>
            </div>
          </div>

          {/* GitHub Link Input */}
          <div className="mt-4">
            <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3">
              <Github className="w-5 h-5 text-slate-600" />
              <input
                type="text"
                placeholder="Dán link GitHub repository của bạn..."
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-200"
          >
            NỘP BÀI
          </button>
        </div>

        {/* Submission History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Lịch sử nộp bài</span>
          </h3>

          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    submission.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {submission.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Hourglass className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{submission.file}</p>
                    <p className="text-sm text-slate-500">{submission.date} - {submission.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {submission.status === 'success' ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Thành công
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Hourglass className="w-3 h-3" />
                      <span>Đang chấm</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard
