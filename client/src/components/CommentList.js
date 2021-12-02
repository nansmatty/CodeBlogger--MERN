import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../actions/postActions';

const CommentList = ({ comment, postId }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentedUser = comment?.user === userInfo?._id;

  const deleteHandler = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment')) {
      dispatch(deleteComment(postId, commentId));
    }
  };

  return (
    <div className="card p-2 my-2 ">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user d-flex flex-row align-items-center commentList ">
          <img
            src={comment.pic}
            alt={`${comment.name} profile pic`}
            width="40"
            className="user-img rounded-circle m-1"
          />
          <span>
            <small className="commmentName">{comment.name}</small> &nbsp;--
            <small className="commentText">{comment.text}</small>
          </span>
          <br />
        </div>
        <small style={{ letterSpacing: '1px', marginTop: '5px' }}>
          {new Date(comment.date).toDateString()}
        </small>
      </div>
      {commentedUser && (
        <div className="commentDeleteBtn">
          <button
            className="btn btn-sm"
            onClick={() => deleteHandler(comment._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
