import { Action, ModelFileTypes, State } from './types';

// Initial state
export const initialState: State = {
  file: null,
  isFileLoading: false,
  progress: 0,
  supportedFileTypes: Object.values(ModelFileTypes),
};

/**
 * Reducer function for the useReadModelFiles hook
 *
 * @param state - The current state of the reducer
 * @param action - The action to be performed
 * @returns The updated state
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload };
    case 'SET_FILE_LOADING':
      return { ...state, isFileLoading: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'RESET_STATE':
      return { ...initialState };
    default:
      return state;
  }
}

export default reducer;
