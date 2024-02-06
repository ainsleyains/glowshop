import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/review');
    };

    return (
        <FormContainer className=''>
            <CheckoutSteps
                step1
                step2
                step3
            />
            <h1>Payment Options</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    {/* <Form.Label as='legend'>Payment Options</Form.Label> */}
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='PayPal'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='Credit Card'
                            id='CreditCard'
                            name='paymentMethod'
                            value='CreditCard'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}