import React, { useState } from "react";
import {
  Button,
  // Divider,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";

import isMetaMaskEnabled from "../utils/isMetaMaskEnabled";
// import donateFromMetaMask from "../utils/donateFromMetaMask";

type Props = {
  bitcoin: string;
  ethereum: string;
};

const Donate: React.FC<Props> = (props: Props) => {
  const metamask = isMetaMaskEnabled();
  console.info("metamask", metamask);
  const [open, setOpen] = useState(false);
  const onOpen = (): void => {
    setOpen(true);
  };
  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link onClick={onOpen}>Donate with crypto currencies</Link>
      </Typography>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>Donation</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faBtc} />
              </ListItemIcon>
              <ListItemText primary={props.bitcoin} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faEthereum} />
              </ListItemIcon>
              <ListItemText primary={props.ethereum} />
            </ListItem>
            {/*
            {metamask && (
              <>
                <Divider />
                <ListItem button onClick={donateFromMetaMask}>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faEthereum} />
                  </ListItemIcon>
                  <ListItemText primary="Donate from MetaMask" />
                </ListItem>
              </>
            )}
             */}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Donate;
