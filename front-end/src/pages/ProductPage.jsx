import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProductPage() {
    const [qty, setQty] = useState(1);
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    function addToCartHandler() {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }

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
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity:</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                            >
                                                {[...Array(product.countInStock).keys()].map(
                                                    (el) => (
                                                        <option
                                                            key={el + 1}
                                                            value={el + 1}
                                                        >
                                                            {el + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    className='btn-black'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    onClick={addToCartHandler}
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
