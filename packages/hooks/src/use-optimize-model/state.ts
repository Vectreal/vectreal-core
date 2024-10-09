import { Action, State } from './types';

/**
 * Initial state for the reducer.
 */
export const initialState: State = {
  modelDoc: null,
  modelReport: null,
  error: null,
  loading: false,
};

/**
 * Reducer function to manage state transitions.
 *
 * @param state - Current state.
 * @param action - Action to perform.
 * @returns New state after applying the action.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        modelDoc: action.payload.modelDoc,
        modelReport: action.payload.modelReport,
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};
