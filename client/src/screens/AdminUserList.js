import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import { deleteUser, listUser } from '../actions/userActions';

const AdminUserList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUser());
    } else {
      history.push('/login');
    }
  }, [userInfo, history, dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="myPosts myUserList mt-4 py-4">
      <ToastContainer />
      <Container>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/profile`}>
                    <Button variant="info" className="btn btn-info">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminUserList;
