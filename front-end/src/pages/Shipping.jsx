import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Shipping() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };
    return (
        <FormContainer>
            <CheckoutSteps
                step1
                step2
            />
            <h3 className='my-3'>Add your delivery address</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group
                    controlId='address'
                    className='my-2'
                >
                    <Form.Label>Address </Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='city '
                    className='my-2'
                >
                    <Form.Label>City </Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='postalCode'
                    className='my-2'
                >
                    <Form.Label>Postal or zip code </Form.Label>
                    <Form.Control
                        type='text'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='country'
                    className='my-2'
                >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className='my-2'
                >
                    Save and Continue <FaAngleRight />
                </Button>
            </Form>
        </FormContainer>
    );
}
