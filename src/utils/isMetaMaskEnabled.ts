const isMetaMaskEnabled = (): boolean => {
  // eslint-disable-next-line
  const myWindow: any = window;
  const { ethereum } = myWindow;
  if (!ethereum || !ethereum.isMetaMask || ethereum.chainId !== "0x1") {
    return false;
  }
  return true;
};

export default isMetaMaskEnabled;
