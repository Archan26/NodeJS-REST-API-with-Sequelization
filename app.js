const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const Books = require('./models/books');
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

Books.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

(async () => {
    await sequelize.sync().then(result => {
        // console.log(result);
        app.listen(port, () =>
            console.log("Listening on port..." + port + "\n")
        );
    }).catch(err => {
        console.log(err);
    });;
})();