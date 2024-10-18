import Footer from '@/components/footer';
import NavBar from '@/components/navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Define the shape of the article data
interface Article {
  title: string;
  description: string;
  url: string;
  image_url: string;
}

const NewsPage = () => {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://news-api-url-here.com');
        const data = await response.json();
        console.log(data); // Check the fetched data
        setNews(data.articles);  // Check if articles exist in the fetched data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
  
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
        <NavBar/>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-10">Crypto News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <Image src={article.image_url} alt={article.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <a href={article.url} className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NewsPage;
