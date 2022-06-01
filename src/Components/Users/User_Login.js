import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const User_Login = ({ setProfile }) => {
  localStorage.clear();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let response;

  useEffect(() => {
    setProfile("");
  }, []);

  const handleSubmit = async () => {
    if ((!username, !password)) {
      alert("Please enter username & password ");
    } else {
      try {
        const fetchData = await fetch(
          "https://taskforum.herokuapp.com/api/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: username,
              password: password,
            }),
          }
        );
        response = await fetchData.json();
        if (response.message === "Successfully logged in") {
          alert("Login successfully");
          localStorage.setItem("user_id", response.id);
          localStorage.setItem("token", response.token);
          navigate("/home");
        }
      } catch (error) {
        alert(`Something went wrong! Error log : ${error}`);
      }
    }
  };
  return (
    <div className="login">
      <div className="content">
        <h1>Login</h1>
        <div className="username">
          <label htmlFor="">User Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit">
          <button onClick={handleSubmit}>SignIn</button>
          <p onClick={() => navigate("logout")}>Register here</p>
        </div>
      </div>
    </div>
  );
};

export default User_Login;
