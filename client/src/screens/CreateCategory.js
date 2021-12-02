import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createCategory } from '../actions/categoryActions';
import { CATEGORY_CREATE_RESET } from '../constant/categoryConstants';

const CreateCategory = ({ history }) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const resetHandler = () => {
    setName('');
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/');
    }

    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
  }, [history, userInfo, dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error('Please fill the field!');
    }
    dispatch(createCategory(name));
    resetHandler();
    history.push('/admin/categories');
  };

  return (
    <div className="category mt-4 pt-5 pb-3">
      <ToastContainer />
      <Container>
        <h2>Create Category</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="categoryName" className="  mb-2">
            <Form.Label>category Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter category name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            style={{ letterSpacing: '2px', fontWeight: 'bold' }}>
            CREATE
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateCategory;
