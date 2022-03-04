const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_START":
      return {
        users: [],
        isFetching: true,
        error: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        users: [],
        isFetching: false,
        error: true,
      };

    case "CREATE_USERS_START":
      return {
        users: [...state.users, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_USERS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "CREATE_USERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "UPDATE_USER_START":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        movies:
          state.users.map((user) => user._id) === action.payload._id &&
          action.payload,
        isFetching: false,
        error: true,
      };

    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_USER_SUCCESS":
      return {
        users: state.movies.filter((user) => user._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
