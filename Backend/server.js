const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());

const productsFilePath = path.join(__dirname, 'products.json');

app.get('/api/products', async (req, res) => {
  try {
    const productsData = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products.filter(product => product.amount > 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.post('/api/purchase', async (req, res) => {
  try {
    const { cart } = req.body;

    const productsData = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'));
    cart.forEach(({ product, quantity }) => {
      const existingProduct = productsData.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.amount -= quantity;
      }
    });

    await fs.writeFile(productsFilePath, JSON.stringify(productsData, null, 2));

    res.json(productsData.products.filter(product => product.amount > 0));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing purchase' });
  }
});

app.post('/api/add-product', async (req, res) => {
  try {
    const { newProduct } = req.body;

    const productsData = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'));
    const maxId = productsData.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    const newId = maxId + 1;

    const productWithId = { ...newProduct, id: newId };
    productsData.products.push(productWithId);

    await fs.writeFile(productsFilePath, JSON.stringify(productsData, null, 2));

    res.json(productsData.products.filter(product => product.amount > 0));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});