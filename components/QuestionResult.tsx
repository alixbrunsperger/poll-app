import React, { FunctionComponent } from "react";
import { Typography, Paper, Stack, Container } from "@mui/material";
import {
  AnswerType,
  PollQuestionAnswerType,
  QuestionFormTypes,
  QuestionType,
} from "../lib/types";
import AnswerResult from "./AnswerResult";

type QuestionResultProps = {
  question: QuestionType;
  questionAnswers: PollQuestionAnswerType[];
};

const QuestionResult: FunctionComponent<QuestionResultProps> = ({
  question,
  questionAnswers,
}) => (
  <Paper sx={{ padding: "0.5rem" }}>
    <Typography variant="h5">Question: {question.title}</Typography>
    <Stack>
    {question.type === QuestionFormTypes.multichoice ||
      question.type === QuestionFormTypes.choice
        ? question.answers.map((answer: AnswerType) => {
            const answerCount = questionAnswers?.filter((questionAnswer) =>
              questionAnswer.answers.includes(answer.uid)
            ).length;
            return (
              <AnswerResult
                key={answer.uid}
                answer={answer}
                answerCount={answerCount}
                totalAnswerCount={questionAnswers?.length}
              />
            );
          })
        : null}
      {question.type === QuestionFormTypes.text ? (
        <Container>
          {questionAnswers.map((questionAnswer,index) => (
            <div key={index}>{`- ${questionAnswer.answers}`}</div>
          ))}
        </Container>
      ) : null}
    </Stack>
  </Paper>
);

export default QuestionResult;
