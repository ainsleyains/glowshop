import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

export default function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
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
