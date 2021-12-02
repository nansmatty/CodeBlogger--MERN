import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { register } from '../actions/userActions';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  useEffect(() => {
    showPass ? setPasswordType('text') : setPasswordType('password');
    showPass2 ? setPasswordType2('text') : setPasswordType2('password');

    if (userInfo) {
      history.push('/');
    }
  }, [passwordType, showPass, showPass2, userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="register mt-4 py-3">
      <ToastContainer />
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text>
                <i
                  onClick={() => setShowPass(!showPass)}
                  className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}
                  style={{ cursor: 'pointer' }}></i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-2">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType2}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputGroup.Text>
                <i
                  onClick={() => setShowPass2(!showPass2)}
                  className={showPass2 ? 'fas fa-eye-slash' : 'fas fa-eye'}
                  style={{ cursor: 'pointer' }}></i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            style={{ letterSpacing: '2px' }}>
            REGISTER
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
