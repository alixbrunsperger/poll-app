import React, { FunctionComponent } from "react";
import { Container, Stack, Paper, Divider, Box } from "@mui/material";
import { PollType, QuestionFormTypes } from "../lib/types";
import { QuestionsChoicesLabels } from "../lib/utils";

type PollDetailsProps = {
  poll: PollType;
};

const PollDetails: FunctionComponent<PollDetailsProps> = ({ poll }) => (
  <Container
    sx={{ display: "flex", flexDirection: "column" }}
    disableGutters={true}
  >
    <Stack direction="column" spacing={1} divider={<Divider flexItem />}>
      {poll.questions.map((question) => (
        <Paper
          key={question.uid}
          sx={{ padding: "8px", backgroundColor: "#fff" }}
          variant="outlined"
        >
          <Box sx={{ fontWeight: "bold" }}>{`Question : ${question.title} - (${
            QuestionsChoicesLabels[question.type]
          })`}</Box>
          {question.type !== QuestionFormTypes.text ? (
            <>
              <Box>Answers :</Box>
              {question.answers.map((answer) => (
                <Box
                  key={answer.uid}
                  sx={{ paddingLeft: "1rem" }}
                >{` - ${answer.value}`}</Box>
              ))}
            </>
          ) : null}
        </Paper>
      ))}
    </Stack>
  </Container>
);

export default PollDetails;
