const db = require("../config/db");

// exports.addToCart = async (req, res) => {
//     try {
//         const { product_id, quantity } = req.body;
//         const user_id = req.userAuthId.id; // Get user_id from decoded token
//         // console.log(user_id)
//         // Check if the product exists
//         const productQuery = 'SELECT * FROM products WHERE id = ?';
//         await db.query(productQuery, [product_id], (error, results) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }

//             const stock = results[0].stock;
//             if (stock < quantity) {
//                 return res.status(400).json({ message: 'Insufficient stock' });

//             }
//         });


//         // Check if the product already exists in the user's cart
//         const existingCartItemQuery = 'SELECT * FROM carts WHERE user_id = ? AND product_id = ?';
//         await db.query(existingCartItemQuery, [user_id, product_id], async (error, results) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }
//             // If the product exists in the cart, update the quantity
//             if (results) {
//                 const updatedQuantity = results.quantity + quantity;
//                 const updateCartItemQuery = 'UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?';
//                 await db.query(updateCartItemQuery, [updatedQuantity, user_id, product_id]);
//                 return res.status(200).json({ message: 'Quantity updated in cart' });
//             } else {
//                 // If the product doesn't exist in the cart, add it
//                 const addToCartQuery = 'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)';
//                 await db.query(addToCartQuery, [user_id, product_id, quantity]);
//                 return res.status(201).json({ message: 'Product added to cart' });
//             }
//         })
//         // const existingCartItem = await db.query(existingCartItemQuery, [user_id, product_id]);
//         // if (existingCartItem) {
//         //     // If the product exists in the cart, update the quantity
//         //     const updatedQuantity = existingCartItem.quantity + quantity;
//         //     const updateCartItemQuery = 'UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?';
//         //     await db.query(updateCartItemQuery, [updatedQuantity, user_id, product_id]);
//         //     return res.status(200).json({ message: 'Quantity updated in cart' });
//         // } else {
//         //     // If the product doesn't exist in the cart, add it
//         //     const addToCartQuery = 'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)';
//         //     await db.query(addToCartQuery, [user_id, product_id, quantity]);
//         //     return res.status(201).json({ message: 'Product added to cart' });
//         // }
//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Controller function to add item to cart
// Controller function to add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.userAuthId.id;

        // Query to fetch product by ID
        const getProductQuery = 'SELECT * FROM products WHERE id = ?';
        db.query(getProductQuery, [product_id], async (error, results) => {
            if (error) {
                console.error('Error fetching product:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const product = results[0];

            // Check if the requested quantity exceeds available stock
            if (product.stock < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }

            // Query to check if the product already exists in the user's cart
            const checkCartItemQuery = 'SELECT * FROM carts WHERE user_id = ? AND product_id = ?';
            db.query(checkCartItemQuery, [user_id, product_id], async (error, results) => {
                if (error) {
                    console.error('Error checking cart item:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (results.length === 0) {
                    // Insert the product into the cart
                    const insertCartItemQuery = 'INSERT INTO carts (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
                    db.query(insertCartItemQuery, [user_id, product_id, quantity, product.price], (error, results) => {
                        if (error) {
                            console.error('Error adding item to cart:', error);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        res.status(201).json({ message: 'Product added to cart' });
                    });
                } else {
                    // Update the quantity of the existing product in the cart
                    const existingCartItem = results[0];
                    const updatedQuantity = existingCartItem.quantity + quantity;
                    const updateCartItemQuery = 'UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?';
                    db.query(updateCartItemQuery, [updatedQuantity, user_id, product_id], (error, results) => {
                        if (error) {
                            console.error('Error updating cart item:', error);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        res.status(200).json({ message: 'Quantity updated in cart' });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

