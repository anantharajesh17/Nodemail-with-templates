const express = require('express');
const appRoute = require('./routes/routes')

const app = express();
const PORT = 5003;

app.use(express.json());


app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
