import React, { useState } from 'react';
// ! To use supabase to Query database
// import { supabase } from '../lib/supabaseClient'; 
import AppNavbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Planner from '../components/Planner';
import { Row, Col, Container } from 'react-bootstrap';

export default function DegreePlanner() {

  const [unplacedCourses, setUnplacedCourses] = useState({
    majors: [{ id: '1', title: "Intro to CS", code: "CS101", credits: 3 }],
    minors: [{ id: '3', title: "Design Thinking", code: "DS101", credits: 3 }],
    core:   [{ id: '2', title: "Writing Seminar", code: "WR101", credits: 3 }],
  });

  const [semesters, setSemesters] = useState({
      FRESH_FALL: [],
      FRESH_SPRING: [],
      SOPH_FALL: [],
      SOPH_SPRING: [],
      JUNIOR_FALL: [],
      JUNIOR_SPRING: [],
      SENIOR_FALL: [],
      SENIOR_SPRING: [],
  });

  const handleDropCourse = (course, semesterKey) => {
    setSemesters((prev) => {
      // Remove course from all semesters
      const updated = Object.fromEntries(
        Object.entries(prev).map(([key, courses]) => [
          key,
          courses.filter(c => c.id !== course.id)
        ])
      );
      updated[semesterKey] = [...updated[semesterKey], course];
      return updated;
    });
  
    setUnplacedCourses((prev) => {
      const updated = { ...prev };
      for (const type of ['majors', 'minors', 'core']) {
        updated[type] = updated[type].filter((c) => c.id !== course.id);
      }
      return updated;
    });
  };

  const handleReturnToSidebar = (course) => {
    setSemesters((prev) => {
      const updated = Object.fromEntries(
        Object.entries(prev).map(([key, courses]) => [
          key,
          courses.filter(c => c.id !== course.id)
        ])
      );
      return updated;
    });

    // Add back to 'majors' by default (you can improve this later with a type)
    setUnplacedCourses((prev) => {
      if (
        prev.majors.some(c => c.id === course.id) ||
        prev.minors.some(c => c.id === course.id) ||
        prev.core.some(c => c.id === course.id)
      ) return prev;

      // For now, just push to majors. Later, use course metadata to determine type.
      return {
        ...prev,
        majors: [...prev.majors, course],
      };
    });
  };

  return (
    <>
      <AppNavbar/>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar plan={unplacedCourses} onDropBackToSidebar={handleReturnToSidebar} />
          </Col>
          <Col md={9}>
            <Planner semesters={semesters} onDropCourse={handleDropCourse} />
          </Col>
        </Row>
      </Container>
    </>
  );
}