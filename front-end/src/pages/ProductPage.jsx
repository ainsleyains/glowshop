import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

export default function ProductPage() {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    function addToCartHandler() {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(comment);

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

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
                <>
                    <Meta title={product.name} />
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
                                        {/* <Col>${product.price}</Col> */}
                                        <Col>
                                            ${new Intl.NumberFormat('en-US').format(product.price)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <stong>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
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
                    <Row className='review'>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h6>Write a review</h6>

                                    {loadingProductReview && <Loader />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group
                                                className='my-2'
                                                controlId='rating'
                                            >
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    required
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Very Unsatisfied</option>
                                                    <option value='2'>2 - Unsatisfied</option>
                                                    <option value='3'>3 - Neutral</option>
                                                    <option value='4'>4 - Satisfied</option>
                                                    <option value='5'>5 - Very Satisfied</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                className='my-2'
                                                controlId='comment'
                                            >
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    required
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>log in</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}
