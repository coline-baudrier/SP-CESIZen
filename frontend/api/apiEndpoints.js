const API_BASE = "http://51.178.183.31/cesizen/api";

export default {
  USER: {
    REGISTER: `${API_BASE}/users/createUser`,
    LOGIN: `${API_BASE}/users/authUser`,
    GET_PROFILE: `${API_BASE}/users/getProfile`,
  },
  BREATHING_EXERCISE: {
    GET_ALL: `${API_BASE}/breathingExercise/getExercises`,
  },
  ACTIVITIES: {
    GET_ALL: `${API_BASE}/relaxationActivities/getActivities`,
    GET_ONE: `${API_BASE}/relaxationActivities/getActivity`,
  },
  ACTIVITIES_FAVORITE: {
    ADD_IN: `${API_BASE}/favoriteActivity/addFavorite`,
    GET_FAVORITES: `${API_BASE}/favoriteActivity/getFavorites`,
    REMOVE_FAVORITE: `${API_BASE}/favoriteActivity/removeFavorite`,
  },
};
