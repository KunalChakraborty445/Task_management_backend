import { config } from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const app = express();
config({path : './.env'});

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// app.use('/',(req ,res) =>{
//     res.send('API working');
// })

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



