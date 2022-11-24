import { v4 as uuidv4 } from "uuid";
import { QuestionFormTypes } from "../../lib/types";
import { getQuestionTypeOptions } from "../../lib/utils";
import { Button, Paper, Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { FormInputDropdown } from "./FormInputDropdown";
import AddIcon from "@mui/icons-material/Add";
import { AnswersBlock } from "./AnswersBlock";
import { TextInputWithDelete } from "../TextInputWithDelete";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

type QuestionsBlockProps = {
  getValues: Function;
  setValue: Function;
};

export const QuestionsBlock: FunctionComponent<QuestionsBlockProps> = ({
  getValues,
  setValue,
}) => {
  const [questions, setQuestions] = useState({});
  const { unregister } = useFormContext();
  const [type, setType] = useState(QuestionFormTypes.multichoice);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "0.5rem",
      }}
    >
      {Object.keys(getValues("questions")).map((id: string, index: number) => (
        <Paper
          key={id}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "0.5rem",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        >
          <TextInputWithDelete
            label={`Question ${index + 1}`}
            name={`questions.${id}.title`}
            tooltipLabel={"Delete the question"}
            onClick={() => {
              const { [id]: question, ...questions } = getValues(`questions`);
              setQuestions(questions);
              _.isEmpty(questions)
                ? setValue("questions", {})
                : unregister(`questions.${id}`);
            }}
          />
          <FormInputDropdown
            label="Question type"
            name={`questions.${id}.type`}
            onChangeCallback={setType}
            options={getQuestionTypeOptions()}
          />
          <AnswersBlock
            getValues={getValues}
            setValue={setValue}
            questionId={id}
          />
        </Paper>
      ))}
      <Button
        variant="outlined"
        sx={{ backgroundColor: "#ffffff" }}
        onClick={() => {
          const id = uuidv4();
          const question = {
            title: "",
            type: QuestionFormTypes.multichoice,
            answers: {},
          };

          setValue(`questions.${id}`, question);
          setQuestions(Object.assign({}, questions, { [id]: question }));
        }}
      >
        Add a question <AddIcon />
      </Button>
    </Box>
  );
};
