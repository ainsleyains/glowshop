import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

export default function Product({ product }) {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant='top'
                />
            </Link>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title
                        as='div'
                        className='product-title'
                    >
                        {product.name}
                    </Card.Title>
                    <Card.Text as='div'>
                        {/* <Rating
                            value={product.rating}
                            text={`${product.numReviews}reviews`}
                        /> */}
                    </Card.Text>
                    <Card.Text as='h6'>
                        $ {new Intl.NumberFormat('en-US').format(product.price)}
                    </Card.Text>
                </a>
            </Card.Body>
        </Card>
    );
}
