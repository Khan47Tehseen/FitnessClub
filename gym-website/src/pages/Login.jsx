import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({});

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", data.user.role);

        setMsg({ type: "success", text: "✅ Login successful!" });
        setForm({ email: "", password: "" });

        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin" : "/profile");
        }, 1000);
      } else {
        setMsg({ type: "error", text: "❌ " + data.message });
      }
    } catch (err) {
      setMsg({ type: "error", text: "❌ Server error. Please try again." });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login to FitZone</h2>

        {msg.text && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              msg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              autoFocus
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-xl text-gray-500 cursor-pointer"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
