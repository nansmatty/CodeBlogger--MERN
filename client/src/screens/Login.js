import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { login } from '../actions/userActions';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    showPass ? setPasswordType('text') : setPasswordType('password');

    if (userInfo) {
      history.push('/');
    }
  }, [passwordType, showPass, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login mt-4 pt-5 pb-3">
      <ToastContainer />
      <Container>
        <h2>Sign In</h2>
        <Form onSubmit={submitHandler}>
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
          <Button
            type="submit"
            variant="primary"
            style={{ letterSpacing: '2px' }}>
            LOGIN
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
