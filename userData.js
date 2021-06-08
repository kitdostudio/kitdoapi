class userStore{
    constructor(){
        this.userdata  = require('./user.json');
    }
    
    all(){
        return this.userdata;
    }

    find(Username){
        return this.userdata.filter(u => u.username === Username);
    }
    findkey(Key){
        return this.userdata.filter(u => u.key === Key);
    }
   
    add(user){
        this.userdata.push(user);
    }

    has(Key){
        let keylist = this.findkey(Key);
        return keylist.length>0;
    }

    update(Key, newinfo){
        let user = this.findkey(Key);
        if(user<1){
            return false;
        }

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

module.exports = userStore;