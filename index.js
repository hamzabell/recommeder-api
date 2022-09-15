const express = require('express');
const cors = require('cors');
const bodyParser =  require('body-parser');
const GetClosest = require('./src/utils/GetClosest');
const { getNode } = require('./src/utils/GetNode');
const { createGraph }  = require('./src')

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


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running!')
})


