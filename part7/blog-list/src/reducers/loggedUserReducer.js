import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
    unsetLoggedUser() {
      return null;
    }
  }
});

export const { setLoggedUser, unsetLoggedUser } = userSlice.actions;

export default userSlice.reducer;
