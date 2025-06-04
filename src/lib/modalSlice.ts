import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Experience } from '@/types';

interface ModalState {
  isProjectsModalOpen: boolean;
  isEmployerModalOpen: boolean;
  selectedProject: Project | null;
  selectedEmployer: Experience | undefined;
}

const initialState: ModalState = {
  isProjectsModalOpen: false,
  isEmployerModalOpen: false,
  selectedProject: null,
  selectedEmployer: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openProjectsModal(state) {
      state.isProjectsModalOpen = true;
    },
    closeProjectsModal(state) {
      state.isProjectsModalOpen = false;
      state.selectedProject = null;
    },
    openEmployerModal(state, action: PayloadAction<Experience | undefined>) {
      state.isEmployerModalOpen = true;
      state.selectedEmployer = action.payload;
    },
    closeEmployerModal(state) {
      state.isEmployerModalOpen = false;
      state.selectedEmployer = undefined;
    },
    setSelectedProject(state, action: PayloadAction<Project | null>) {
      state.selectedProject = action.payload;
    }
  },
});

export const { openProjectsModal, closeProjectsModal, openEmployerModal, closeEmployerModal, setSelectedProject } = modalSlice.actions;

export default modalSlice.reducer; 