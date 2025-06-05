import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Experience } from '@/types';

export interface ModalState {
  isProjectsModalOpen: boolean;
  isEmployerModalOpen: boolean;
  isProjectDetailModalOpen: boolean;
  selectedProject: Project | null;
  selectedEmployer: Experience | undefined;
}

const initialState: ModalState = {
  isProjectsModalOpen: false,
  isEmployerModalOpen: false,
  isProjectDetailModalOpen: false,
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
    openProjectDetailModal(state) {
      state.isProjectDetailModalOpen = true;
    },
    closeProjectDetailModal(state) {
      state.isProjectDetailModalOpen = false;
    },
    setSelectedProject(state, action: PayloadAction<Project | null>) {
      state.selectedProject = action.payload;
    }
  },
});

export const { openProjectsModal, closeProjectsModal, openEmployerModal, closeEmployerModal, openProjectDetailModal, closeProjectDetailModal, setSelectedProject } = modalSlice.actions;

export default modalSlice.reducer; 