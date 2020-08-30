import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";

import Header from "./components/header";
import Copyright from "./components/copyright";
import Opener from "./components/opener";
import TeamList from "./components/teamlist";
import Donate from "./components/donate";

import { Team, ContentOfList } from "./models/team";

const Index: React.FC = () => {
  const [list, setList] = useState<ContentOfList[]>([]);
  const addTeam = (filename: string, team: Team | undefined): void => {
    list.push({
      filename,
      team
    });
    setList([...list]);
  };
  return (
    <Container component="main" maxWidth="sm">
      <Header />
      {list.length > 0 && (
        <Box mt={3}>
          <TeamList list={list} />
        </Box>
      )}
      <Box mt={4}>
        <Opener addTeam={addTeam} />
      </Box>
      <Box mt={4}>
        <Donate
          bitcoin="bc1qzlrsupry02ffsq5wgtqudx6ep7rjc28l24csql"
          ethereum="0x9952434490f6deaFfF1f5027c830aCF7717eA9C0"
        />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Index;
