import React, { FunctionComponent } from "react";
import { Container, Stack, CardActions, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PollAnswerType, PollType } from "../lib/types";
import PollListRow from "./PollListRow";
import Link from "next/link";

interface PollListProps {
  polls: PollType[];
  pollAnswers: PollAnswerType[];
}
const PollList: FunctionComponent<PollListProps> = ({ polls, pollAnswers }) => {
  const getAnswerCount = (pollId: string): number =>
    pollAnswers.filter((pollAnswer) => pollAnswer.pollUId === pollId).length;
  return (
    <Container maxWidth="sm" sx={{ margin: "auto" }}>
      <Stack spacing={2} sx={{ margin: "16px 0" }}>
        {polls.map((poll: PollType) => (
          <PollListRow
            key={poll.uid}
            poll={poll}
            answerCount={getAnswerCount(poll.uid)}
          />
        ))}
      </Stack>
      <CardActions sx={{ padding: 0 }}>
        <Button
          href="/poll/create"
          component="a"
          LinkComponent={Link}
          variant="outlined"
          sx={{ margin: "auto", flexGrow: "1" }}
        >
          Create a new Poll <AddIcon />
        </Button>
      </CardActions>
    </Container>
  );
};

export default PollList;
