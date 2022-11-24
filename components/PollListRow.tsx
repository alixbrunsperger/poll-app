import React, { FunctionComponent } from "react";
import { Grid, Chip } from "@mui/material";
import Link from "next/link";
import { PollType } from "../lib/types";

interface PollListRowProps {
  poll: PollType;
  answerCount: number;
}
const PollListRow: FunctionComponent<PollListRowProps> = ({
  poll,
  answerCount,
}) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <Grid item xs={6}>
        <Link href={`/poll/${poll.uid}/details`}>{poll.title}</Link>
      </Grid>
      <Grid item xs={4}>
        {answerCount} answer{answerCount > 1 ? "s" : ""}
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        {poll.active ? (
          <Chip label="active" color="success" />
        ) : (
          <Chip label="inactive" color="error" />
        )}
      </Grid>
    </Grid>
  );
};

export default PollListRow;
