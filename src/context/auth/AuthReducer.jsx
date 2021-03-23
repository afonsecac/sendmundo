import { LOADING, SIGNIN_SUCCESS, SIGNIN_FAIL } from "context/auth/types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
