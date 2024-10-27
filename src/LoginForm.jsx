import { useState } from "react";


function LoginForm({ onLogin }) {
  const formItems = ["username", "password"];

  const [localUser, setLocalUser] = useState({
    username: "John",
    password: "Doe",
  });

  function handleChange() {}

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(localUser);
    setLocalUser({
      username: "",
      password: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {formItems.map((item) => (
        <div key={item}>
          <label htmlFor={item}>{item}</label>
          <input
            type="text"
            name={item}
            value={localUser[item]}
            placeholder={`${item}...`}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className="button-submit">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
