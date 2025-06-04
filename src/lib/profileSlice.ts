import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PortfolioData, Experience, BasicInfo } from '@/types';

interface ProfileState {
  profileData: PortfolioData | null;
  loading: boolean;
  error: string | null;
   url: string; 
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
  url: "", 
}

export const addExperience = createAsyncThunk(
  'profile/addExperience',
  async (experience: Experience, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/portfolio/experience/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experience),
      });

      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.experience;
    } catch (error) {
      return rejectWithValue('Failed to add experience');
    }
  }
);

export const updateExperience = createAsyncThunk(
  'profile/updateExperience',
  async (experience: Experience, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/portfolio/experience/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experience),
      });

      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.experience;
    } catch (error) {
      return rejectWithValue('Failed to update experience');
    }
  }
);

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
      setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle addExperience
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        if (state.profileData) {
          state.profileData.experience = action.payload;
        }
        state.loading = false;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateExperience
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        if (state.profileData) {
          state.profileData.experience = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProfileData, setLoading, setError,  setUrl, updateBasicInfo, updateMyDetails } = profileSlice.actions;

export default profileSlice.reducer; 