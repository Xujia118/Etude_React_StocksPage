import { LOGIN_STATUS, ACTIONS } from "./constants";

export const initialState = {
  user: {
    username: "",
    password: "",
  },
  isLoggedIn: false,
  assets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload.username,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        user: { username: "", password: "" },
        isLoggedIn: false,
      };
    case ACTIONS.LOAD_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
  }
}

export default reducer;