import { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import { allPostsByUser, deletePost } from '../actions/postActions';
import {
  POST_CREATE_RESET,
  POST_UPDATE_RESET,
} from '../constant/postConstants';

const MyPosts = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myPostLists = useSelector((state) => state.myPostLists);
  const { posts: myPosts } = myPostLists;

  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you wish to delete this post')) {
      dispatch(deletePost(id));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
    }

    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
    }
    dispatch(allPostsByUser());
  }, [
    history,
    userInfo,
    dispatch,
    deleteSuccess,
    successCreate,
    successUpdate,
  ]);

  return (
    <div className="myPosts mt-4 py-4">
      <ToastContainer />
      <Container>
        <LinkContainer to="/create_post">
          <Button variant="primary" className="mb-3">
            Create Post
          </Button>
        </LinkContainer>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th style={{ width: '25%' }}>Description</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myPosts?.map(({ _id, title, desc, categories }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{title}</td>
                <td className="postDesc">{desc}</td>
                <td>
                  {categories.map((cate, i) => [
                    i > 0 && ', ',
                    <span key="i">{cate}</span>,
                  ])}
                </td>
                <td>
                  <LinkContainer to={`/edit_post/${_id}`}>
                    <Button variant="info" className="btn btn-info">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(_id)}>
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

export default MyPosts;
