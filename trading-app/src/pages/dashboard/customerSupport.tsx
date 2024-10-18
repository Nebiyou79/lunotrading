import Layout from '@/components/Layout';
import React, { useState } from 'react';

const CustomerSupport = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace these with the appropriate phone number or username
    const phoneNumber = '251977809831'; // e.g., '15555555555'

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Create Telegram URL

    // Optionally: Use either WhatsApp or Telegram based on user choice
    // For demonstration, we'll just open WhatsApp here
    window.open(whatsappUrl, '_blank');

    console.log('Message sent:', message);
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-gray-800 p-6 rounded-lg space-y-6 ">
        <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>

        {submitted ? (
          <p className="text-green-500">Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full p-2 bg-gray-900 text-white rounded h-32"
            ></textarea>

            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default CustomerSupport;
