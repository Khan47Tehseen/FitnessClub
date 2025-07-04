import { useEffect, useState } from "react"

const DietPlan = () => {
  const [diets, setDiets] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/diets")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => {
        console.error("❌ Failed to fetch diets:", err)
      })
  }, [])

  return (
    <div className="py-16 px-4 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Recommended Diet Plans
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {diets.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">No diet plans available yet.</p>
        ) : (
          diets.map((diet, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{diet.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {diet.meals.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DietPlan
