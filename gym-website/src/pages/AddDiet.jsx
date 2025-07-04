import { useState } from "react"

const AddDiet = () => {
  const [diet, setDiet] = useState({ title: "", description: "" })

  const handleChange = (e) => {
    setDiet({ ...diet, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diet),
      })

      const data = await res.json()
      if (res.ok) {
        alert("✅ Diet added!")
        setDiet({ title: "", description: "" })
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
      <h1 className="text-2xl font-bold mb-6 text-center">Add Diet Plan</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded shadow">
        <input type="text" name="title" placeholder="Title" value={diet.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={diet.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Diet</button>
      </form>
    </div>
  )
}

export default AddDiet
