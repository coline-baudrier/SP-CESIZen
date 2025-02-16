export const ENDPOINTS = {
  USERS: {
    AUTHENTICATE: 'users/authUser.php',
    REGISTER: 'users/createUser.php',
    REGISTER_ADMIN: 'users/createAdmin.php',
    GET_ALL: 'users/getAllUsers.php',
    PROFILE: 'users/getProfile.php',
    UPDATE: 'users/updateUser.php',
    CHANGE_PASSWORD: 'users/changePassword.php',
    CHANGE_STATUS: 'users/changeStatusUser.php',
    DELETE: 'users/deleteUser.php',
  },

  BREATHING_EXERCISES: {
    GET_ALL: 'breathingExercise/getExercises.php',
    GET_ONE: 'breathingExercise/getExercise.php',
    CREATE: 'breathingExercise/createExercise.php',
    UPDATE: 'breathingExercise/updateExercise.php',
    DELETE: 'breathingExercise/deleteExercise.php',
  },

  EMOTIONS: {
    GET_ALL: 'emotions/getAll.php',
    GET_BY_ID: 'emotions/getEmotionById.php',
    GET_BY_BASE: 'emotions/getEmotionsByBase.php',
    GET_ALL_BASE: 'emotions/getAllBases.php',
    CREATE: 'emotions/createEmotion.php',
    UPDATE: 'emotions/updateEmotion.php',
    CHANGE_STATUS: 'emotions/changeStatusEmotion.php',
  },

  EMOTION_TRACKER: {
    GET_JOURNAL: 'emotionTracker/getJournal.php',
    GET_ENTRY: 'emotionTracker/getEntry.php',
    GET_BY_PERIOD: 'emotionTracker/getJournalByPeriod.php',
    ADD_ENTRY: 'emotionTracker/addEntry.php',
    UPDATE_ENTRY: 'emotionTracker/updateEntry.php',
    REMOVE_ENTRY: 'emotionTracker/removeEntry.php',
  },

  FAVORITE_ACTIVITIES: {
    GET_ALL: 'favoriteActivity/getFavorites.php',
    ADD: 'favoriteActivity/addFavorite.php',
    REMOVE: 'favoriteActivity/removeFavorite.php',
  },

  RELAXATION_ACTIVITIES: {
    GET_ALL: 'relaxationActivities/getActivities.php',
    GET_ONE: 'relaxationActivities/getActivity.php',
    CREATE: 'relaxationActivities/createActivity.php',
    UPDATE: 'relaxationActivities/updateActivity.php',
    TOGGLE: 'relaxationActivities/toggleActivity.php',
  },

  STRESS_DIAGNOSIS: {
    GET_ALL_TESTS: 'stressDiagnosis/getTests.php',
    GET_TEST_QUESTIONS: 'stressDiagnosis/getTestQuestions.php',
    SUBMIT_TEST: 'stressDiagnosis/submitTest.php',
    GET_DIAGNOSTICS: 'stressDiagnosis/getDiagnostics.php',
    GET_ALL_DIAGNOSTICS: 'stressDiagnosis/getAllStressDiagnostics.php',
    CREATE_TEST: 'stressDiagnosis/createTest.php',
    ADD_QUESTION: 'stressDiagnosis/addQuestion.php',
    UPDATE_QUESTION: 'stressDiagnosis/updateQuestion.php',
    DELETE_QUESTION: 'stressDiagnosis/deleteQuestion.php',
  },
};
