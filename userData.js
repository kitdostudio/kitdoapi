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
   
    add(user){
        this.userdata.push(user);
    }

    has(Username){
        let userName = this.find(Username);
        return userName.length>0;
    }

    update(Username, newinfo){
        let user = this.find(Username);
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