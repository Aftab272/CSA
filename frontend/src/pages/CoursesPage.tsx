import Courses from '../components/Courses';
import PageShell from './PageShell';

export default function CoursesPage() {
  return (
    <PageShell
      title="Courses | Creative Stack Agency"
      description="Enroll in practical courses and training programs built by experienced industry mentors."
    >
      <Courses />
    </PageShell>
  );
}
