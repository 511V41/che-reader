import React from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h2">
        CHE READER
      </Typography>
      <Typography component="p" variant="subtitle1">
        <Link href="https://www.artdink.co.jp/japanese/title/che/">
          カルネージハートエクサ
        </Link>
        からエクスポートしたチームデータの内容を確認することができます。
        複数のファイルを同時に開くこともできます。
      </Typography>
      <Typography component="p" variant="caption">
        ※
        インターネットへのアップロードは行いません。内容を確認するだけです。バグを発見したときや、要望がある際などは
        <Link href="https://github.com/511V41/che-reader/issues">issue</Link>か
        <Link href="mailto:yukkuri.sinai@gmail.com">メール</Link>
        でご一報ください。
      </Typography>
    </div>
  );
};

export default Header;
