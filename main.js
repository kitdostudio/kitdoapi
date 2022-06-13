let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let userRouter = require('./router/userRouter')
//let userRouter = require('./router')
let api = require('./router/api');
let dl = require('./router/download');
/////////////////////////////
app.use(bodyParser.json({
    type: 'application/json'
}));

app.use('/user', userRouter);

app.get('/', function (req, res) {
    return res.send('WELCOME TO KITDOMMO');
});
app.get('/demon', function (req, res) {
    res.sendFile('/home/kitdostudio.com/public_html/Demon_System.exe');
})
app.get('/demoncare', function (req, res) {
    res.sendFile('/home/kitdostudio.com/public_html/Demon_Care.exe');
})
app.get('/download', function (req, res) {
    res.download('/home/kitdostudio.com/public_html/Demon_System.exe', 'Demon_System.exe');
})
app.use('/api', api);
//app.use('/download', download);
///////////////////////process.env.PORT
app.listen(3000, function () {
    console.log('listening server');
});