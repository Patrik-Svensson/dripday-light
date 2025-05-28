import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Styleboard = {
  _id: string;
  name: string;
  posts: any[];
};

type AddPostToStyleboardPayload = {
  styleboardId: string;
  post: any;
};

type ChangeNameStyleboardPayload = {
  styleboardId: string;
  name: string;
};

type RemovePostFromStyleboardPayload = {
  styleboardId: string;
  postId: string;
};

const styleboardSlice = createSlice({
  name: "styleboards",
  initialState: [],
  reducers: {
    addOneStyleboard: (state: any, action: PayloadAction<Styleboard>) => {
      state.push(action.payload);
    },
    addStyleboards: (state: any, action: PayloadAction<Styleboard[]>) => {
      state.push(...action.payload);
    },
    setReduxStyleboards: (state, action) => {
      return action.payload;
    },
    addPostToStyleboard: (
      state: any,
      action: PayloadAction<AddPostToStyleboardPayload>
    ) => {
      const styleboard = state.find(
        (styleboard: any) => styleboard._id === action.payload.styleboardId
      );
      styleboard.posts.push(action.payload.post);
    },
    removePostFromStyleboard: (
      state: any,
      action: PayloadAction<RemovePostFromStyleboardPayload>
    ) => {
      const styleboard = state.find(
        (styleboard: any) => styleboard._id === action.payload.styleboardId
      );
      styleboard.posts = styleboard.posts.filter(
        (post: any) => post.id !== action.payload.postId
      );
    },
    changeNameStyleboard: (
      state: any,
      action: PayloadAction<ChangeNameStyleboardPayload>
    ) => {
      const styleboard = state.find(
        (styleboard: any) => styleboard._id === action.payload.styleboardId
      );
      styleboard.name = action.payload.name;
    },

    removeStyleboard: (state: any, action: any) => {
      return state.filter(
        (styleboard: any) => styleboard._id !== action.payload
      );
    },
  },
});

export const {
  addOneStyleboard,
  addStyleboards,
  setReduxStyleboards,
  addPostToStyleboard,
  removePostFromStyleboard,
  removeStyleboard,
  changeNameStyleboard,
} = styleboardSlice.actions;
export default styleboardSlice.reducer;
