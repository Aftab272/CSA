import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Creative Stack Agency ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, phone number, etc.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>
          We use personal information collected via our website for a variety of business purposes described below:
        </p>
        <ul>
          <li>To facilitate account creation and logon process.</li>
          <li>To send administrative information to you.</li>
          <li>To fulfill and manage your orders.</li>
          <li>To post testimonials with your consent.</li>
          <li>To request feedback and contact you about your use of our website.</li>
        </ul>
      </section>

      <section>
        <h2>4. Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul>
          <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process.</li>
          <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf.</li>
        </ul>
      </section>

      <section>
        <h2>5. Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
          <br />
          <strong>Email:</strong> privacy@creativestack.agency
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
