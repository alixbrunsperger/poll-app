import { Box, IconButton, Tooltip } from "@mui/material";
import { FormInputText } from "./form/FormInputText";
import { FunctionComponent, MouseEventHandler } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type TextInputWithDeleteProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  name: string;
  tooltipLabel: string;
};

export const TextInputWithDelete: FunctionComponent<
  TextInputWithDeleteProps
> = ({ onClick, label, name, tooltipLabel }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "9fr 1fr",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <FormInputText label={label} name={name} />
      <Tooltip title={tooltipLabel}>
        <IconButton
          sx={{ justifyContent: "center" }}
          onClick={onClick}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
