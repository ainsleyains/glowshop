import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1 className='mt-4'>Sign In</h1>
            <p>Please sign in to your Glow Account.</p>
            <Form onSubmit={submitHandler}>
                <Form.Group
                    controlId='email'
                    className='my-3'
                >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group
                    controlId='password'
                    className='my-3'
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className='mt-2'
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Create an Account <FaAngleRight />
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}
