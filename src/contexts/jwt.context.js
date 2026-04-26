import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  createElement,
} from 'react';
import axiosInstance from '@/utils/axios';
import LoadingProgress from '@/components/loader/LoadingProgress';
import { authenticate, getAccount } from '@/services/auth.service';
import { createUser } from '@/services/user.service';

const ActionType = Object.freeze({
  INIT: 'INIT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
});

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.INIT:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case ActionType.LOGIN:
    case ActionType.REGISTER:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case ActionType.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (body) => {
    const data = await authenticate(body);
    setSession(data.accessToken);
    dispatch({ type: ActionType.LOGIN, payload: { user: data.user } });
    return data.user;
  }, []);

  const register = useCallback(async (body) => {
    const data = await createUser(body);
    setSession(data.accessToken);
    dispatch({ type: ActionType.REGISTER, payload: { user: data.user } });
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: ActionType.LOGOUT });
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          setSession(accessToken);
          const user = await getAccount();
          dispatch({ type: ActionType.INIT, payload: { isAuthenticated: true, user } });
        } else {
          dispatch({ type: ActionType.INIT, payload: { isAuthenticated: false, user: null } });
        }
      } catch {
        dispatch({ type: ActionType.INIT, payload: { isAuthenticated: false, user: null } });
      }
    };
    init();
  }, []);

  if (!state.isInitialized) return createElement(LoadingProgress);
  return createElement(
    AuthContext.Provider,
    { value: { ...state, login, logout, register } },
    children,
  );
};
