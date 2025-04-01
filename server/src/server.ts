import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;  // This line binds to the correct port

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, '0.0.0.0', () => {  // Explicitly bind to 0.0.0.0
    console.log(`Server is listening on port ${PORT}`);
  });
});