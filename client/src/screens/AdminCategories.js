import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import { deleteCategory, listCategory } from '../actions/categoryActions';
import { CATEGORY_CREATE_RESET } from '../constant/categoryConstants';

const AdminCategories = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/');
    }

    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      dispatch(listCategory());
    }
  }, [history, userInfo, dispatch, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="categories mt-4 py-4">
      <ToastContainer />
      <Container>
        <LinkContainer to="/admin/create_category">
          <Button variant="primary" className="mb-3">
            Create Category
          </Button>
        </LinkContainer>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(category._id)}>
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

export default AdminCategories;
