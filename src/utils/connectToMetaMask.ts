import { getWindow } from "./myWindow";
import isMetaMaskEnabled from "./isMetaMaskEnabled";

const connectMetaMask = async (): Promise<boolean> => {
  if (!isMetaMaskEnabled()) {
    return false;
  }
  const { ethereum } = getWindow();
  const accounts = await ethereum
    .request({ method: "eth_requestAccounts" })
    .catch(() => {
      return undefined;
    });
  if (accounts) {
    return true;
  }
  return false;
};

export default connectMetaMask;
