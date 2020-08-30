import { getWindow } from "./myWindow";
import isMetaMaskEnabled from "./isMetaMaskEnabled";

const isMetaMaskConnected = (): boolean => {
  if (!isMetaMaskEnabled()) {
    return false;
  }
  const { ethereum } = getWindow();
  const connected = ethereum.isConnected();
  const isAccountSelected = ethereum.selectedAddress;
  if (!connected || !isAccountSelected) {
    return false;
  }
  return true;
};

export default isMetaMaskConnected;
