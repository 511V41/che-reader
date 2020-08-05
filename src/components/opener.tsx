import React from "react";

import { Button } from "@material-ui/core";

import decode from "../decoder/decoder";
import { Team } from "../models/team";

type Props = {
  addTeam: (filename: string, team: Team | undefined) => void;
};

const Opener: React.FC<Props> = (props: Props) => {
  const onClick = (): void => {
    const input = global.document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("multiple", "");
    input.setAttribute("accept", ".che,.CHE");
    input.onchange = (event: Event): void => {
      const { files } = event.target as HTMLInputElement;
      if (files) {
        for (let index = 0; index < files.length; index += 1) {
          const currentTarget = files[index];
          const reader = new global.FileReader();
          reader.onload = (): void => {
            // eslint-disable-next-line prefer-destructuring
            const result = reader.result as ArrayBuffer;
            const buffer = Buffer.from(result);
            decode(buffer).then(team => {
              props.addTeam(currentTarget.name, team);
            });
          };
          reader.readAsArrayBuffer(currentTarget);
        }
      }
    };
    input.click();
  };

  return (
    <Button fullWidth variant="contained" color="primary" onClick={onClick}>
      Open
    </Button>
  );
};

export default Opener;
