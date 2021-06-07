class ListToken{
    constructor(){
        this.userdata  = require('./ListTokenOn.json');
    }
    
    all(){
        return this.userdata;
    }
    findtoken(Token){
        return this.userdata.filter(u => u.token === Token);
    }
    find(userName){
        return this.userdata.filter(u => u.username === userName);
    }
   
    add(userName,Token){
        this.userdata.push({
            'username' : userName,
            'token': Token
        });
    }
    has_user(userName){
        let username = this.find(userName);
        if(username.length>0) {
            return true;
        }
        else{
            return false;
        }
    }
    has_token(Token){
        let username = this.findtoken(Token);
        if(username.length>0) {
            return true;
        }
        else{
            return false;
        }
       
    }
    update(Username, Token){
        let user = this.find(Username);
        if(user<1){
            return false;
        }
        let newinfo = {username :Username,token: Token};

        let olddata  = user.pop();
        let newdata = Object.assign(olddata,newinfo);
        let olddatalist = this.userdata.filter(u => u.username !== Username);

        this.userdata = [...olddatalist, newdata];
        return true;

    }
    remove(Username){
        this.userdata = this.userdata.filter(u => u.username !== Username);
    }
}

module.exports = ListToken;