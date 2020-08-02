import React from "react";
import { Box, Container } from "@material-ui/core";

import Header from "./components/header";
import Copyright from "./components/copyright";
import Opener from "./components/opener";

const Index: React.FC = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Header />
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
