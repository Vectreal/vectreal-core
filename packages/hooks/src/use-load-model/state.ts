/* vectreal-core | vctrl/hooks
Copyright (C) 2024 Moritz Becker

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
