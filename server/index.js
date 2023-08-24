import express from 'express';
import dotenv from 'dotenv';
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js'
import { connectDB } from './config/db.js';
import bodyParser from 'body-parser';
import path from 'path'

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended : true}));

dotenv.config();
connectDB();

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// prepare production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}else{
  app.get('/', (req, res) => res.send('please set to production version'));
}


app.listen(process.env.PORT, () => 
  console.log(`Server is running on PORT ${process.env.PORT}`)
)