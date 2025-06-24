import { useQuery } from '@tanstack/react-query';
import Sidebar from '../../components/Sidebar';
import SemesterColumn from './SemesterColumn';
import { fetchUserPlan } from '../../lib/api';

export default function DegreePlanner() {
  const { data: userPlan, isLoading, error } = useQuery({
    queryKey: ['userPlan'],
    queryFn: fetchUserPlan
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error loading plan</div>;

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3">
          <Sidebar courses={userPlan.availableCourses} />
        </div>
        <div className="col-md-9">
          <div className="row">
            {userPlan.semesters.map((semester) => (
              <div className="col-md-6 mb-4" key={semester.id}>
                <SemesterColumn semester={semester} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}