import { useState } from "react";
import "./login.css";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back</h2>
                <form>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="email"/>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Create an Account</h2>
                <form>
                    <label htmlFor="file"> {">"} Upload an image</label>
                    <img src={avatar.url || "./avatar.png"} alt="" style={{width: "50px", height: "50px", borderRadius:"50%", alignItems: "center", objectFit: "cover"}} />
                    <input type="file" onChange={handleAvatar} id="file" style={{display:"none"}}/>
                    <input type="text" placeholder="Username" name="userName"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="email"/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;