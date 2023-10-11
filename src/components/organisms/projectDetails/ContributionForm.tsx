import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import postData from "../../../repositories/postData";

import _ from "lodash";
import { ChangeEvent } from "react";
import { useApiContext } from "../../../contexts/ApiContext";
import { ContributionFormProps } from "../../../models/components/organisms/ContributionFormProps";
import { ContributionRequest } from "../../../models/repositories/ContributionRequestProps";
import {
  ACCESS_TOKEN,
  CREATE_CONTRIBUTION_API_KEY,
  USER_ID,
} from "../../../constants/constant";

const ContributionForm: React.FC<ContributionFormProps> = ({ projectId }) => {
  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, CREATE_CONTRIBUTION_API_KEY);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>();
  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();

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
    if (currentApi?.length > 0) {
      let request: ContributionRequest = {
        projectId: projectId,
        amount: (value && Number.parseFloat(value)) || 0.0,
        userId: sessionStorage.getItem(USER_ID) || "",
      };
      postData(currentApi, request, sessionStorage.getItem(ACCESS_TOKEN)).then(
        (response) => {
          if (response.error === null) {
            setApiResponseMessage("Contribution made successfully");
            setApiResponseType("success");
            setShowSnackBar(true);
          } else {
            setApiResponseMessage("Could not make contribution, try again");
            setApiResponseType("error");
            setShowSnackBar(true);
          }
        }
      );
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
