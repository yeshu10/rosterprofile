import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioData, Experience, BasicInfo } from '@/types';

interface ProfileState {
  profileData: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(state, action: PayloadAction<PortfolioData | null>) {
      state.profileData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateExperience(state, action: PayloadAction<Experience[]>) {
      if (state.profileData) {
        state.profileData.experience = action.payload;
      }
    },
    updateBasicInfo(state, action: PayloadAction<BasicInfo>) {
      if (state.profileData) {
        state.profileData.basicInfo = action.payload;
      }
    },
    updateMyDetails(state, action: PayloadAction<BasicInfo['myDetails']>) {
      if (state.profileData) {
        state.profileData.basicInfo.myDetails = action.payload;
      }
    },
    addEmployer(state, action: PayloadAction<Experience>) {
      if (state.profileData) {
        state.profileData.experience.push(action.payload);
      }
    },
    updateEmployer(state, action: PayloadAction<Experience>) {
      if (state.profileData) {
        const index = state.profileData.experience.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.profileData.experience[index] = action.payload;
        }
      }
    }
  },
});

export const { setProfileData, setLoading, setError, updateExperience, updateBasicInfo, updateMyDetails, addEmployer, updateEmployer } = profileSlice.actions;

export default profileSlice.reducer; 