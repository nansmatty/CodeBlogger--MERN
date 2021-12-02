import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constant/userConstants';

const Profile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPic(user.pic);
      }
    }

    if (success) {
      toast.success('Profile Updated successfully');
    }
    showPass ? setPasswordType('text') : setPasswordType('password');
    showPass2 ? setPasswordType2('text') : setPasswordType2('password');
  }, [showPass, showPass2, dispatch, history, success, user, userInfo]);

  const postDetails = (pics) => {
    try {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'codebloggerprofileimage');
      data.append('cloud_name', 'dhuej17x0');
      fetch('https://api.cloudinary.com/v1_1/dhuej17x0/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password, pic }));
    }
  };

  return (
    <div className="profilePage mt-4 py-3">
      <ToastContainer />
      <Container>
        <h2>PROFILE</h2>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-2">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordType}
                    placeholder="New Password"
                    value={password}
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
                    placeholder="Confirm Password"
                    value={confirmPassword}
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
              <Form.Group controlId="pic" className="mb-2">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                  accept=".jpeg,.png,.jpg"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                style={{ letterSpacing: '2px' }}>
                UPDATE
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={pic} alt={user.name} className="profilePic" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
