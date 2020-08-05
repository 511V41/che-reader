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

import { ContentOfList } from "../models/team";

type Props = {
  list: ContentOfList[];
};

const TeamList: React.FC<Props> = (props: Props) => {
  const elements = props.list
    .map(content => {
      if (!content.team) {
        return (
          <Alert severity="error">
            {content.filename}は読み込めませんでした。
          </Alert>
        );
      }
      const okes = content.team.okes.map((oke, index) => {
        if (oke) {
          console.info(oke);
          let text = oke.name;
          if (oke.name !== oke.nickname) {
            text = `${oke.nickname} (${oke.name})`;
          }
          return (
            <ListItem key={`${index}-${oke.name}`}>
              <ListItemText primary={`${index + 1} ${text}`} />
            </ListItem>
          );
        }
        return <></>;
      });
      return (
        // eslint-disable-next-line react/jsx-key
        <Card>
          <CardContent>
            <Typography>
              {content.team.name} by {content.team.owner} - {content.filename}
            </Typography>
            <List>{okes}</List>
          </CardContent>
        </Card>
      );
    })
    .map((element, index) => {
      return (
        <div key={index} style={{ margin: "5px 0" }}>
          {element}
        </div>
      );
    });

  return <div>{elements}</div>;
};

export default TeamList;
