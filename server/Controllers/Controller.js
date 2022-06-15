const createJWT = require('../auth/auth').createJWT
const {ValidLogin, ValidRegister} = require("../validator/validate")
const bcrypt = require("bcrypt")
const { User, bookCoures } = require("../Models/index")

module.exports = {
    //Login with createJWT function
    page0: async (req, res) => {
        res.render("../../views/page0.ejs");
    },
    BookCoures: (req, res) => {
        let { couresName, UserName, age, email, accountName, password, time, pay } = req.body
        let users = models.booklist.find({});

        if (users.email === email) {
            res.send("Email already exists")
        }
        if (users.password === password) {
            res.send("Password already exists")
        } else {
            bookCoures.create({
                couresName: couresName,
                UserName: UserName,
                age: age,
                email: email,
                accountName: accountName,
                password: password,
                time: time,
                pay: pay,
                date: new Date().getDay()
            }).then(() => {
                let dummyText = `
                    The ${couresName} coures booked.
                    The pay of this ${couresName} coures is ${pay}$
                    per month.Happy learning!
                `
                res.send(dummyText)
            }).catch(err => {
                res.send(`oops! something went wrong that is ${err.message}`)
            })
        }
    },
    Login: async (req, res) => {
        let {email, password} = req.body;
        let user = User.findOne(req.body)
        let valid = ValidLogin(req.body);
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
                    res.status(200).send(user);
                }
            }
        }
        if (new Date.getDay() - user.date === 30) {
            res.send(`pay ${user.pay} for this months`)
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

                    const hash = await bcrypt.hash(password, 10);
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
