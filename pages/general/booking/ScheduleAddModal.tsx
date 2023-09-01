import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

interface Props {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  setTitle: (val: string) => void;
  title: string;
}

export default function ScheduleAddModal({
  open,
  handleOpen,
  handleClose,
  setTitle,
  title,
}: Props) {
  const [name, setName] = React.useState<string>(title);

  const onChange = (e: any) => setName(e.target.value);
  const onClose = () => {
    setName("");
    setTitle("none");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={onClose}
          sx={{
            minWidth: "40px !important",
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          x
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Title
          </Typography>
        </Box>

        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            value={name}
            onChange={onChange}
            size="small"
            placeholder="Title here ..."
          />
          <Button
            variant="contained"
            onClick={() => {
              if (!name) return;
              else setTitle(name);
              setName("");
              handleClose();
            }}
            sx={{ backgroundColor: "#059669 !important" }}
          >
            SAVE
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}
