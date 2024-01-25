import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/glow.png';
export default function Header() {
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
