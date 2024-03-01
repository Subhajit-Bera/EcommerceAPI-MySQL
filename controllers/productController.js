const db = require("../config/db");

exports.addProduct = async (req, res) => {
    const { title, price, description, stock, category_id } = req.body;

    try {
        // Insert product into database
        const insertProductQuery = 'INSERT INTO products (title, price, description,stock, category_id) VALUES (?, ?, ?,?, ?)';
        await db.query(insertProductQuery, [title, price, description, stock, category_id]);

        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // Query to fetch all products
        const query = 'SELECT * FROM products';
        await db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching categories:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Extract category data from query results
            const products = results.map(product => ({
                id: product.id,
                name: product.title,
                price: product.price,
                description: product.description,
                availability: product.availability,
                stock: product.stock,
                category_id: product.category_id
            }));

            res.json(products);
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getProductById = async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Query to fetch product by ID
      const query = 'SELECT * FROM products WHERE id = ?';
      await db.query(query, [productId], (error, results) => {
        if (error) {
          console.error('Error fetching product:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        const product = results[0];
  
        const detailedProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          availability: product.availability,
          stock: product.stock,
          category_id: product.category_id
        };
  
        res.json(detailedProduct);
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };