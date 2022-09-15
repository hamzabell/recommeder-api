import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import GetClosest from './src/utils/GetClosest';
import { getNode } from './src/utils/GetNode';
import { createGraph }  from './src'

require('dotenv').config();

const app = express();



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', async (req, res) => {
    const { ID } = req.query;

    try {

        const node = await getNode(ID);
        const recommendations = await GetClosest(node);
    
    
        res.status(200).json({
            data: [
                ...recommendations
            ]
    
        })
    } catch(err) {
        res.status(400).json({
            message: 'An Error occurred. ID does not exist'
        })
    }
})


app.get('/build-graph', async (req, res) => {
    try {
        await createGraph();

        res.status(200).json({
            message: 'Graph has been updated'
        })

    } catch (err) {
        res.status(400).json({
            message: 'An Error occured! Please try again'
        })
    }
})


app.listen(process.env.PORT, () => {
    console.log('Server is running!')
})


