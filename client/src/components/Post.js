import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';

const Post = ({ post }) => {
  return (
    <Card className="p-3" rounded="true">
      <LinkContainer to={`/post/${post._id}`}>
        <Card.Img src={post.img} variant="top" className="cardPostImage" />
      </LinkContainer>

      <Card.Body className="cardBodyStyle">
        <LinkContainer to={`/post/${post._id}`}>
          <Card.Title as="div">
            <strong className="cardPostTitle">{post.title}</strong>
          </Card.Title>
        </LinkContainer>
        <Card.Text as="div">
          <ReactMarkdown className="cardPostDesc">{post.desc}</ReactMarkdown>
        </Card.Text>
      </Card.Body>
      <small className="text-muted">
        Created at: {new Date(post.created_at).toDateString()}
      </small>
    </Card>
  );
};

export default Post;
