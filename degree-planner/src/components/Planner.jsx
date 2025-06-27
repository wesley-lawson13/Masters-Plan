import React from 'react';
import SemesterQuadrant from './SemesterQuadrant';
import { Container, Row, Col } from 'react-bootstrap';

const semesterOrder = [
  'FRESH_FALL', 'FRESH_SPRING',
  'SOPH_FALL', 'SOPH_SPRING',
  'JUNIOR_FALL', 'JUNIOR_SPRING',
  'SENIOR_FALL', 'SENIOR_SPRING'
];

export default function Planner({ semesters, onDropCourse }) {
  return (
    <Container fluid>
      <Row>
        {semesterOrder.map((semesterKey) => (
          <Col md={6} className="mb-4" key={semesterKey}>
            <SemesterQuadrant
              semesterKey={semesterKey}
              label={semesterKey.replace('_', ' ')}
              courses={semesters[semesterKey] || []}
              onDropCourse={onDropCourse}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}