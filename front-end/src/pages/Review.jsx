import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

export default function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <CheckoutSteps
                step1
                step2
                step3
                step4
            />
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Payment Method</h5>
                            <strong>Method </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Delivery</h5>
                            <p>
                                <strong>Address </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Order Summary</h5>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                {/* <Col md={2}>{item.price}</Col> */}
                                                <Col md={2}>
                                                    $
                                                    {new Intl.NumberFormat('en-US').format(
                                                        item.price
                                                    )}
                                                </Col>
                                                <Col md={1}>{item.qty}</Col>
                                                {/* <Col md={1}>{item.price * item.qty}</Col> */}
                                                <Col md={1}>
                                                    $
                                                    {new Intl.NumberFormat('en-US').format(
                                                        item.price * item.qty
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal</Col>
                                    {/* <Col>{cart.itemsPrice}</Col> */}
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(cart.itemsPrice)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    {/* <Col>{cart.shippingPrice}</Col> */}
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(cart.shippingPrice)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Taxes</Col>
                                    {/* <Col>{cart.taxPrice}</Col> */}
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(cart.taxPrice)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    {/* <Col>{cart.totalPrice}</Col> */}
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(cart.totalPrice)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error.data.message}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Complete Purchase and Pay
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
