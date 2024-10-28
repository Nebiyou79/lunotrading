// TermsOfService.tsx
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-700">
      <h1 className="text-4xl font-semibold mb-4 text-center text-gray-900">Terms of Service</h1>
      
      <p className="mb-4">
        Welcome to <span className="font-bold">Luno Trading</span>. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>By accessing our platform, you agree to comply with these terms and conditions. If you do not agree, you must not use our services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of Services</h2>
        <p>You agree to use our services only for lawful purposes. You are prohibited from using our platform for any activity that violates local, national, or international laws.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Trading and Financial Risk</h2>
        <p>Trading involves significant risk. You acknowledge and agree that <span className="font-bold">YourWebsiteName</span> is not liable for any losses incurred from trading activities on our platform.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>In no event shall <span className="font-bold">YourWebsiteName</span> or its affiliates be liable for any indirect, incidental, or consequential damages arising from the use of our platform.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms of Service at any time. Continued use of our services after any changes constitutes acceptance of the revised terms.</p>
      </section>

      <p className="mt-8">
        For questions regarding these Terms of Service, please reach out to us at <span className="text-blue-500">support@yourwebsitename.com</span>.
      </p>
    </div>
  );
};

export default TermsOfService;
