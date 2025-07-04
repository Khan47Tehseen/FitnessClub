import { useState } from "react"

const BMICalculator = () => {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (!h || !w) return

    const bmiValue = w / (h * h)
    setBmi(bmiValue.toFixed(1))

  if (bmiValue < 18.5) {
  setCategory(
    `Underweight 🥦 
You are under the healthy BMI range. 

💡 Suggestions:
- Eat calorie-rich, nutritious foods (nuts, dairy, rice, potatoes).
- Include protein shakes and high-protein meals.
- Do strength training to build muscle.
- Eat small meals more frequently.
- Stay hydrated and avoid skipping meals.

📌 Consider a tailored diet plan and track your daily intake.`
  )
} else if (bmiValue < 24.9) {
  setCategory(
    `Normal 💪 
You are within the healthy BMI range.

💡 Suggestions:
- Maintain your weight with a balanced diet.
- Continue regular physical activity (30 min daily).
- Avoid sugary drinks & processed snacks.
- Stay consistent with hydration and sleep.

✅ You’re doing great! Keep going.`
  )
} else if (bmiValue < 29.9) {
  setCategory(
    `Overweight 🍔 
You are above the healthy BMI range.

💡 Suggestions:
- Include more vegetables, fruits, and whole grains.
- Start low-impact cardio (brisk walking, cycling).
- Avoid fried, sugary, and processed foods.
- Try portion control and intermittent fasting.
- Set small, weekly fitness goals.

🎯 You can reverse this with discipline and smart choices.`
  )
} else {
  setCategory(
    `Obese 🚨 
Your BMI indicates obesity, which can lead to serious health issues.

💡 Critical Actions:
- Follow a calorie-deficit diet plan (preferably supervised).
- Cut down on junk food, sugar, and late-night eating.
- Begin low-impact workouts, gradually increasing intensity.
- Track all meals and activity with an app.
- Sleep 7–8 hours daily and reduce screen time.

📝 Diet Plan Categories You May Follow:
1️⃣ Low Carb + High Protein Diet  
2️⃣ Mediterranean Diet (fruits, veggies, whole grains, healthy fats)  
3️⃣ Intermittent Fasting (16:8, OMAD)  
4️⃣ Keto (only under medical supervision)

🚨 Please consult a trainer or doctor for a fully personalized plan. Your health is priority.`
  )
}

  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 shadow rounded">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          BMI Calculator
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Calculate BMI
          </button>

          {bmi && (
            <div className="mt-6 p-4 bg-blue-100 rounded text-center">
              <p className="text-xl font-semibold text-gray-800">Your BMI: {bmi}</p>
              <p className="text-gray-700 mt-2">{category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BMICalculator
