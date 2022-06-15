import React, { useState } from "react"
import "../../styles/style.css"
import axios from "axios"
import { ValidRegister } from "../../../server/validator/validate"

const Register = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [acountName, setAcountName] = useState("")
    const [message, setMessage] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
        accountName: "",
        msg: "Register fail"
    })
    setMessage({
        ...ValidRegister({ name, age, email, password, acountName }).errors,
        msg: "Register fail"
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/api/register", JSON.stringify(
            {
                name: name,
                age: age,
                email: email,
                password: password,
                acountName: acountName
            }
        )).then(res => {
            console.log(res.data)
            let clone = { ...message }
            clone.msg = "😎 Register success"
            setMessage(message)
        }).catch(err => {
            console.log(err)
            message.msg("😭 Register fail")
        }
        )
    }
    return (
        <div>
            <h1>Register</h1>   
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <p className={"error"}>{message.name}</p>
                <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required/>
                <p className={"error"}>{message.age}</p>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <p className={"error"}>{message.email}</p>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                <p className={"error"}>{message.password}</p>
                <input type="text" placeholder="Acount name" value={acountName} onChange={(e) => setAcountName(e.target.value)}  required/>
                <p className={"error"}>{message.acountName}</p>
                <p className={message.msg = "Register successfully completed!" ? "success": "error"}>{message.msg}</p>
                <button>Register</button>
            </form>
        </div>
    )
}


export default Register