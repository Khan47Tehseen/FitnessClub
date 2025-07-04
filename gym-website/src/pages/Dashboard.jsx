import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      navigate("/login") // 🔐 Redirect if not logged in
    }
  }, [navigate])

  return (
    <div className="py-16 px-4 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">User Dashboard</h2>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow text-center">
        <p className="text-xl text-gray-700 font-medium">Welcome back! 🎉</p>
        <p className="mt-4 text-gray-600">You are now in your protected dashboard area.</p>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn")
            navigate("/login")
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
