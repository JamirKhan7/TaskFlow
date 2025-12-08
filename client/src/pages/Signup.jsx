import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Wrap data in "user" key to match Rails Strong Params
      await axios.post('/users', { user: formData });
      navigate('/login');
    } catch (err) {
      // Extract error message from Rails response
      const serverErrors = err.response?.data?.errors;
      setError(serverErrors ? serverErrors.join(', ') : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">Create Account</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="first_name" required onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="last_name" required onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required onChange={handleChange} />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading ? 'Creating...' : 'Sign Up'}
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <small className="text-muted">Already have an account? <a href="/login">Log In</a></small>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Signup;
