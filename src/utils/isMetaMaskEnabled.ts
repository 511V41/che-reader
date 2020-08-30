import { getWindow } from "./myWindow";

const isMetaMaskEnabled = (): boolean => {
  const { ethereum } = getWindow();
  if (!ethereum || !ethereum.isMetaMask) {
    return false;
  }
  return true;
};

export default isMetaMaskEnabled;
