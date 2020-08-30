import isMetaMaskEnabled from "./isMetaMaskEnabled";

const donateFromMetaMask = async (): Promise<void> => {
  if (!isMetaMaskEnabled) {
    return;
  }
  // eslint-disable-next-line
  const myWindow: any = window;
  // const { ethereum } = myWindow;
};

export default donateFromMetaMask;
