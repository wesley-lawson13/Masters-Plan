import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { useDrop } from 'react-dnd';
import DraggableCourse from './DraggableCourse';

export default function SemesterQuadrant({ semesterKey, label, courses, onDropCourse }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (course) => {
      console.log('Dropped course:', course, 'into', semesterKey);
      onDropCourse(course, semesterKey);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Card ref={drop} style={{ backgroundColor: isOver ? '#e6f7ff' : 'white' }}>
      <Card.Header>{label}</Card.Header>
      <ListGroup variant="flush" style={{ minHeight: '150px' }}>
        {courses.length === 0 && (
          <ListGroup.Item className="text-muted">Drag a course here</ListGroup.Item>
        )}
        {courses.map((course) => (
          <DraggableCourse key={course.id} course={course} />
        ))}
      </ListGroup>
    </Card>
  );
}