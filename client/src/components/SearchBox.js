import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className="searchBoxForm">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Posts..."
        className="searchBox"></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="searchBtn pt-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
