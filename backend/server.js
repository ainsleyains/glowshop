import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // config before using port
import products from './data/products.js';
const port = process.env.PORT || 5000;

const app = express();

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((el) => el._id === req.params.id);
    res.json(product);
});

app.listen(port, () => console.log(`server is running on port ${port}`));
