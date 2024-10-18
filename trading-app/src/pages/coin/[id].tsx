// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';

const CoinDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    // Fetch detailed data for the coin here using the `id`
    // This can be done using SWR or as part of `getServerSideProps`

    return (
        <div className="container mx-auto px-4 mt-5">
            <NavBar />
            <h1 className="text-3xl font-bold mb-4 text-white">Coin Details: {id}</h1>
            {/* Render coin details here */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                <p className="text-white">Here you will display data and charts for {id}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default CoinDetails;
