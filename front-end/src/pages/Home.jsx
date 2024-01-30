import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function Home() {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data.message || error.error}</Message>
            ) : (
                <>
                    <h1>Latest Product</h1>
                    <Row>
                        {products.map((el) => (
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
                </>
            )}
        </>
    );
}
