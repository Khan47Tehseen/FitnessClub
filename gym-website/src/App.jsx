import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Blog from "./pages/Blog"
import Diet from "./pages/Diet"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddBlog from "./pages/AddBlog"
import AddDiet from "./pages/AddDiet"
import AdminDashboard from "./pages/AdminDashboard"
import Profile from "./pages/Profile" // ✅ New
import BMICalculator from "./pages/BMICalculator"


// 🔐 Auth wrapper for users
const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  return isLoggedIn ? children : window.location.replace("/login")
}

// 🔐 Admin only
const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("role")
  return role === "admin" ? children : window.location.replace("/login")
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            {/* ✅ Admin Only Routes */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/add-blog"
              element={
                <RequireAdmin>
                  <AddBlog />
                </RequireAdmin>
              }
            />
            <Route
              path="/add-diet"
              element={
                <RequireAdmin>
                  <AddDiet />
                </RequireAdmin>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
