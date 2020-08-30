import React from "react";
import { Typography, Link } from "@material-ui/core";

type Props = {
  bitcoin: string;
  ethereum: string;
};

const Donate: React.FC<Props> = (props: Props) => {
  console.info(props);
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="https://511v41.github.io/">
          Donate with crypto currencies
        </Link>
      </Typography>
    </>
  );
};

export default Donate;
