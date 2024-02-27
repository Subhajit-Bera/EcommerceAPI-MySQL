const express = require("express");
const db =require("./config/db");
const app = express();
app.use(express.json());

//Connection to MySql database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});






// Example route
app.get('/', (req, res) => {
    connection.query('SELECT * FROM student', (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });
});



const user = require("./routes/userRoute");
const category = require("./routes/categoriesRoute");
app.use("/api/v1", user);
app.use("/api/v1", category);







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});