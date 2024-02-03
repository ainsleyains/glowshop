import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function SubmitHandler(e) {
        e.preverntDefault();
    }

    return (
        <FormContainer>
            <h1 className='mt-4'>Sign In</h1>
            <p>Please sign in to your Glow Account.</p>
            <Form onSubmit={SubmitHandler}>
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
                >
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to='/register'>
                        Create an Account <FaAngleRight />
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}
