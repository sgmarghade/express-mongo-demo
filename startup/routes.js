const coursesRouter = require("../routes/courses");
const genresRouter = require("../routes/genres");
const customersRouter = require("../routes/customers");
const authorRouter = require("../routes/authors");
const movieRouter = require("../routes/movies");
const rentalRouter = require("../routes/rentals");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const homeRouter = require("../routes/home");
module.exports = function (app) {
    app.use('/api/courses',coursesRouter);
    app.use('/api/genres',genresRouter);
    app.use('/api/customers', customersRouter);
    app.use('/api/authors', authorRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/',homeRouter);
}