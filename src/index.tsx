import React from "react";
import { Button, Box, Typography, Link, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        511V41
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

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
        <Typography component="h1" variant="h5">
          CHE READER
        </Typography>
        <Typography>
          <a href="https://www.artdink.co.jp/japanese/title/che/">
            カルネージハートエクサ
          </a>
          からエクスポートしたチームデータの内容を確認することができます。
        </Typography>
        <Button fullWidth variant="contained" color="primary">
          Open
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Index;
