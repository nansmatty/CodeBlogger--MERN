import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../actions/postActions';
import Banner from '../components/Banner';
import Post from '../components/Post';
import Paginate from '../components/Paginate';

const HomePage = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postLists = useSelector((state) => state.postLists);
  const { posts, pages, page } = postLists;

  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  // const [keyword, setKeyword] = useState('');
  // const [listPosts2, setListPosts2] = useState([]);

  useEffect(() => {
    // const filteredPostList = posts?.filter((post) =>
    //   post.title.toLowerCase().includes(keyword.toLowerCase())
    // );

    // setListPosts2(filteredPostList);

    dispatch(listPosts(pageNumber));
  }, [dispatch, pageNumber, deleteSuccess, successCreate, successUpdate]);

  return (
    <div>
      <ToastContainer />
      <Banner />
      <div className="my-3">
        <Container id="posts">
          {/* <Form className="searchBoxForm">
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Posts..."></Form.Control>
          </Form> */}
          <h2 className="mt-3" style={{ letterSpacing: '4px' }}>
            POSTS
          </h2>
          <Row className="mt-3">
            <Col>
              <Row>
                {posts
                  ?.map((post) => (
                    <Col key={post._id} md={3} sm={4}>
                      <Post post={post} />
                    </Col>
                  ))
                  .sort()
                  .reverse()}
              </Row>
              <Paginate pages={pages} page={page} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
