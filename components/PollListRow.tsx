import React, { FunctionComponent } from "react";
import { Tooltip, Paper, Box } from "@mui/material";
import Link from "next/link";
import { PollType } from "../lib/types";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LinkIcon from "@mui/icons-material/Link";

interface PollListRowProps {
  poll: PollType;
  answerCount: number;
}
const PollListRow: FunctionComponent<PollListRowProps> = ({
  poll,
  answerCount,
}) => {
  return (
    <Paper
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <Box>
        <Link href={`/poll/${poll.uid}/details`}>{poll.title}</Link>
      </Box>
      <Box>
        {answerCount} answer{answerCount > 1 ? "s" : ""}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyItems: "center",
        }}
      >
        <Tooltip title={"See poll details and results"}>
          <AnalyticsIcon />
        </Tooltip>
        <Tooltip title="Get the link of the poll">
          <LinkIcon />
        </Tooltip>
        <Tooltip title={poll.active ? "active" : "inactive"}>
          {poll.active ? (
            <PublicIcon color="success" />
          ) : (
            <PublicOffIcon color="error" />
          )}
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default PollListRow;
