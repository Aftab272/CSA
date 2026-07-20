import Team from '../components/Team';
import Team4Stack from '../components/Team4Stack';
import Newsletter from '../components/Newsletter';
import PageShell from './PageShell';
import { useAdmin } from '../context/AdminContext';

export default function TeamPage() {
  const { footerData } = useAdmin();

  return (
    <PageShell
      title="Team | Creative Stack Agency"
      description="Meet the people behind Creative Stack Agency and our Team4Stack innovation platform."
    >
      <Team />
      <Team4Stack />
      {footerData.sections.newsletter && <Newsletter />}
    </PageShell>
  );
}
