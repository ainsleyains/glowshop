import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash, FaAngleLeft } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };
    return (
        <>
            {cartItems.length > 0 && (
                <Link
                    className='btn  my-3'
                    to='/'
                >
                    <FaAngleLeft /> Continue Browsing
                </Link>
            )}
            <Row>
                <Col md={8}>
                    <h1 style={{ marginBottom: '20px', marginTop: '10px' }}>Shopping Bag </h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your shopping bag is empty.
                            <br />
                            <Button
                                className='btn btn-light'
                                style={{ marginTop: '30px' }}
                            >
                                <Link to='/'>Shop Most Popular</Link>
                            </Button>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            $
                                            {item.price.toLocaleString(undefined, {
                                                maximumFractionDigits: 2,
                                            })}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    addToCartHandler(item, Number(e.target.value))
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((el) => (
                                                    <option
                                                        key={el + 1}
                                                        value={el + 1}
                                                    >
                                                        {el + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                                <h6>
                                    Subtotal $
                                    {cartItems
                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                        .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </h6>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                >
                                    Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
