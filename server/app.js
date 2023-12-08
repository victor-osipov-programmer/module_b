const express = require('express');
const formData = require("express-form-data");
const path = require('path')
const getUserAccessData = require('./middleware/getUserAccessData.js')
const app = express();

const options = {
  uploadDir: path.resolve('photos')
};

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRouter = require('./routes/user');
const workShiftRouter = require('./routes/work-shift');
const orderRouter = require('./routes/order');

const PORT = process.env.PORT ?? 3000;
const ROOT_PATH = '/api-tort';

app.use(express.json());
app.use(formData.parse(options));
app.use(getUserAccessData);

app.use(ROOT_PATH, loginRouter);
app.use(ROOT_PATH, logoutRouter);
app.use(ROOT_PATH, userRouter);
app.use(ROOT_PATH, workShiftRouter); 
app.use(ROOT_PATH, orderRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});