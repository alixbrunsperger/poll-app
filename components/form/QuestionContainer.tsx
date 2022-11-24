import React, { FunctionComponent } from "react";
import { QuestionFormTypes, QuestionType } from "../../lib/types";
import { Typography, Container, Stack, Button } from "@mui/material";
import { FormInputMultiCheckbox } from "./FormInputMultiCheckbox";
import { FormInputRadio } from "./FormInputRadio";
import { FormInputText } from "./FormInputText";

type QuestionContainerProps = {
  question: QuestionType;
  disabled: boolean;
};

const QuestionContainer: FunctionComponent<QuestionContainerProps> = ({
  question,
  disabled,
}) => {
  const { answers, uid } = question;

  return (
    <Container disableGutters={true} sx={{ margin: "16px 0" }}>
      <Typography
        variant="h5"
        sx={{ textDecoration: "underline" }}
      >{`Question : ${question.title}`}</Typography>
      {question.type === QuestionFormTypes.choice ? (
        <FormInputRadio
          name={`${uid}`}
          label={"Pick one answer"}
          options={Object.values(answers).map((answer) => ({
            value: answer.uid,
            label: answer.value,
          }))}
        />
      ) : null}
      {question.type === QuestionFormTypes.multichoice ? (
        <FormInputMultiCheckbox
          name={`${uid}`}
          label={"Pick one answer or more"}
          options={Object.values(answers).map((answer) => ({
            value: answer.uid,
            label: answer.value,
          }))}
        />
      ) : null}
      {question.type === QuestionFormTypes.text ? (
        <FormInputText name={`${uid}`} label={"Your answer"} />
      ) : null}
    </Container>
  );
};

export default QuestionContainer;
