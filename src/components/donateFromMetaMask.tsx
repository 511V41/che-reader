import React, { useState } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import ConnectToMetaMask from "./connectToMetaMask";

import isMetaMaskEnabled from "../utils/isMetaMaskEnabled";
import isMetaMaskConnected from "../utils/isMetaMaskConnected";
import donateFromMetaMask from "../utils/donateFromMetaMask";
import { getWindow } from "../utils/myWindow";

type Props = {
  ethereum: string;
  open: boolean;
  onClose: () => void;
};

const DonateFromMetaMask: React.FC<Props> = (props: Props) => {
  const myWindow = getWindow();
  const [account, setAccount] = useState(
    myWindow?.ethereum?.selectedAddress || ""
  );
  const [chain, setChain] = useState(myWindow?.ethereum?.chainId || "");
  const [open, setOpen] = useState(false);
  if (open !== props.open) {
    setOpen(props.open);
  }
  const onClose = (): void => {
    setOpen(false);
    props.onClose();
  };

  // 基本的には無いが、その都度確認しておく
  if (!isMetaMaskEnabled() || !open) {
    return <></>;
  }

  myWindow.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      setAccount("");
    }
  });

  myWindow.ethereum.on("chainChanged", (chainId: string) => {
    setChain(chainId);
  });

  if (chain !== "0x1") {
    return (
      <Dialog open={props.open} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          Donation from MetaMask
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">Please switch to main network</Alert>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (!isMetaMaskConnected() || !account) {
    return <ConnectToMetaMask onClose={onClose} />;
  }

  return (
    <Dialog open={props.open} fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        Donation from MetaMask
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faEthereum} />
            </ListItemIcon>
            <ListItemText primary={account} />
          </ListItem>
          <Divider />
          <ListItem button onClick={donateFromMetaMask}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faEthereum} />
            </ListItemIcon>
            <ListItemText primary="Donate from MetaMask" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonateFromMetaMask;
