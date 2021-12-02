import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { listCategory } from '../actions/categoryActions';
import { listPostDetails, updatePost } from '../actions/postActions';

const EditPost = ({ history, match }) => {
  const postId = match.params.id;

  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories: cateList } = categoryList;

  const postDetails = useSelector((state) => state.postDetails);
  const { post } = postDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!post || post._id !== postId) {
      dispatch(listPostDetails(postId));
    } else {
      setTitle(post.title);
      setDesc(post.desc);
      setCategories(post.categories);
    }
    dispatch(listCategory());
  }, [dispatch, history, userInfo, post, postId]);

  const postPicDetails = (pics) => {
    try {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'codebloggerpostimage');
      data.append('cloud_name', 'dhuej17x0');
      fetch('https://api.cloudinary.com/v1_1/dhuej17x0/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImg(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const resetHandler = () => {
    setTitle('');
    setImg('');
    setCategories('');
    setDesc('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(postId, title, desc, img, categories));
    resetHandler();
    history.push('/my_posts');
  };

  return (
    <div className=" createPost mt-4 py-4">
      <ToastContainer />
      <Container>
        <h2>EDIT POST</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="postTitle" className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postImage" className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept=".jpeg,.png,.jpg"
              onChange={(e) => postPicDetails(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group controlId="category" className="mb-2">
            <Form.Label>Select Categories</Form.Label>
            <br />
            {cateList?.map((cate) => (
              <Form.Check
                inline
                key={cate._id}
                type="checkbox"
                checked={categories.includes(cate.name)}
                label={cate.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategories([...categories, cate.name]);
                  } else {
                    // const index = categories.indexOf
                    setCategories(
                      categories.filter((cat) => cat !== cate.name)
                    );
                  }
                }}
              />
            ))}
          </Form.Group>
          <Form.Group controlId="description" className="mb-2">
            <Form.Label>Description</Form.Label>
            <Alert variant="info">
              Description use markdown formatting [link](http://example.com)
              _italic_ **bold** `code` #heading1.{' '}
              <Alert.Link
                href="https://www.markdownguide.org/cheat-sheet/"
                target="_blank">
                Learn about more formatting
              </Alert.Link>
            </Alert>
            <Form.Control
              as="textarea"
              value={desc}
              placeholder="Enter description"
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
            />
            {desc && (
              <Card className="mt-2">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{desc}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            style={{ letterSpacing: '2px', fontWeight: 'bold' }}>
            UPDATE
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditPost;
