let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let userRouter = require('./router/userRouter')
/////////////////////////////
app.use(bodyParser.json({
    type: 'application/json'
}));

app.use('/user',userRouter);

app.get('/', function(req, res){
    return res.send('WELCOME TO KITDOMMO');
});

// app.get('/user', function(req, res){
//     return res.send(userstore);
// });

///////////////////////
app.listen(3000,function(){
    console.log('server is listening at http://localhost:3000');
});