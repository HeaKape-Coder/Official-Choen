import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={onClose}
      style={{ 
        animation: 'fadeIn 0.3s ease-out',
        backgroundColor: 'rgba(2, 36, 19, 0.2)'
      }}
    >
      <div 
        className="bg-white rounded-[33px] max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 
            className="mb-6"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '32px',
              color: '#022413',
              fontWeight: '700'
            }}
          >
            TERMS & POLICY
          </h2>

          {/* Terms Content */}
          <div 
            className="space-y-4 mb-8"
            style={{ 
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '14px',
              color: '#363636',
              lineHeight: '1.6'
            }}
          >
            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                1. Terms of Service
              </h3>
              <p>
                By accessing and using Choen's services, you agree to be bound by these Terms and Conditions. 
                Choen is a digital marketplace offering game credits, handcrafted items, premium accounts, and related services. 
                All transactions are subject to availability and our acceptance of your order.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                2. Product Information
              </h3>
              <p>
                We strive to provide accurate product descriptions and pricing. Game credits are delivered digitally upon successful payment. 
                Handcrafted items are custom-made and delivery times may vary. Premium accounts are subject to the terms of their respective providers.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                3. Payment & Pricing
              </h3>
              <p>
                All prices are listed in Philippine Peso (₱) unless otherwise stated. We accept payments via Cash, GCash, and Maya. 
                Payment must be completed before processing your order. Prices are subject to change without notice. 
                Promotional discounts cannot be combined unless explicitly stated.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                4. Refund & Returns Policy
              </h3>
              <p>
                Digital products (game credits, premium accounts) are non-refundable once delivered. For handcrafted items, 
                refunds are available within 7 days of receipt if the product is damaged or significantly different from the description. 
                Please contact our support team with photographic evidence for refund requests.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                5. User Accounts
              </h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials. 
                You agree to notify us immediately of any unauthorized use of your account. 
                Choen is not liable for any loss or damage arising from your failure to protect your account information.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                6. Privacy Policy
              </h3>
              <p>
                We collect and process personal information necessary to fulfill your orders and improve our services. 
                Your data is stored securely and will not be shared with third parties without your consent, except as required by law. 
                We use cookies to enhance your browsing experience. By using our site, you consent to our data practices.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                7. Delivery
              </h3>
              <p>
                Digital products are delivered instantly upon payment confirmation. Handcrafted items are delivered within 3-7 business days 
                depending on your location. Same-day delivery may be available for select products in Metro Manila. 
                Delivery fees vary by location and will be displayed at checkout.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                8. Prohibited Uses
              </h3>
              <p>
                You may not use our services for any illegal or unauthorized purpose. This includes but is not limited to: 
                fraudulent transactions, unauthorized reselling of our products, attempting to access other users' accounts, 
                or any activity that violates applicable laws or regulations.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                9. Limitation of Liability
              </h3>
              <p>
                Choen shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. 
                Our total liability is limited to the amount you paid for the product or service in question.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                10. Changes to Terms
              </h3>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. 
                Your continued use of our services after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#022413' }}>
                11. Contact Information
              </h3>
              <p>
                For questions about these Terms & Policy, please contact us at:<br/>
                Email: choen@gmail.com<br/>
                Phone: +63 956 741 6946<br/>
                Facebook: https://www.facebook.com/choen.lobby
              </p>
            </section>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-md transition-all hover:shadow-md"
            style={{
              backgroundColor: '#3E996C',
              color: 'white',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}
          >
            CONFIRM
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
