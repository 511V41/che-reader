import React from "react";
import { Box, Typography, Link, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Copyright from "./components/copyright";
import Opener from "./components/opener";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Index: React.FC = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          CHE READER
        </Typography>
        <Typography component="p" variant="subtitle1">
          <Link href="https://www.artdink.co.jp/japanese/title/che/">
            カルネージハートエクサ
          </Link>
          からエクスポートしたチームデータの内容を確認することができます。
        </Typography>
        <Typography component="p" variant="caption">
          ※ インターネットへのアップロードは行いません。内容を確認するだけです。
        </Typography>
      </div>
      <Box mt={4}>
        <Opener />
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Index;
