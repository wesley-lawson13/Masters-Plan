import { useDrag } from 'react-dnd';
import { Card } from 'react-bootstrap';

export default function DraggableCourse({ course }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COURSE',
    item: {
      id: course.id,
      title: course.title,
      code: course.code,
      credits: course.credits,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className="mb-2"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <Card.Body>
        <strong>{course.code || ''}</strong>: {course.title} <i>({course.credits})</i> 
      </Card.Body>
    </Card>
  );
}