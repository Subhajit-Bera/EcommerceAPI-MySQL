const db = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken=require("../middlewares/generateToken");
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const existingUser = await db.query(checkUserQuery, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(insertUserQuery, [username, email, hashedPassword]);

        res.status(201).json({ 
            message: 'User registered successfully' 
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
      db.query(checkUserQuery, [email], async (error, results) => {
        if (error) {
          console.error('Error logging in:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const user = results[0];
  
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Generate JWT token
        const token = await generateToken({ id: user.id, email: user.email });
        res.json({ 
          id: user.id, 
          username: user.username,
          email: user.email,
          token 
        });
      });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  