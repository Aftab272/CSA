import React from 'react';
import LegalLayout from './LegalLayout';

const Disclaimer: React.FC = () => {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Website Disclaimer</h2>
        <p>
          The information provided by Creative Stack Agency on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>
      </section>

      <section>
        <h2>2. External Links Disclaimer</h2>
        <p>
          The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
        </p>
      </section>

      <section>
        <h2>3. Professional Disclaimer</h2>
        <p>
          The site cannot and does not contain legal/financial/medical/etc. advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
        </p>
      </section>

      <section>
        <h2>4. Testimonials Disclaimer</h2>
        <p>
          The site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services.
        </p>
      </section>

      <section>
        <h2>5. Errors and Omissions Disclaimer</h2>
        <p>
          While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Creative Stack Agency is not responsible for any errors or omissions, or for the results obtained from the use of this information.
        </p>
      </section>

      <section>
        <h2>6. Logotypes and Trademarks Disclaimer</h2>
        <p>
          All logos and trademarks of third parties referenced on our website are the trademarks and logos of their respective owners. Any inclusion of such trademarks or logos does not imply or constitute any approval, endorsement or sponsorship of Creative Stack Agency by such owners.
        </p>
      </section>
    </LegalLayout>
  );
};

export default Disclaimer;
