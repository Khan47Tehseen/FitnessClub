import { useState } from "react"

const AddBlog = () => {
  const [blog, setBlog] = useState({ title: "", summary: "", date: "" })

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })

      const data = await res.json()
      if (res.ok) {
        alert("✅ Blog added!")
        setBlog({ title: "", summary: "", date: "" })
      } else {
        alert("❌ " + data.message)
      }
    } catch (err) {
      alert("❌ Server Error")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded shadow">
        <input type="text" name="title" placeholder="Title" value={blog.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="summary" placeholder="Summary" value={blog.summary} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="date" placeholder="Date (e.g. 2025-06-29)" value={blog.date} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog
