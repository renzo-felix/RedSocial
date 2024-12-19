import { UserState } from "@/types/userTypes";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const set = createAction<UserState>("SET");

export const setProfileImage = createAction<{
  profileImageUrl: string;
}>("SET-PROFILE-IMAGE");

export const setGithubUsername = createAction<{
  githubUserName: string;
}>("SET-GITHUB-USERNAME");

export const clear = createAction<null>("CLEAR");

const initialState: UserState = {
  id: -1,
  email: "test@test.com",
  isAdmin: false,
  name: "Test",
  surname: "User",
  //isDisabled: false,
  profileImageUrl:
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  slug: "test-user",
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(set, (state, action) => { //
    return { ...state, ...action.payload }; //paylod los nuevos valores
  });
  builder.addCase(setProfileImage, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(clear, () => {//Lo anterior
    return { ...initialState };
  });
  builder.addCase(setGithubUsername, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default userReducer;
