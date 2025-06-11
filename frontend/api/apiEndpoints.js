const API_BASE = "http://79.137.33.245:8000/api";

export default {
  USER: {
    REGISTER: `${API_BASE}/users/createUser.php`,
    LOGIN: `${API_BASE}/users/authUser.php`,
    GET_PROFILE: `${API_BASE}/users/getProfile.php`,
    UPDATE_PROFILE: `${API_BASE}/users/updateUser.php`,
    GET_ALL: `${API_BASE}/users/getAllUsers.php`,
    DELETE: `${API_BASE}/users/deleteUser.php`,
    CREATE_ADMIN: `${API_BASE}/users/createAdmin.php`,
  },
  BREATHING_EXERCISE: {
    GET_ALL: `${API_BASE}/breathingExercise/getExercises.php`,
  },
  ACTIVITIES: {
    GET_ALL: `${API_BASE}/relaxationActivities/getActivities.php`,
    GET_ONE: `${API_BASE}/relaxationActivities/getActivity.php`,
    TOGGLE: `${API_BASE}/relaxationActivities/toggleActivity.php`,
  },
  ACTIVITIES_FAVORITE: {
    ADD_IN: `${API_BASE}/favoriteActivity/addFavorite.php`,
    GET_FAVORITES: `${API_BASE}/favoriteActivity/getFavorites.php`,
    REMOVE_FAVORITE: `${API_BASE}/favoriteActivity/removeFavorite.php`,
  },
  EMOTION_TRACKER: {
    GET_JOURNAL: `${API_BASE}/emotionTracker/getJournal.php`,
    GET_JOURNAL_BY_PERIOD: `${API_BASE}/emotionTracker/getJournalByPeriod.php`,
    GET_ENTRY: `${API_BASE}/emotionTracker/getEntry.php`,
    CREATE_ENTRY: `${API_BASE}/emotionTracker/addEntry.php`,
    UPDATE_ENTRY: `${API_BASE}/emotionTracker/updateEntry.php`,
    DELETE_ENTRY: `${API_BASE}/emotionTracker/removeEntry.php`,
  },
};
