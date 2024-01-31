import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ModeState {
  mode: 'light' | 'dark'
}

const initialState: ModeState = {
  mode: localStorage.getItem('mode') === 'dark' ? 'dark' : 'light',
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    storeMode: (state, action: PayloadAction<ModeState['mode']>) => {
      state.mode = action.payload
    },
  },
})

export const { storeMode } = modeSlice.actions
