import React, { useState } from "react"
import "../../styles/login.css"
import axios from "axios"
import { ValidLogin } from "../../../server/validator/validate"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
        acountName: ""
    })
    setErrors(ValidLogin({ email, password }).errors)
    //handle submit with body email and password
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/api/login", {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data)
            alert("Login success")
        }).catch(err => {
            console.log(err)
            alert("Login fail")
        }
        )
    }   
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <p className="error">{errors.email}</p>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                <p className="error">{errors.password}</p>
                <button>Login</button>
            </form>
        </div>

    )
}
export default Login