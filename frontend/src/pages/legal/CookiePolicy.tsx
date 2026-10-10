import React from 'react';
import LegalLayout from './LegalLayout';

const CookiePolicy: React.FC = () => {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Cookie Policy explains how Creative Stack Agency uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
      </section>

      <section>
        <h2>2. What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
      </section>

      <section>
        <h2>3. Why do we use cookies?</h2>
        <p>
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
        </p>
      </section>

      <section>
        <h2>4. Types of cookies we use</h2>
        <ul>
          <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our website (e.g. security and theme settings).</li>
          <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
          <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used in aggregate form to help us understand how our website is being used (e.g. Google Analytics).</li>
          <li><strong>Advertising and targeting cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests. Third parties, such as <strong>Google AdSense</strong>, may place cookies (such as DoubleClick DART cookies) to serve personalized ads based on your visits to our site and other sites on the web.</li>
        </ul>
      </section>

      <section>
        <h2>5. How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. You can also customize your consent preferences anytime via our Cookie Consent banner.
        </p>
        <p>
          To opt out of personalized Google advertising, you can visit <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Google Ads Settings</a>. For broader industry opt-outs, visit <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">www.aboutads.info</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Your Online Choices</a>.
        </p>
      </section>

      <section>
        <h2>6. Updates to this policy</h2>
        <p>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
        </p>
      </section>
    </LegalLayout>
  );
};

export default CookiePolicy;
