import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    let history = useNavigate()

    const [credentials, setCredentials] = useState({email :"", password: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook---backend.herokuapp.com/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token' ,json.authtoken)
            props.showAlert("Logged In Successfully", "success")
            history("/")


        }else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange =(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='mt-3'>
            <h2>Login tocontinue to iNotebook</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} autoComplete="on" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login