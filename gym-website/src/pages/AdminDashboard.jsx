import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [diets, setDiets] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const fetchDiets = async () => {
    const res = await fetch("http://localhost:5000/api/diet");
    const data = await res.json();
    setDiets(data);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied! Only admin can access this page.");
      navigate("/login");
    }
    fetchUsers();
    fetchDiets();
  }, []);

  const updateUser = async (id, updatedData) => {
    await fetch(`http://localhost:5000/api/admin/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (confirm("Are you sure to delete this user?")) {
      await fetch(`http://localhost:5000/api/admin/user/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-semibold transition"
      >
        🔒 Logout
      </button>

      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        🛠️ Admin Dashboard
      </h2>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        <button
          onClick={() => navigate("/add-diet")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          ➕ Add New Diet Plan
        </button>
        <button
          onClick={() => navigate("/add-blog")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          📝 Add Blog Article
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{user.email}</p>

            <label className="block text-gray-600 text-sm font-medium mt-4">
              Fee (₹)
            </label>
            <input
              type="number"
              value={user.feeAmount || ""}
              onChange={(e) =>
                updateUser(user._id, { feeAmount: e.target.value })
              }
              placeholder="e.g. 1500"
              className="w-full border rounded px-3 py-1 text-sm"
            />

            <label className="block text-gray-600 text-sm font-medium mt-4">
              Workout Time
            </label>
            <input
              type="text"
              value={user.gymTime || ""}
              onChange={(e) =>
                updateUser(user._id, { gymTime: e.target.value })
              }
              placeholder="e.g. 7AM – 8AM"
              className="w-full border rounded px-3 py-1 text-sm"
            />

            <label className="block text-gray-600 text-sm font-medium mt-4">
              Admin Message
            </label>
            <textarea
              rows={2}
              value={user.messageFromAdmin || ""}
              onChange={(e) =>
                updateUser(user._id, { messageFromAdmin: e.target.value })
              }
              placeholder="Write something..."
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <label className="block text-gray-600 text-sm font-medium mt-4">
              Diet Plan
            </label>
            <textarea
              rows={3}
              value={user.dietPlan || ""}
              onChange={(e) =>
                updateUser(user._id, { dietPlan: e.target.value })
              }
              placeholder="e.g. High-protein + low carbs + 2L water"
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <button
              onClick={() => deleteUser(user._id)}
              className="mt-6 text-red-600 hover:underline text-sm"
            >
              ❌ Delete User
            </button>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No users found.
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
