import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Fetching functions
const fetchSchools = async () => {
  const res = await fetch('/api/schools');
  return res.json();
};
const fetchMajors = async () => {
  const res = await fetch('/api/majors');
  return res.json();
};
const fetchMinors = async () => {
  const res = await fetch('/api/minors');
  return res.json();
};

export default function CreatePlanPage() {
  const [planName, setPlanName] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [majorsInput, setMajorsInput] = useState(['']); // input strings
  const [selectedMajors, setSelectedMajors] = useState([]); // selected IDs
  const [minorsInput, setMinorsInput] = useState(['']);
  const [selectedMinors, setSelectedMinors] = useState([]);

  const navigate = useNavigate();

  const { data: schools = [] } = useQuery({ queryKey: ['schools'], queryFn: fetchSchools });
  const { data: majors = [] } = useQuery({ queryKey: ['majors'], queryFn: fetchMajors });
  const { data: minors = [] } = useQuery({ queryKey: ['minors'], queryFn: fetchMinors });

  const createPlan = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch('/api/create-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      return res.json();
    },
    onSuccess: (data) => navigate(`/planner/${data.planId}`),
  });

  const handleAddMajorField = () => setMajorsInput([...majorsInput, '']);
  const handleAddMinorField = () => setMinorsInput([...minorsInput, '']);

  const handleSelectMajor = (index, majorId) => {
    if (!selectedMajors.includes(majorId)) {
      setSelectedMajors([...selectedMajors, majorId]);
      const updated = [...majorsInput];
      updated[index] = '';
      setMajorsInput(updated);
    }
  };

  const handleSelectMinor = (index, minorId) => {
    if (!selectedMinors.includes(minorId)) {
      setSelectedMinors([...selectedMinors, minorId]);
      const updated = [...minorsInput];
      updated[index] = '';
      setMinorsInput(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!planName || !selectedSchool || selectedMajors.length === 0) return;
    createPlan.mutate({
      planName,
      schoolId: selectedSchool,
      majorIds: selectedMajors,
      minorIds: selectedMinors,
    });
  };

  return (
    <Container className="py-4">
      <h2>Create New Degree Plan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Plan Name</Form.Label>
          <Form.Control
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>School</Form.Label>
          <Form.Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
          >
            <option value="">Select a School</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Label>Majors</Form.Label>
            {majorsInput.map((input, idx) => {
              const filtered = majors.filter(m =>
                m.name.toLowerCase().includes(input.toLowerCase()) &&
                !selectedMajors.includes(m.id)
              );
              return (
                <div key={idx} className="mb-3 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Search major..."
                    value={input}
                    onChange={(e) => {
                      const newInputs = [...majorsInput];
                      newInputs[idx] = e.target.value;
                      setMajorsInput(newInputs);
                    }}
                    required
                  />
                  {input && filtered.length > 0 && (
                    <ListGroup className="position-absolute w-100 z-1" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {filtered.map(m => (
                        <ListGroup.Item
                          key={m.id}
                          action
                          onClick={() => handleSelectMajor(idx, m.id)}
                        >
                          {m.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>
              );
            })}
            <Button size="sm" variant="secondary" onClick={handleAddMajorField}>
              ➕ Add Another Major
            </Button>
          </Col>

          <Col md={6}>
            <Form.Label>Minors</Form.Label>
            {minorsInput.map((input, idx) => {
              const filtered = minors.filter(m =>
                m.name.toLowerCase().includes(input.toLowerCase()) &&
                !selectedMinors.includes(m.id)
              );
              return (
                <div key={idx} className="mb-3 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Search minor..."
                    value={input}
                    onChange={(e) => {
                      const newInputs = [...minorsInput];
                      newInputs[idx] = e.target.value;
                      setMinorsInput(newInputs);
                    }}
                  />
                  {input && filtered.length > 0 && (
                    <ListGroup className="position-absolute w-100 z-1" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {filtered.map(m => (
                        <ListGroup.Item
                          key={m.id}
                          action
                          onClick={() => handleSelectMinor(idx, m.id)}
                        >
                          {m.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>
              );
            })}
            <Button size="sm" variant="secondary" onClick={handleAddMinorField}>
              ➕ Add Another Minor
            </Button>
          </Col>
        </Row>

        <div className="mt-4">
          <Button type="submit" disabled={createPlan.isPending}>
            {createPlan.isPending ? 'Creating...' : 'Create Plan'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}