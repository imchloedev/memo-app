import { removeToken, storeUser } from "~/lib/storage";
import { IUser } from "~/recoil/atoms";

const useLogin = (user: IUser) => {
  const login = async () => {
    await storeUser(user);
  };

  const logout = async () => {
    await removeToken();
  };

  return { login, logout };
};

export default useLogin;
