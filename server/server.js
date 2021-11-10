const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const clientDir = path.join(__dirname, '../build');
app.use(express.static(clientDir));
app.get('*', (req, res) => res.sendFile(clientDir + '/index.html'));

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})