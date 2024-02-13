import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { FaArrowLeft } from 'react-icons/fa';
import HeaderCarousel from '../components/HeaderCarousel';

export default function Home() {
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

    return (
        <>
            {!keyword ? (
                <HeaderCarousel />
            ) : (
                <Link
                    to='/'
                    className='btn btn-light my-4'
                >
                    <FaArrowLeft /> Back
                </Link>
            )}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data.message || error.error}</Message>
            ) : (
                <>
                    <h1>Latest Product</h1>
                    <Row>
                        {data.products.map((el) => (
                            <Col
                                key={el._id}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                            >
                                <Product product={el} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
}
