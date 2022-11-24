import React, { FunctionComponent, ReactNode } from "react";
import { Container, Box } from "@mui/material";
import { AnswerType } from "../lib/types";

function getPercentageColor(percentage: number): string {
  if (percentage < 25) {
    return "#f98300";
  } else if (percentage < 50) {
    return "#ad8a00";
  } else if (percentage < 75) {
    return "#5e9100";
  } else {
    return "#0a9901";
  }
}

type InnerBarProps = {
  percentage: number;
};

const InnerBar = (props: InnerBarProps) => (
  <Box
    sx={{
      boxSizing: "border-box",
      height: "100%",
      width: `${props.percentage}%`,
      backgroundColor: getPercentageColor(props.percentage),
    }}
  />
);

type OuterBarProps = {
  children: ReactNode;
};

const OuterBar = (props: OuterBarProps) => (
  <Box
    sx={{
      display: "inline-block",
      width: "100px",
      marginRight: "10px",
      height: "15px",
      backgroundColor: "white",
      border: "1px solid black",
    }}
  >
    {props.children}
  </Box>
);

type AnswerResultProps = {
  answer: AnswerType;
  answerCount: number;
  totalAnswerCount: number;
};

const AnswerResult: FunctionComponent<AnswerResultProps> = ({
  answer,
  answerCount,
  totalAnswerCount,
}) => {
  const votePercentage =
    totalAnswerCount > 0 ? (answerCount / totalAnswerCount) * 100 : 0;
  return (
    <Container sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
      <div>{answer.value}</div>
      <Box sx={{ fontSize: "0.9rem"}}>
        <OuterBar>
          <InnerBar percentage={votePercentage} />
        </OuterBar>
        {votePercentage.toFixed(2)} %
      </Box>
    </Container>
  );
};

export default AnswerResult;
