const db = require("../config/db");


//Public 
//GET: api/v1/categories
exports. getAllCategories = async (req, res) => {
    try {
      // Query to fetch all categories
      const query = 'SELECT * FROM categories';
      await db.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching categories:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        
        // Extract category data from query results
        const categories = results.map(category => ({
          id:category.id,
          name: category.name
        }));
        
        res.json(categories);
      });
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
};

//Private + Admin 
//POST :api/v1/categories/addCategory
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if category with the same name already exists
        const checkCategoryQuery = 'SELECT * FROM categories WHERE name = ?';
        const existingCategory = await db.query(checkCategoryQuery, [name]);
        if (existingCategory.length > 0) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Insert category into database
        const insertCategoryQuery = 'INSERT INTO categories (name) VALUES (?)';
        await db.query(insertCategoryQuery, [name]);

        res.status(201).json({ message: 'Category added successfully' });
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
