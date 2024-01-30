import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProductPage() {
    const { id: productId } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    return (
        <>
            <Link
                className='btn btn-light my-3'
                to='/'
            >
                <FaArrowLeft /> Back
            </Link>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data.message || error.error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                        />
                    </Col>
                    <Col md={1}></Col>
                    <Col md={4}>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>
                                <p>{product.collection}</p>
                                <h3>{product.name}</h3>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews}reviews`}
                                />
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews}reviews`}
                            />
                        </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <stong>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </stong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-black'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>{product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    {/* <Col md={3}>
                    <Card>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <stong>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </stong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-black'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col> */}
                </Row>
            )}
        </>
    );
}
