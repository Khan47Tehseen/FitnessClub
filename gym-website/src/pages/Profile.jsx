import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTime, setNewTime] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/login");

    try {
      const res = await fetch(`http://localhost:5000/api/user/${storedUser._id}`);
      const data = await res.json();
      if (res.ok) setUser(data);
      else navigate("/login");
    } catch (error) {
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handlePayment = async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const amount = user.feeAmount;

  if (amount <= 0) return alert("✅ No pending fee!");

  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, userId: user._id }),
  });

  const data = await res.json();
  if (!data.success) return alert("❌ Failed to create order");

  const options = {
    key: "rzp_test_jXu7Jzj1NELkWP",
    amount: data.order.amount,
    currency: "INR",
    name: "FitZone Gym",
    description: "Fee Payment",
    order_id: data.order.id,
    handler: async (response) => {
      // After success
      await fetch("http://localhost:5000/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, amount }),
      });

      alert(`💳 Payment successful! \nReceipt: ${data.order.receipt} \nAmount: ₹${amount}`);
      fetchUserData(); // update profile
    },
    prefill: {
      name: user.name,
      email: user.email,
    },
    theme: {
      color: "#1e40af",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const handleTimeChange = async () => {
    if (!newTime) return alert("Please enter your requested time.");

    const res = await fetch(`http://localhost:5000/api/user/${user._id}/update-time`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestedTime: newTime }),
    });

    if (res.ok) {
      alert("✅ Request sent to admin.");
      setNewTime("");
      fetchUserData();
    } else {
      alert("❌ Failed to request.");
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return alert("Please select a photo.");

    const base64 = await convertToBase64(photoFile);

    const res = await fetch(`http://localhost:5000/api/user/${user._id}/upload-photo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photo: base64 }),
    });

    if (res.ok) {
      alert("✅ Profile photo updated.");
      setPhotoFile(null);
      setPhotoPreview("");
      fetchUserData();
    } else {
      alert("❌ Upload failed.");
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  if (loading) return <p className="text-center mt-16 text-lg text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">👤 Welcome, {user.name}</h2>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <img
            src={user.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border shadow"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPhotoFile(e.target.files[0]);
              setPhotoPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="block text-sm text-gray-500"
          />
          {photoPreview && (
            <div>
              <img src={photoPreview} className="w-20 h-20 rounded-full border mt-2" alt="Preview" />
              <button onClick={handlePhotoUpload} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Upload Photo
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
  <div>
    <p className="font-semibold">📧 Email:</p>
    <p>{user.email}</p>
  </div>
  <div>
    <p className="font-semibold">💰 Fee Amount:</p>
    <p>₹{user.feeAmount?.toLocaleString("en-IN") || 0}</p>
  </div>
  <div>
    <p className="font-semibold">⏰ Gym Timing:</p>
    <p>{user.gymTime || "Not set"}</p>
  </div>
  <div>
    <p className="font-semibold">🥗 Diet Plan:</p>
    <p>{user.dietPlan || "Not selected"}</p>
  </div>

          <div className="sm:col-span-2">
            <p className="font-semibold">📩 Admin Message:</p>
            <div className="bg-blue-50 p-4 rounded text-gray-800">{user.messageFromAdmin || "No message yet."}</div>
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-gray-700 font-medium mb-2">📅 Request New Gym Time:</label>
          <input
            type="text"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="e.g., 6AM - 7AM"
          />
          <button
            onClick={handleTimeChange}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Request Time Change
          </button>
        </div>
        <div>
  <p className="font-semibold">💸 Pay Fee Online:</p>
  <button
    onClick={handlePayment}
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Pay Now (₹{user.feeAmount})
  </button>
</div>


        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
