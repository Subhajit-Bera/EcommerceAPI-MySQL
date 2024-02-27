const db = require("../config/db");
exports.isAdmin = async (req, res, next) => {
    // Find the login user by ID
    try {
        const email = req.userAuthId.email;
        const query = 'SELECT isAdmin FROM users WHERE email = ?';
        db.query(query, [email], (error, results) => {
            if (error) {
                console.error('Error checking user role:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return next(new Error('User not found'));
            }

            const isAdmin = results[0].isAdmin;

            // Check if user is admin
            if (isAdmin) {
                next();
            } else {
                next(new Error('Access denied, admin only'));
            }
        });
    } catch (err) {
        console.error('Error checking user role:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
