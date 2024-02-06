import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Registered Customers</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Registered Customers</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Delivery</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Delivery</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/review'>
                        <Nav.Link>Review</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Review</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}
