import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id:       undefined,
  name:     undefined,
  admin:    undefined,
  cart_id:  undefined,
  signedIn: false,
};

function setAll(state, payload) {
  state.id       = payload.id;
  state.name     = payload.name;
  state.admin    = payload.admin;
  state.cart_id  = payload.cart_id;
  state.signedIn = payload.signedIn;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setUserData: (state, action) => {
      setAll(state, action.payload);
    },
    signOut: (state) => {
      setAll(state, initialState);
    },
  },
});

export const { setUserId, setUserData, signOut } = userSlice.actions;

export default userSlice.reducer;
