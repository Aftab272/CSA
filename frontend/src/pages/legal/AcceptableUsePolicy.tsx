import React from 'react';
import LegalLayout from './LegalLayout';

const AcceptableUsePolicy: React.FC = () => {
  return (
    <LegalLayout title="Acceptable Use Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Acceptable Use Policy ("AUP") outlines the rules governing the use of our services and website. By using our site, you agree to abide by this policy.
        </p>
      </section>

      <section>
        <h2>2. Prohibited Uses</h2>
        <p>
          You may use our site only for lawful purposes. You may not use our site:
        </p>
        <ul>
          <li>In any way that breaches any applicable local, national or international law or regulation.</li>
          <li>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.</li>
          <li>For the purpose of harming or attempting to harm minors in any way.</li>
          <li>To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material (spam).</li>
        </ul>
      </section>

      <section>
        <h2>3. Content Standards</h2>
        <p>
          These content standards apply to any and all material which you contribute to our site (contributions). Contributions must:
        </p>
        <ul>
          <li>Be accurate (where they state facts).</li>
          <li>Be truly held (where they state opinions).</li>
          <li>Comply with applicable law in any country from which they are posted.</li>
        </ul>
      </section>

      <section>
        <h2>4. Suspension and Termination</h2>
        <p>
          We will determine, in our discretion, whether there has been a breach of this AUP through your use of our site. When a breach of this policy has occurred, we may take such action as we deem appropriate, including immediate termination of your access to our services.
        </p>
      </section>

      <section>
        <h2>5. Changes to the Policy</h2>
        <p>
          We may revise this acceptable use policy at any time by amending this page. You are expected to check this page from time to time to take notice of any changes we make, as they are legally binding on you.
        </p>
      </section>
    </LegalLayout>
  );
};

export default AcceptableUsePolicy;
