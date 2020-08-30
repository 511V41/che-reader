import isMetaMaskEnabled from "./isMetaMaskEnabled";

const donateFromMetaMask = async (): Promise<void> => {
  if (!isMetaMaskEnabled()) {
    return;
  }
  // eslint-disable-next-line
  const myWindow: any = window;
  const { ethereum } = myWindow;
  await ethereum.request({ method: "eth_requestAccounts" });
  const params = [
    {
      from: ethereum.selectedAddress,
      to: "0x9952434490f6deaFfF1f5027c830aCF7717eA9C0"
    }
  ];
  await ethereum.request({
    method: "eth_sendTransaction",
    params
  });
};

export default donateFromMetaMask;
