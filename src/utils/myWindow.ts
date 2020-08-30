import { faEthereum } from "@fortawesome/free-brands-svg-icons";

export interface MyWindow extends Window {
  // eslint-disable-next-line
  ethereum?: any;
}

export const getWindow = (): MyWindow => {
  const win: MyWindow = window;
  return win;
};
