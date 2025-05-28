import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type toggleLikePayload = {
  postId: number;
  isLiked: boolean;
  image: { hugeImageUrl: string, 
            largeImageUrl: string, 
            mediumImageUrl: string, 
            smallImageUrl: string
           };
};

type setLikesPayload = {
  [key: string]: { isLiked: boolean; image: string };
};

const likesSlice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {
    toggleLikeState: (state: any, action: PayloadAction<toggleLikePayload>) => {
      const { postId, isLiked, image } = action.payload;
      if (state[postId]) {
        state[postId].isLiked = isLiked;
      } else {
        state[postId] = { isLiked, image };
      }
    },
    setLikes: (state: any, action: PayloadAction<setLikesPayload>) => {
      Object.entries(action.payload).forEach(([postId, likeData]: any) => {
        if (state[postId]) {
          state[postId].isLiked = likeData.isLiked;
          state[postId].image = likeData.image;
        } else {
          state[postId] = { ...likeData };
        }
      });
    },
  },
});

export const { toggleLikeState, setLikes } = likesSlice.actions;
export default likesSlice.reducer;
