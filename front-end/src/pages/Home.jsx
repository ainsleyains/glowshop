import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';

export default function Home() {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <div>{error?.data.message || error.error}</div>
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
