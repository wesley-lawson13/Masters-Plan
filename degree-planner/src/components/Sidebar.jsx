import React from 'react';
import { Accordion, ListGroup, Card } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';

function DraggableCourse({ course }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COURSE',
    item: course,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ListGroup.Item
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
    <strong>{course.code}</strong> {course.title} <i>({course.credits})</i>
    </ListGroup.Item>
  );
}

export default function Sidebar({ plan, onDropBackToSidebar }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (course) => onDropBackToSidebar(course),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const renderCategory = (label, courses) => (
    <Accordion.Item eventKey={label}>
      <Accordion.Header>{label}</Accordion.Header>
      <Accordion.Body>
        <ListGroup variant="flush">
          {courses.length === 0 ? (
            <ListGroup.Item className="text-muted">No courses</ListGroup.Item>
          ) : (
            courses.map((course) => (
              <DraggableCourse key={course.id} course={course} />
            ))
          )}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );

  return (
    <Card
      className="h-100 overflow-auto"
      ref={drop}
      style={{ backgroundColor: isOver ? '#f8f9fa' : 'white' }}
    >
      <Card.Header><strong>Available Courses</strong></Card.Header>
      <Accordion defaultActiveKey="Major Requirements" alwaysOpen>
        {renderCategory('Major Requirements', plan.majors)}
        {renderCategory('Minor Requirements', plan.minors)}
        {renderCategory('Core Requirements', plan.core)}
      </Accordion>
    </Card>
  );
}