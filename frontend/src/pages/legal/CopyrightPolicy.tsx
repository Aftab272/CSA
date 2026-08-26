import React from 'react';
import LegalLayout from './LegalLayout';

const CopyrightPolicy: React.FC = () => {
  return (
    <LegalLayout title="Copyright Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Ownership of Content</h2>
        <p>
          All content included on this website, such as text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Creative Stack Agency or its content suppliers and is protected by international copyright laws.
        </p>
      </section>

      <section>
        <h2>2. Use of Site Material</h2>
        <p>
          You may access and use the materials for personal, non-commercial purposes. Any other use, including the reproduction, modification, distribution, transmission, republication, display, or performance of the content on this site is strictly prohibited without our prior written consent.
        </p>
      </section>

      <section>
        <h2>3. Reporting Infringement</h2>
        <p>
          We respect the intellectual property rights of others. If you believe that any material available on or through the site infringes upon any copyright you own or control, please immediately notify us using the contact information provided below.
        </p>
      </section>

      <section>
        <h2>4. DMCA Notice</h2>
        <p>
          In accordance with the Digital Millennium Copyright Act (DMCA) and other applicable law, we have adopted a policy of terminating, in appropriate circumstances and at our sole discretion, users who are deemed to be repeat infringers.
        </p>
      </section>

      <section>
        <h2>5. Content Created for Clients</h2>
        <p>
          Unless otherwise agreed upon in writing, all copyright and other intellectual property rights in work specifically created for clients by Creative Stack Agency will pass to the client upon full payment of the agreed-upon fees.
        </p>
      </section>

      <section>
        <h2>6. Contact Information</h2>
        <p>
          For copyright inquiries, please contact:
          <br />
          <strong>Email:</strong> copyright@creativestack.agency
        </p>
      </section>
    </LegalLayout>
  );
};

export default CopyrightPolicy;
