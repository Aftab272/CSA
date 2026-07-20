import Courses from '../components/Courses';
import Newsletter from '../components/Newsletter';
import PageShell from './PageShell';
import { useAdmin } from '../context/AdminContext';

export default function CoursesPage() {
  const { footerData } = useAdmin();

  return (
    <PageShell
      title="Courses | Creative Stack Agency"
      description="Enroll in practical courses and training programs built by experienced industry mentors."
    >
      <Courses />
      {footerData.sections.newsletter && <Newsletter />}
    </PageShell>
  );
}
