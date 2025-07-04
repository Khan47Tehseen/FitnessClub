// src/pages/Home.jsx
const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center h-[90vh] flex items-center justify-center">
        <div className="bg-black bg-opacity-60 p-10 rounded-xl text-center max-w-2xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Transform Your Body at FitZone</h1>
          <p className="text-gray-300 text-lg mb-6">Join us today and take the first step toward a healthier, stronger you.</p>
          <a href="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-white to-gray-100">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16 leading-tight">
      Why <span className="text-blue-600">Choose FitZone?</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Card 1 - Trainers */}
      <div className="bg-white border-t-4 border-blue-600 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition duration-300">
        <img
          src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80"
          alt="Trainer"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <div className="text-blue-600 text-4xl mb-3">
          <i className="fas fa-dumbbell"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">Expert Trainers</h3>
        <p className="text-gray-600 leading-relaxed">
          Work with certified fitness professionals who design programs tailored to your body and goals.
        </p>
      </div>

      {/* Card 2 - Diet Plans */}
      <div className="bg-white border-t-4 border-green-500 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition duration-300">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlldHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Healthy Food"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <div className="text-green-500 text-4xl mb-3">
          <i className="fas fa-apple-alt"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">Personalized Diet Plans</h3>
        <p className="text-gray-600 leading-relaxed">
          Get science-backed nutrition guidance tailored to your lifestyle, fitness goals, and preferences.
        </p>
      </div>

      {/* Card 3 - Equipment */}
      <div className="bg-white border-t-4 border-purple-600 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition duration-300">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww"
          alt="Gym Equipment"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <div className="text-purple-600 text-4xl mb-3">
          <i className="fas fa-cogs"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">State-of-the-Art Equipment</h3>
        <p className="text-gray-600 leading-relaxed">
          Experience cutting-edge machines and a clean, modern environment designed for optimal results.
        </p>
      </div>

    </div>
  </div>
</section>
<section className="py-24 px-6 md:px-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-20 tracking-tight">
      Real <span className="text-pink-600">Transformations</span>, Real People
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      
      {/* Card 1 */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 ease-in-out">
        <img
          src="https://images.unsplash.com/photo-1549476464-37392f717541?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D"
          alt="Ayaan Transformation"
          className="w-full h-60 object-cover rounded-xl mb-5"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ayaan’s 6-Month Journey</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Lost 12kg and gained confidence through consistent training and a personalized diet plan at FitZone.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl p-6 border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 ease-in-out">
        <img
          src="https://images.unsplash.com/photo-1501450626433-39bbf117090e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHN0cmVuZ3RofGVufDB8fDB8fHww"
          alt="Yasir Strength Boost"
          className="w-full h-60 object-cover rounded-xl mb-5"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Yasir’s Strength Boost</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Went from beginner to bench-pressing 50kg in just 4 months with expert guidance from our trainers.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 ease-in-out">
        <img
          src="https://plus.unsplash.com/premium_photo-1672046218112-30a20c735686?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0fGVufDB8fDB8fHww"
          alt="Irfan Fat to Fit"
          className="w-full h-60 object-cover rounded-xl mb-5"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Irfan’s Fat-to-Fit Story</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Dropped 20kg and built lean muscle through structured workouts and disciplined eating at FitZone.
        </p>
      </div>

    </div>
  </div>
</section>


    </div>
  )
}

export default Home
