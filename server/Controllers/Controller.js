const { createJWT }= require('../auth/auth')
const {ValidLogin, ValidRegister} = require("../validator/validate")
const bcrypt = require("bcrypt")
const { User } = require("../Models/index")
const JSON_ENV = JSON.parse(require('../config/config.json'))

module.exports = {
    page0: async (req, res) => {
        res.render("views/page0.ejs");
    },
    Login: async (req, res) => {
        let {email, password} = req.query;
        let user = User.findOne(req.query)
        let valid = ValidLogin(req.query);
        if(valid.error){        
            res.status(400).send(valid.errors);
        }
        else{
            const user = await User.findOne({email: email, password: password});
            if(!user){
                res.status(400).send("User not found");
            }
            else{
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    res.status(400).send("Password is incorrect");
                }
                else{
                    document.cookie
                    req.user = user
                    res.status(200).send(user)
                }
            }
        }
        const token = createJWT(user);
        res.status(200).json({token});
    },
    Register: async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(400).send("No data");
        } else {
            let {name, age, email, password, accountName} = req.body;
            const valid = ValidRegister(req.body);
            if(valid.error){

                res.status(400).send(valid.errors);
            }
            else{

                const user = await User.findOne({email: email, password: password, accountName: accountName});
                if(user){

                    res.status(400).send("Email is already used");
                }
                else{

                    const hash = await bcrypt.hash(password, JSON_ENV.HASHING_CB);
                    const newUser = new User({
                        email: email,
                        password: hash,
                        name: name,
                        accountName: accountName,
                        age: age
                    });
                    newUser.save()
                        .then(res.status(200).send("User created"))
                    let token = createJWT(newUser)
                    res.status(200).send(token);
                }
            }
        } 
    }
}