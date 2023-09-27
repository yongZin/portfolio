import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { PropsState } from '../model/gameType';

const initialState: PropsState = { // 초기 상태 정의
  run: false,
  finish: false,
  menu: false,
  userRecord: "00:00",
  resetCount: 0,
  rank: [],
};

const propsSlice = createSlice({
  name: 'props',
  initialState,
  reducers: {
    setRun: (state, action: PayloadAction<boolean>) => {
      state.run = action.payload;
    },
    setFinish: (state, action: PayloadAction<boolean>) => {
      state.finish = action.payload;
    },
    setUserRecord: (state, action: PayloadAction<string>) => {
      state.userRecord = action.payload;
    },
    setResetCount: (state, action: PayloadAction<number>) => {
      state.resetCount = action.payload;
    },
    setRank: (state, action: PayloadAction<Array<{ userName: string; userRecord: string }>>) => {
      state.rank = action.payload;
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.menu = action.payload;
    },
    resetGame: (state) => {
      state.run = false;
      state.finish = false;
      state.userRecord = "00:00";
      state.resetCount += 1;
    }
  },
});

export const { setRun, setFinish, setUserRecord, setResetCount, setRank, setMenu, resetGame } = propsSlice.actions;
export default propsSlice.reducer;
