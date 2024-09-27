import { User } from '@/frontend/model/user';

export const userInitialState: User = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  age: undefined,
  weight: undefined,
  smoker: undefined
};

type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'RESET_USER'; }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

export default function userReducer(state: User, action: UserAction) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;

    case 'RESET_USER':
      return userInitialState;

    case 'UPDATE_USER':
      return { ...state, ...action.payload };

    default:
      throw new Error('Unhandled action type');
  }
}
