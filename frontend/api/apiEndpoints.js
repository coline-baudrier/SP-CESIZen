const API_BASE = "http://51.178.183.31/cesizen/api";

export default {
  USER: {
    REGISTER: `${API_BASE}/users/createUser`,
    LOGIN: `${API_BASE}/users/authUser`,
    GET_PROFILE: `${API_BASE}/users/getProfile`,
    UPDATE_PROFILE: `${API_BASE}/users/updateUser`,
    GET_ALL: `${API_BASE}/users/getAllUsers`,
    DELETE: `${API_BASE}/users/deleteUser`,
    CREATE_ADMIN: `${API_BASE}/users/createAdmin`,
  },
  BREATHING_EXERCISE: {
    GET_ALL: `${API_BASE}/breathingExercise/getExercises`,
  },
  ACTIVITIES: {
    GET_ALL: `${API_BASE}/relaxationActivities/getActivities`,
    GET_ONE: `${API_BASE}/relaxationActivities/getActivity`,
    TOGGLE: `${API_BASE}/relaxationActivities/toggleActivity`,
  },
  ACTIVITIES_FAVORITE: {
    ADD_IN: `${API_BASE}/favoriteActivity/addFavorite`,
    GET_FAVORITES: `${API_BASE}/favoriteActivity/getFavorites`,
    REMOVE_FAVORITE: `${API_BASE}/favoriteActivity/removeFavorite`,
  },
  EMOTION_TRACKER: {
    GET_JOURNAL: `${API_BASE}/emotionTracker/getJournal`,
    GET_JOURNAL_BY_PERIOD: `${API_BASE}/emotionTracker/getJournalByPeriod`,
    GET_ENTRY: `${API_BASE}/emotionTracker/getEntry`,
    CREATE_ENTRY: `${API_BASE}/emotionTracker/addEntry`,
    UPDATE_ENTRY: `${API_BASE}/emotionTracker/updateEntry`,
    DELETE_ENTRY: `${API_BASE}/emotionTracker/removeEntry`,
  },
};
