import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

export default function Order() {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    console.log(order);
    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger' />
    ) : (
        <>
            <h1 className='mt-4'>Order {order._id}</h1>
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Delivery</h4>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address} {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Summary</h4>
                            {order.orderItems.map((item, index) => (
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
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${new Intl.NumberFormat('en-US').format(item.price)}
                                        </Col>
                                        <Col md={1}>{item.qty}</Col>
                                        <Col md={2}>
                                            ${' '}
                                            {new Intl.NumberFormat('en-US').format(
                                                item.price * item.qty
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal</Col>
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(order.itemsPrice)}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        $
                                        {new Intl.NumberFormat('en-US').format(order.shippingPrice)}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>Taxes</Col>
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(order.taxPrice)}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        ${new Intl.NumberFormat('en-US').format(order.totalPrice)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
