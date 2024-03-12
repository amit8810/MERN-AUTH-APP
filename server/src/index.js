import { app } from './app.js'
import connectDB from './db/database.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`💻 Server is listening at PORT : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log('MONGODB CONNECTIO FAILED !!! ERROR: ', error)
})