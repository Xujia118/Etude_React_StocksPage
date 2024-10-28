// Import libraries
import { useReducer } from "react";

// Import files
import { ACTIONS, LOGIN_STATUS } from "./constants";
import reducer, { initialState } from "./reducer";
import stockData from "./data";

// Import components
import Header from "./Header";
import LoginForm from "./LoginForm";
import AssetList from "./AssetList";

// Import styling
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(user) {
    dispatch({ type: ACTIONS.LOG_IN, payload: user });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
  }

  function onLoadAssets() {
    dispatch({ type: ACTIONS.LOAD_ASSETS, payload: stockData });
  }

  return (
    <div className="bg-slate-300">
      <Header onLogout={onLogout} />
      <body>
        {state.isLoggedIn ? (
          <AssetList assets={state.assets} onLoadAssets={onLoadAssets} />
        ) : (
          <LoginForm onLogin={onLogin} />
        )}
      </body>
    </div>
  );
}

export default App;
