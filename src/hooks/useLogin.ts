import { useRecoilState, useSetRecoilState } from "recoil";
import { storeUserInfo } from "~/api/storage";
import { IUser, userState } from "~/recoil/atoms";

const useLogin = (userInfo: IUser) => {
  const { username, password } = userInfo;
  const setUserInfo = useSetRecoilState(userState);

  const login = async () => {
    await storeUserInfo();
    setUserInfo(userInfo);
  };

  const logout = () => {};

  return { login, logout };
};

export default useLogin;
