import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { deletePost, listPosts } from '../actions/postActions';
import Paginate from '../components/Paginate';

const AdminPostList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postLists = useSelector((state) => state.postLists);
  const { posts, page, pages } = postLists;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you wish to delete this post')) {
      dispatch(deletePost(id));
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(listPosts('', pageNumber));
  }, [userInfo, history, dispatch, pageNumber, deleteSuccess]);

  return (
    <div className="myPosts mt-4 py-4">
      <ToastContainer />
      <Container>
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
            {posts?.map(({ _id, title, desc, categories }) => (
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
        <Paginate pages={pages} page={page} isAdmin={true} />
      </Container>
    </div>
  );
};

export default AdminPostList;
