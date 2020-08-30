import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

import isMetaMaskEnabled from "../utils/isMetaMaskEnabled";
import connectToMetaMask from "../utils/connectToMetaMask";

type Props = {
  onClose: () => void;
};

const ConnectToMetaMask: React.FC<Props> = (props: Props) => {
  // 基本的には無いが、その都度確認しておく
  if (!isMetaMaskEnabled()) {
    return <></>;
  }

  const onClick = (): void => {
    connectToMetaMask()
      .then(success => {
        if (!success) {
          props.onClose();
        }
      })
      .catch(props.onClose);
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        Donation from MetaMask
      </DialogTitle>
      <DialogContent>
        <Button fullWidth variant="contained" color="primary" onClick={onClick}>
          Enable Ethereum
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectToMetaMask;
