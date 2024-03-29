import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    return (
        <>
            <Header />
            <main clasName='py-3'>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
}
