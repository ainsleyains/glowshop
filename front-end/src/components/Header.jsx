import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/glow.png';
export default function Header() {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header className=''>
            <Navbar
                bg='light'
                variant='light'
                expand='md'
                collapseOnSelect
            >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src={logo}
                                height='50'
                                alt='logo'
                                loading='lazy'
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart size={25} />
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg='success'
                                            style={{ marginLeft: '-5px' }}
                                        >
                                            {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser size={25} />
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
