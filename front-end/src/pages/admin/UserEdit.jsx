import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../../slices/usersApiSlice';

export default function UserEdit() {
    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('User Updated!');
            refetch();
            navigate('/admin/userlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <>
            <Link
                to='/admin/userlist'
                className='btn btn-light my-3'
            >
                <FaArrowLeft /> Back
            </Link>
            <FormContainer>
                <h3>Edit User</h3>
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
                            controlId='email'
                            className='mb-3'
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId='isAdmin'
                            className='mb-3'
                        >
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
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
