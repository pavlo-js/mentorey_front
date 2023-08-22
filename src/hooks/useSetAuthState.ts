import { useDispatch } from "react-redux";
import { setAuthState } from "~/slices/authSlice";

const useSetAuthState = () => {
  const dispatch = useDispatch();
  const updateUser = (user: any) => {
    dispatch(setAuthState(user));
  };

  return updateUser;
};

export default useSetAuthState;
