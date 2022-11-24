import type { NextPage } from "next";
import PageContainer from "../../components/PageContainer";
import { Box } from "@mui/material";

const End: NextPage = () => {
  return (
    <PageContainer title={`Poll submitted !`} loaded={true}>
      <Box
      sx={{textAlign: "center", fontSize: "2rem", paddingTop: "50%"}}>Thank you for your vote !</Box>
    </PageContainer>
  );
};

export default End;
