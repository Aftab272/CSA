import Team from '../components/Team';
import PageShell from './PageShell';

export default function TeamPage() {
  return (
    <PageShell
      title="Team | Creative Stack Agency"
      description="Meet the people behind Creative Stack Agency."
    >
      <Team />
    </PageShell>
  );
}
