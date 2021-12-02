import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../actions/categoryActions';

const Category = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch, successCreate]);

  return (
    <Card className="bg-light" style={{ maxWidth: '15rem' }}>
      <Card.Header className="homepageCategoryHeader ">CATEGORY</Card.Header>
      <Card.Body className="homepageCategoryBody">
        {categories?.map((category) => (
          <Card.Text key={category._id}>{category.name}</Card.Text>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Category;
