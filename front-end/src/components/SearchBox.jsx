import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <Form
            onSubmit={submitHandler}
            className='d-flex'
        >
            <Form.Control
                type='text'
                name='q'
                value={keyword}
                placeholder='Search products...'
                className='mr-sm-2 ml-sm-5'
                onChange={(e) => setKeyword(e.target.value)}
            ></Form.Control>
            <Button
                type='submit'
                className='p-2'
                variant='outline-secondary'
            >
                <FaSearch />
            </Button>
        </Form>
    );
}
