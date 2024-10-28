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
    <div className="flex items-center justify-center min-h-screen ">
      <form
        className="w-full max-w-md p-10 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {formItems.map((item) => (
          <div key={item} className="mb-4">
            <label
              htmlFor={item}
              className="block text-gray-700 font-medium text-transform: capitalize"
            >
              {item}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={item === "password" ? "password" : "text"}
              name={item}
              value={localUser[item]}
              placeholder={`${item}...`}
              onChange={handleChange}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
