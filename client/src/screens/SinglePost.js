import { useEffect } from 'react';
import { Badge, Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { dislikePost, likePost, listPostDetails } from '../actions/postActions';
import Category from '../components/Category';
import ReactMarkdown from 'react-markdown';
import { POST_COMMENT_CREATE_RESET } from '../constant/postConstants';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePost = ({ match, history }) => {
	const postId = match.params.id;

	const dispatch = useDispatch();

	const postDetails = useSelector((state) => state.postDetails);
	const { post } = postDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const commentCreate = useSelector((state) => state.commentCreate);
	const { success: successComment } = commentCreate;

	const commentDelete = useSelector((state) => state.commentDelete);
	const { success: successCommentDelete } = commentDelete;

	const postLike = useSelector((state) => state.postLike);
	const { success: successLike } = postLike;

	const postDislike = useSelector((state) => state.postDislike);
	const { success: successDislike } = postDislike;

	useEffect(() => {
		dispatch(listPostDetails(postId));
		if (successComment) {
			dispatch({
				type: POST_COMMENT_CREATE_RESET,
			});
		}
	}, [
		dispatch,
		postId,
		successComment,
		successCommentDelete,
		successLike,
		successDislike,
	]);

	return (
		<div className='pt-5 pb-3'>
			<ToastContainer />
			<Container>
				<Row>
					<Col xs={12} sm={12} md={12}>
						<img
							src={post?.img}
							alt={`${post?.title} pic`}
							className='singlePostImage'
						/>
					</Col>
					<Col xs={12} sm={12} md={12} lg={9} className='singlePostHeading'>
						<h2>{post?.title}</h2>
						<small>Author: </small> <br />
						<small>
							Posted on: {new Date(post?.created_at).toDateString()}
						</small>
						<br />
						{post?.categories?.map((category, index) => (
							<Badge key={index} bg='danger'>
								{category}
							</Badge>
						))}
						<ReactMarkdown className='singlePostDesc mt-1'>
							{post?.desc}
						</ReactMarkdown>
					</Col>
					<Col md={3} className='singlePostCategory'>
						<Category />
					</Col>
					<Col xs={12} sm={12} md={12} lg={9} className='actionBtns'>
						<Button
							className='likeBtn'
							onClick={() =>
								userInfo ? dispatch(likePost(postId)) : history.push('/login')
							}>
							<i className='far fa-thumbs-up'></i> {post?.likes?.length}
						</Button>
						<Button
							className='mx-2 dislikeBtn'
							onClick={() =>
								userInfo
									? dispatch(dislikePost(postId))
									: history.push('/login')
							}>
							<i className='far fa-thumbs-down'></i> {post?.disLikes?.length}
						</Button>
					</Col>
					<Col xs={12} sm={12} md={12} lg={9}>
						<CommentForm id={postId} />
						{post?.comments?.map((comment) => (
							<CommentList
								key={comment._id}
								comment={comment}
								postId={postId}
							/>
						))}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SinglePost;
