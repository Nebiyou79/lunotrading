// PrivacyPolicy.tsx
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-700">
      <h1 className="text-4xl font-semibold mb-4 text-center text-gray-900">Privacy Policy</h1>
      
      <p className="mb-4">
        Welcome to Luno Trading We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website or services. By accessing or using our services, you agree to the terms outlined here.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <p>We may collect personal information, including but not limited to your name, email, and payment information, when you register, log in, or make transactions on our platform.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>Your information is used to provide, maintain, and improve our services. We may also use it to communicate with you, process transactions, and enhance security measures.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Disclosure of Your Information</h2>
        <p>We do not share your personal information with third parties except as necessary for legal compliance, or to protect our rights or those of others.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Security of Your Information</h2>
        <p>We take reasonable measures to protect your personal information; however, no method of transmission over the internet is completely secure. You use our services at your own risk.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
        <p>You may have rights related to your personal data under applicable laws, such as accessing, correcting, or deleting your data. Contact us if you would like to exercise these rights.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. Changes will be posted on this page, and your continued use of our services signifies your acceptance of these updates.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
