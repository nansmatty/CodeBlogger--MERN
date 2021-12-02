import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../actions/postActions';
import Banner from '../components/Banner';
import SearchBox from '../components/SearchBox';
import Post from '../components/Post';
import Paginate from '../components/Paginate';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

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

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
  }, [
    dispatch,
    pageNumber,
    keyword,
    deleteSuccess,
    successCreate,
    successUpdate,
  ]);

  return (
    <div>
      <ToastContainer />
      {!keyword && <Banner />}
      <div className="my-3">
        <Container id="posts">
          <SearchBox />
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
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
