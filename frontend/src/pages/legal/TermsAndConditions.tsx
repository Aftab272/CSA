import React from 'react';
import LegalLayout from './LegalLayout';

const TermsAndConditions: React.FC = () => {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section>
        <h2>2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website are owned or controlled by us.
        </p>
      </section>

      <section>
        <h2>3. User Representations</h2>
        <p>
          By using the website, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms and Conditions; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the website through automated or non-human means.
        </p>
      </section>

      <section>
        <h2>4. Prohibited Activities</h2>
        <p>
          You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the website.
        </p>
      </section>

      <section>
        <h2>6. Governing Law</h2>
        <p>
          These Terms and Conditions and your use of the website are governed by and construed in accordance with the laws of the jurisdiction in which Creative Stack Agency operates.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          In order to resolve a complaint regarding the website or to receive further information regarding use of the website, please contact us at:
          <br />
          <strong>Email:</strong> legal@creativestack.agency
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsAndConditions;
