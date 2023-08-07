import { removeToken, storeToken, storeUser } from "~/api/storage";
import { IUser } from "~/recoil/atoms";

const useLogin = (user: IUser) => {
  const login = async () => {
    try {
      await storeUser(user);
      await storeToken();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await removeToken();
  };

  return { login, logout };
};

export default useLogin;
