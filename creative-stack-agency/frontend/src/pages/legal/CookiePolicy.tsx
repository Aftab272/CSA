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
          <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our website.</li>
          <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
          <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used.</li>
        </ul>
      </section>

      <section>
        <h2>5. How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
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
