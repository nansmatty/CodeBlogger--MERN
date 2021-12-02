import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { POST_COMMENT_CREATE_RESET } from '../constant/postConstants';
import { createComment } from '../actions/postActions';

const CommentForm = ({ id }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successComment } = commentCreate;

  const resetHandler = () => {
    setText('');
  };

  useEffect(() => {
    if (successComment) {
      dispatch({
        type: POST_COMMENT_CREATE_RESET,
      });
    }
  }, [dispatch, successComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(id, text));
    resetHandler();
  };

  return (
    <div className="commentCreateForm">
      <ToastContainer />
      <h5>Comments</h5>
      {userInfo ? (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Control
              as="textarea"
              value={text}
              rows={3}
              placeholder="Write Your Comment"
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            className="btn btn-sm commentBtn">
            SUBMIT
          </Button>
        </Form>
      ) : (
        <h6>
          Please{' '}
          <span>
            <Link to="/login">login</Link>
          </span>{' '}
          to comment on this post
        </h6>
      )}
    </div>
  );
};

export default CommentForm;
