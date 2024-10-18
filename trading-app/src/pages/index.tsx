import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Slider Section */}
      <div className="relative w-full h-[500px] md:h-[700px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-[500px] md:h-[700px] w-full">
              <Image
                src="/images/slide1.jpg"
                alt="Trading Strategies"
                width={1200}
                height={700}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Welcome to Bane View
                </h2>
                <p className="text-lg md:text-2xl text-white mt-4">
                  Empowering traders with cutting-edge technology.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-[500px] md:h-[700px] w-full">
              <Image
                src="/images/slide2.jpg"
                alt="Market Insights"
                width={1200}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Global Market Insights
                </h2>
                <p className="text-lg md:text-2xl text-white mt-4">
                  Stay ahead of the market with real-time data.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-[500px] md:h-[700px] w-full">
              <Image
                src="/images/slide3.jpg"
                alt="Expert Analysis"
                width={1200}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Expert Trading Analysis
                </h2>
                <p className="text-lg md:text-2xl text-white mt-4">
                  We provide expert insights to boost your trading decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* About Bane View Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            About Bane View
          </h2>
          <p className="text-lg md:text-xl mt-6 text-gray-700 leading-relaxed">
            Bane View is a leading platform offering traders the tools and resources they need to succeed in todays dynamic markets. From real-time data analysis to expert trading insights, we empower traders with the knowledge and technology to thrive.
          </p>
          <p className="text-lg md:text-xl mt-4 text-gray-700 leading-relaxed">
            Whether you are a seasoned professional or just starting out, Bane View is here to support your journey to financial success.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600">
            Why Choose Bane View?
          </h2>
          <div className="grid gap-8 mt-10 md:grid-cols-3">
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">Real-Time Data</h3>
              <p className="mt-4 text-gray-600">
                Access up-to-the-minute market data and make informed trading decisions.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">Advanced Analytics</h3>
              <p className="mt-4 text-gray-600">
                Benefit from powerful analysis tools that enhance your trading strategies.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">Expert Support</h3>
              <p className="mt-4 text-gray-600">
                Our team of experts is here to assist you every step of the way.
              </p>
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
