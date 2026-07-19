import React from 'react';
import LegalLayout from './LegalLayout';

const RefundPolicy: React.FC = () => {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. General Policy</h2>
        <p>
          At Creative Stack Agency, we strive for excellence and customer satisfaction. However, due to the nature of our digital services and products, we have a specific refund policy that you should be aware of.
        </p>
      </section>

      <section>
        <h2>2. Service Refunds</h2>
        <p>
          For our customized services (web development, design, marketing), refunds are handled on a case-by-case basis. Generally, once work has commenced on a project, the initial deposit is non-refundable. If you are dissatisfied with the progress, please contact your project manager to discuss potential resolutions.
        </p>
      </section>

      <section>
        <h2>3. Digital Products</h2>
        <p>
          Since our digital products are non-tangible and irrevocable once accessed or downloaded, we do not typically issue refunds once the order is confirmed and the product is sent. We recommend contacting us for assistance if you experience any issues receiving or downloading our products.
        </p>
      </section>

      <section>
        <h2>4. Subscription Services</h2>
        <p>
          For subscription-based services, you may cancel at any time. Refunds for the current billing cycle are generally not provided, but you will retain access to the service until the end of the paid period.
        </p>
      </section>

      <section>
        <h2>5. Requesting a Refund</h2>
        <p>
          To request a refund or discuss a billing issue, please email our support team at billing@creativestack.agency with your order details and the reason for your request.
        </p>
      </section>

      <section>
        <h2>6. Exceptions</h2>
        <p>
          Exceptions to this policy may be made if required by local law or in cases of clear technical failure on our part that prevents the use of the service or product.
        </p>
      </section>
    </LegalLayout>
  );
};

export default RefundPolicy;
