import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// Timepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";

export default function Weekly() {
  return (
    <>
      <div className="m-2 rounded border border-slate-300">
        <Typography className="font-semibold text-slate-500 m-4">
          Set your weekly hours
        </Typography>
        <div className="flex px-2 md:px-4 items-center py-3">
          <FormControlLabel control={<Checkbox defaultChecked />} label="MON" />
          <div>
            <div className="flex justify-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MultiInputTimeRangeField
                  ampm={false}
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === "start" ? "From" : "To",
                      size: "small",
                      sx: { width: 100 },
                    }),
                  }}
                />
              </LocalizationProvider>
              <IconButton aria-label="delete" size="small" className="ml-4">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <IconButton aria-label="add" className="ml-auto">
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
