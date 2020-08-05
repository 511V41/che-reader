import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { v4 as uuidv4 } from "uuid";

import Emblem from "./emblem";
import { ContentOfList } from "../models/team";

type Props = {
  list: ContentOfList[];
};

const TeamList: React.FC<Props> = (props: Props) => {
  const elements = props.list.map(content => {
    if (!content.team) {
      return (
        <Alert key={uuidv4()} severity="error" style={{ margin: "5px" }}>
          {content.filename}は読み込めませんでした。
        </Alert>
      );
    }
    const okes = content.team.okes.map((oke, index) => {
      if (oke) {
        let text = oke.name;
        if (oke.name !== oke.nickname) {
          text = `${oke.nickname} (${oke.name})`;
        }
        return (
          <ListItem key={uuidv4()}>
            <ListItemText primary={`${index + 1} ${text}`} />
          </ListItem>
        );
      }
      return <></>;
    });
    return (
      // eslint-disable-next-line react/jsx-key
      <Card key={uuidv4()} style={{ margin: "5px" }}>
        <CardContent>
          <Emblem emblemData={content.team.emblem}></Emblem>
          <Typography>
            {content.team.name} by {content.team.owner} - {content.filename}
          </Typography>
          <List>{okes}</List>
        </CardContent>
      </Card>
    );
  });

  return <div>{elements}</div>;
};

export default TeamList;
