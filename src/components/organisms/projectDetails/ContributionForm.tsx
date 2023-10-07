import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import postData from "../../../models/repositories/postData";
import { ComponentProps } from "../../../models/components/ComponentProps";
import { useApiContext } from "../../../contexts/ApiContext";
import _ from "lodash";
import { ContributionFormProps } from "../../../models/components/organisms/ContributionFormProps";
import { ChangeEvent } from "react";
import { ContributionRequest } from "../../../models/contexts/ProjectContributionContextProps";
import { useAppContext } from "../../../contexts/AppContext";

const ContributionForm: React.FC<ContributionFormProps> = ({
  componentKey,
  projectId,
}) => {
  const { apiConfig } = useApiContext();
  const currentApis: string[] = _.get(
    apiConfig,
    componentKey + ".contribution"
  );

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>();
  const { user, setUser } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    makeApiRequest();
    setOpen(false);
  };

  const handleOnChangeInputElement = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const makeApiRequest = async () => {
    if (currentApis?.length > 0) {
      let request: ContributionRequest = {
        projectId: projectId,
        amount: (value && Number.parseFloat(value)) || 0.0,
      };
      postData(currentApis[0], request);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Contribute
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle color={"primary.main"}>Contribute</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the amount</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            value={value}
            fullWidth
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(event as ChangeEvent<HTMLInputElement>)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContributionForm;
