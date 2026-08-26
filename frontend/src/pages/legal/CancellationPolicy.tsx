import React from 'react';
import LegalLayout from './LegalLayout';

const CancellationPolicy: React.FC = () => {
  return (
    <LegalLayout title="Cancellation Policy" lastUpdated="July 17, 2026">
      <section>
        <h2>1. Service Cancellation</h2>
        <p>
          Clients may request to cancel ongoing services at any time. To ensure a smooth transition and proper project closure, we require a formal written notice of cancellation via email to your primary contact at Creative Stack Agency.
        </p>
      </section>

      <section>
        <h2>2. Notice Period</h2>
        <p>
          For long-term contracts and retainer services, we typically require a 30-day notice period for cancellation. This allows us to finalize any pending tasks and provide you with all necessary project hand-over documentation.
        </p>
      </section>

      <section>
        <h2>3. Outstanding Payments</h2>
        <p>
          Upon cancellation, all outstanding invoices for work performed up to the cancellation date must be paid in full. We will provide a final invoice reflecting the pro-rated amount for the current billing cycle and any additional agreed-upon expenses.
        </p>
      </section>

      <section>
        <h2>4. Subscription Cancellation</h2>
        <p>
          You can cancel your subscription at any time through your account settings or by contacting our support team. Cancellation will take effect at the end of the current billing period, and no further charges will be applied.
        </p>
      </section>

      <section>
        <h2>5. Project Termination by Us</h2>
        <p>
          We reserve the right to suspend or terminate services if there is a breach of our Terms & Conditions, including non-payment of invoices. In such cases, we will provide written notice and an opportunity to rectify the situation before termination.
        </p>
      </section>

      <section>
        <h2>6. Effects of Cancellation</h2>
        <p>
          Upon cancellation, all licenses granted for the use of our proprietary tools may be revoked, depending on the terms of your specific agreement. You will, however, retain ownership of all custom-developed assets for which full payment has been received.
        </p>
      </section>
    </LegalLayout>
  );
};

export default CancellationPolicy;
