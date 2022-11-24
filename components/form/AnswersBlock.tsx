import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInputWithDelete } from "../TextInputWithDelete";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

type AnswersBlockProps = {
  getValues: Function;
  setValue: Function;
  questionId: string;
};

export const AnswersBlock: FunctionComponent<AnswersBlockProps> = ({
  questionId,
  getValues,
  setValue,
}) => {
  const [answers, setAnswers] = useState({});

  const { unregister } = useFormContext();

  return (
    <>
      {Object.keys(getValues(`questions.${questionId}.answers`)).map(
        (id: string, index: number) => (
          <TextInputWithDelete
            key={id}
            name={`questions.${questionId}.answers.${id}`}
            label={`Answer ${index + 1}`}
            tooltipLabel={"Delete this answer"}
            onClick={() => {
              const { [id]: answer, ...answers } = getValues(
                `questions.${questionId}.answers`
              );
              setAnswers(answers);
              _.isEmpty(answers)
                ? setValue(`questions.${questionId}.answers`, {})
                : unregister(`questions.${questionId}.answers.${id}`);
            }}
          />
        )
      )}
      <Button
        onClick={() => {
          const id = uuidv4();
          const value = Object.assign(
            {},
            getValues(`questions.${questionId}.answers`),
            { [id]: "" }
          );
          setValue(`questions.${questionId}.answers`, value);
          setAnswers(value);
        }}
        variant="outlined"
      >
        Add an answer <AddIcon />
      </Button>
    </>
  );
};
