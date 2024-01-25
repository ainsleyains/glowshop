import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

export default function Home() {
    return (
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
    );
}
