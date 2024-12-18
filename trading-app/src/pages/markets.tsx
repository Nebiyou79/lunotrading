import React, { useEffect, useState } from 'react';
import { getHistoricalPrices, getCryptoPrices } from '../utils/marketService'; // Assuming you have this API function set up
import { CryptoData, Coin } from '../types/crypto';
import { Line } from 'react-chartjs-2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Image from 'next/image';
import { getUserProfile } from '../utils/apiServices';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';
import TradingModal from '@/components/tradeModal'; // Importing the modal component
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Markets = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCoin, setExpandedCoin] = useState<string | null>(null);
    // const [userAction, setUserAction] = useState<string | null>(null);
    const [coinHistoricalData, setCoinHistoricalData] = useState<number[][]>([]); // Historical price data
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCoinPrice, setSelectedCoinPrice] = useState<number | null>(null);
    const [selectedCoinName, setSelectedCoinName] = useState<string | null>(null);

    // Function to get crypto prices
    const getPrices = async () => {
        try {
            setLoading(true);
            const data = await getCryptoPrices();
            setCryptoData(data); 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError('Failed to fetch cryptocurrency prices');
            toast.error('Failed to cryptocurrency prices');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch historical data for the selected coin
    const fetchHistoricalPrices = async (coinId: string) => {
        try {
            const data = await getHistoricalPrices(coinId, 30); // Fetch 30-day data by default
            setCoinHistoricalData(data.prices);
        } catch (err) {
            console.error("Error fetching historical prices", err);
            toast.error("Failed to fetch historical prices");
        }
    };

    // Fetch prices on mount and set up polling every 60 seconds
    useEffect(() => {
        getPrices();
        const interval = setInterval(getPrices, 60000);
        return () => clearInterval(interval);
    }, []);
    // Fetch user data
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const data = await getUserProfile();
            setUser(data.user); // Assuming the API returns user data inside the "user" key
            setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            setError('Failed to fetch profile');
            setLoading(false);
          }
        };
        fetchProfile();
      }, []);

    // Fetch historical data when a coin is expanded
    useEffect(() => {
        if (expandedCoin) {
            fetchHistoricalPrices(expandedCoin);
        }
    }, [expandedCoin]);

    const toggleDropdown = (coinId: string) => {
        setExpandedCoin((prev) => (prev === coinId ? null : coinId));
    };

    const openModal = (price: number, name: string) => {
        setSelectedCoinPrice(price);
        setSelectedCoinName(name);
        // setUserAction(action); // Set the action to either "Up" or "Down"
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCoinPrice(null);
        setSelectedCoinName(null); // Set the coin name

    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 mt-5">
            <NavBar/>
            <div className="h-64 relative">
                <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                    <div className="h-64 relative">
                        <Image
                            src="/images/slide1.jpg"
                            alt="First Slide"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                            priority
                        />
                    </div>
                    <div className="h-64 relative">
                        <Image
                            src="/images/slide2.jpg"
                            alt="Second Slide"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                            priority
                        />
                    </div>
                    <div className="h-64 relative">
                        <Image
                            src="/images/slide3.jpg"
                            alt="Trading Strategies"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                            priority
                        />
                    </div>
                </Carousel>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-white">Cryptocurrency Prices</h1>
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <ul>
                    {cryptoData?.map((coin: Coin) => (
                        <li key={coin.id} className="flex flex-col p-4 hover:bg-gray-700">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <span className="text-white font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</span>
                                </div>
                                <span className="text-white">${coin.current_price.toLocaleString()}</span>
                                <span className="hidden md:block text-white">${coin.market_cap.toLocaleString()}</span>
                                <button 
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => toggleDropdown(coin.id)}
                                >
                                    Details
                                </button>
                            </div>
                            
                            {expandedCoin === coin.id && (
                                <div className="mt-4">
                                    <div className="w-full h-40">
                                        <Line
                                            data={{
                                                labels: coinHistoricalData.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
                                                datasets: [
                                                    {
                                                        data: coinHistoricalData.map(([, price]) => price),
                                                        borderColor: 'rgba(0, 123, 255, 1)',
                                                        borderWidth: 2,
                                                        fill: false,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                maintainAspectRatio: false,
                                                responsive: true,
                                                elements: {
                                                    point: {
                                                        radius: 0,
                                                    },
                                                },
                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },
                                                },
                                                scales: {
                                                    x: {
                                                        display: true,
                                                    },
                                                    y: {
                                                        display: true,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-center space-x-2 mt-4">
                                        <button 
                                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                            onClick={() => openModal(coin.current_price, coin.name)}
                                        >
                                            Up
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                            onClick={() => openModal(coin.current_price, coin.name)}
                                        >
                                            Down
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Trading Modal */}
            {selectedCoinPrice && (
                <TradingModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                amountBTCUSD={selectedCoinPrice} // Pass the coin price
                coinName={selectedCoinName}
                balance = {user.balance}
                // action={userAction}
            />
            )}

            <Footer/>
        </div>
    );
};

export default Markets;
