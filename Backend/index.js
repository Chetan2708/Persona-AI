import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import chatRoutes from './routes/chatRoute.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Chat API');
});
app.use('/chat', chatRoutes);

const PORT = process.env.PORT  || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
