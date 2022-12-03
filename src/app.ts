import express from 'express';
import ErrorHandle from './Middlewares/ErrorHandle';
import routes from './Routes/Routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandle.handle);

export default app;
