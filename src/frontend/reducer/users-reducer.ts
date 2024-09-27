import { User } from '../model/user';

export const usersInitialState: User[] = [];

type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'RESET_USERS'; }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: { id: number } }
  | { type: 'UPDATE_USER'; payload: { id: number; updates: Partial<User> } };

export default function userReducer(state: User[], action: UserAction): User[] {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    case 'SET_USERS':
      return usersInitialState;
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_USER':
      return state.filter(user => user.id !== action.payload.id);
    case 'UPDATE_USER':
      return state.map(user =>
        user.id === action.payload.id
          ? { ...user, ...action.payload.updates }
          : user
      );
    default:
      throw new Error('Unhandled action type');
  }
}
