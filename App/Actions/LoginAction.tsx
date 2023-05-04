const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_OUT":
      return {
        ...state,
        status: "signOut",
        authToken: null,
      };
    case "SIGN_IN":
      return {
        ...state,
        status: "signIn",
        authToken: action.token,
      };
  }
};
