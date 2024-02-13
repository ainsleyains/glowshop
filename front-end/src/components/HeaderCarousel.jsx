import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

export default function HeaderCarousel() {
    const { data: products, isLoading, error } = useGetTopProductsQuery();
    console.log(products);
    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel
            pause='hover'
            className=' mb-4'
        >
            {products.map((product) => (
                <Carousel.Item key={product.id}>
                    <Link to={`/product/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width='100%'
                            height='600px'
                            style={{ objectFit: 'cover', objectPosition: '25% 85%' }}
                        />
                        <Carousel.Caption className='carousel-caption'>
                            <h4>{product.name}</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
