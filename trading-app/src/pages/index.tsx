import React from 'react';
import 'swiper/css';
import Image from 'next/image';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';
import 'swiper/css/pagination';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      {/* Hero Section with Video Background */}
      <div className="relative w-full h-[700px]">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/videos/market-trade.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white">
            Trade Smarter, Trade Better
          </h2>
          <p className="text-lg md:text-2xl text-gray-200 mt-4">
            Empower your trading journey with real-time insights and expert analysis.
          </p>
          <Link href="/markets" className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold">
            Start Trading
          </Link>
        </div>
      </div>

      {/* Features Section with Hover Effects */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            Why Choose Luna Trading?
          </h2>
          <div className="grid gap-8 mt-10 md:grid-cols-3">
            <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <Image src="/icons/real-time-data.png" alt="Real-Time Data" width={60} height={60} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Real-Time Data</h3>
              <p className="mt-4 text-gray-600">
                Get the latest market updates to make informed decisions.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <Image src="/icons/analytics.png" alt="Advanced Analytics" width={60} height={60} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Advanced Analytics</h3>
              <p className="mt-4 text-gray-600">
                Leverage powerful tools to enhance your trading strategies.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <Image src="/icons/support.png" alt="Expert Support" width={60} height={60} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Expert Support</h3>
              <p className="mt-4 text-gray-600">
                Our dedicated team is here to assist you at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 text-center">
            Trusted by Thousands of Traders
          </h2>
          <div className="mt-8 flex flex-col md:flex-row md:justify-around">
            <div className="md:w-1/3 p-6 bg-gray-100 rounded-lg">
              <p className="text-lg text-gray-700">Luna Trading has transformed my trading experience. The real-time insights are invaluable!</p>
              <h4 className="mt-4 font-bold text-gray-800">- Sarah T., Professional Trader</h4>
            </div>
            <div className="md:w-1/3 p-6 bg-gray-100 rounded-lg mt-6 md:mt-0">
              <p className="text-lg text-gray-700">The analytics tools helped me fine-tune my strategies and maximize profits!</p>
              <h4 className="mt-4 font-bold text-gray-800">- John D., Day Trader</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
