import React, { FunctionComponent, ReactNode } from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import NavMenu from "./NavMenu";
import LoadingButton from "@mui/lab/LoadingButton";

type PageContainerProps = {
  children: ReactNode;
  title: string;
  loaded: boolean;
};

const PageContainer: FunctionComponent<PageContainerProps> = ({
  children,
  title,
  loaded,
}) => (
  <Container
    sx={{ display: "flex", flexDirection: "column" }}
    disableGutters={true}
  >
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container
      sx={{ display: "flex", justifyContent: "center" }}
      maxWidth={false}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
        maxWidth="sm"
      >
        {!loaded ? (
          <LoadingButton type="submit" loading={true}>
            Loading
          </LoadingButton>
        ) : (
          children
        )}
      </Container>
    </Container>
  </Container>
);

export default PageContainer;
