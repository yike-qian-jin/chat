import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.currentUser = action.payload;
        },
        updateUser: (state, action) => {
            state.currentUser.avatar = action.payload.avatar;
            state.currentUser.isAvatarImageSet = true;
        },
    },
})

export const { signIn, updateUser } = userSlice.actions

export default userSlice.reducer