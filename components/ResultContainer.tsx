import React, { FunctionComponent } from "react";
import { Typography, Container, Divider } from "@mui/material";
import {
  PollQuestionAnswerType,
  PollType,
  QuestionType,
} from "../lib/types";
import QuestionResult from "./QuestionResult";

type ResultContainerProps = {
  poll: PollType;
  pollQuestionAnswers: PollQuestionAnswerType[];
};

const ResultContainer: FunctionComponent<ResultContainerProps> = ({
  poll,
  pollQuestionAnswers,
}) => {
  return (
    <Container disableGutters={true} sx={{marginTop: "2rem"}}>
      <Typography variant="h4">Results</Typography>
      <Divider />
      {poll?.questions.map((question: QuestionType) => {
        const questionAnswers = pollQuestionAnswers?.filter(
          (pollQuestionAnswer) => question.uid === pollQuestionAnswer.questionUId
        );
        return (
          <QuestionResult
            key={question.uid}
            question={question}
            questionAnswers={questionAnswers}
          />
        );
      })}
    </Container>
  );
};

export default ResultContainer;
