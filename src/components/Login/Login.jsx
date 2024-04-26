import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  
  const [loading, setLoading] = useState(false)


const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch(err){
        console.log(err);
        toast.error(err);
    } finally {
        setLoading(false)
    }
};

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const imgUrl = await upload(avatar.file)
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        avatar: imgUrl,
        email,
        id: res.user.uid,
        blocked: []
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });

      toast.success("Account created you can login now!")
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file"> Upload an image</label>
          <img
            src={avatar.url || "./avatar.png"}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              alignItems: "center",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            onChange={handleAvatar}
            id="file"
            style={{ display: "none" }}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
