import { useEffect, useState } from "react"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("❌ Failed to load blogs", err))
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Fitness Blogs 📝</h2>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-600">{blog.title}</h3>
              <p className="text-gray-700 my-2">{blog.summary}</p>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs yet.</p>
        )}
      </div>
    </div>
  )
}

export default Blogs
