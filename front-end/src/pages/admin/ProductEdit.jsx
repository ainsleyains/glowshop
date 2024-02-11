import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice';

export default function ProductEdit() {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [collection, setCollection] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCollection(product.collection);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            collection,
            description,
            countInStock,
        };

        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Product updated');
            navigate('/admin/productlist');
        }
    };

    return (
        <>
            <Link
                to='/admin/productlist'
                className='btn btn-light my-3'
            >
                <FaArrowLeft /> Back
            </Link>
            <FormContainer>
                <h3>Edit Product</h3>
                {loadingUpdate && <Loader />}

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group
                            controlId='name'
                            className='mb-3'
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId='price'
                            className='mb-3'
                        >
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* image input */}

                        <Form.Group
                            controlId='collection'
                            className='mb-3'
                        >
                            <Form.Label>Collection</Form.Label>
                            <Form.Control
                                type='text'
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId='description'
                            className='mb-3 '
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId='countInStock'
                            className='mb-3'
                        >
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}
