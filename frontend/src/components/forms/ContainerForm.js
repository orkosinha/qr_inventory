import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useQuery,
  useMutation
} from "@apollo/client";
import { ADD_NEW_ROOT_CONTAINER, ADD_NEW_SUB_CONTAINER, GET_ALL_CONTAINERS } from '../../queries';

function ContainerForm(props) {
  const { data } = useQuery(GET_ALL_CONTAINERS);
  
  
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [cid, setCid] = React.useState("");
  
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      if (active) {
        setOptions(data.containers);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, data]);

  const handleTextChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [ root_mutation ] =  useMutation(ADD_NEW_ROOT_CONTAINER);
  const [ sub_mutation ] = useMutation(ADD_NEW_SUB_CONTAINER);
  
  const handleClose = (closer, name, description, cid) => () => {
    if (cid === "") {
      root_mutation({ variables: { name, description } });
    } else {
      sub_mutation({ variables: { name, description, cid } })
    }
    
    closer()
    window.location.reload(false);
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>Add a new container</DialogTitle>
      <DialogContent>
      <DialogContentText>
        To add a new item to your inventory, please fill out this form
      </DialogContentText>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, paddingTop: 10}}>
      
      <TextField
        required
        fullWidth
        id="name"
        label="Name"
        value={name}
        onChange={handleTextChange}
      />

      <Autocomplete
        id="destination-container"
        fullWidth
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        onChange={(event, newValue) => {
          setCid(newValue.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Destination Container *"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <TextField
        id="description-input"
        label="Description"
        multiline
        rows={4}
        defaultValue=""
        onChange={handleDescriptionChange}
        variant="filled"
      />

      </div>
      
      </DialogContent>
      <DialogActions>
      <Button onClick={props.close}>Cancel</Button>
      <Button onClick={handleClose(props.close, name, description, cid)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContainerForm;