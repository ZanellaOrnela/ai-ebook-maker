import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const server = express();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
