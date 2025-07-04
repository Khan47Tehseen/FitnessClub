import { useEffect, useState } from "react"

const Diet = () => {
  const [diets, setDiets] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/diet")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error("❌ Failed to fetch diet plans", err))
  }, [])

  return (
    <div className="py-16 px-4 md:px-10 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Your Diet Plans</h2>

      {diets.length === 0 ? (
        <p className="text-center text-gray-500">No diet plans available.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {diets.map((diet) => (
            <div key={diet._id} className="border border-gray-200 rounded-lg shadow p-6 bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{diet.title}</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{diet.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Diet
