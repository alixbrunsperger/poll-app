import React, { FunctionComponent } from "react";
import { Typography, Container, Stack } from "@mui/material";
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
  <Container disableGutters={true}>
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
          {questionAnswers.map((questionAnswer) => (
            <div key={questionAnswer.uid}>{questionAnswer.answers}</div>
          ))}
        </Container>
      ) : null}
    </Stack>
  </Container>
);

export default QuestionResult;
