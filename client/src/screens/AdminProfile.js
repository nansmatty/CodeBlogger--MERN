import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constant/userConstants';

const AdminProfile = ({ history, match }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPic(user.pic);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="adminProfilePage mt-4 py-3">
      <Container>
        <h2>PROFILE</h2>
        <img
          src={pic}
          alt={`${name} profile`}
          className="adminProfilePic mb-2"
        />
        <Form className="adminProfileForm" onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            style={{ letterSpacing: '2px' }}>
            UPDATE
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AdminProfile;
