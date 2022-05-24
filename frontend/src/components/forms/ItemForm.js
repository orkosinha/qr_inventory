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
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import {
  useQuery,
  useMutation
} from "@apollo/client";
import { ADD_NEW_ITEM, GET_ALL_CONTAINERS } from '../../queries';

function ItemForm(props) {
  const { data } = useQuery(GET_ALL_CONTAINERS);
  
  
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [quantity, setQuantity] = React.useState(1);
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

  const handleSliderChange = (event, newValue) => {
    setQuantity(newValue);
  };

  const handleInputChange = (event) => {
    setQuantity(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (quantity < 0) {
      setQuantity(0);
    } else if (quantity > 25) {
      setQuantity(30);
    }
  };

  const handleTextChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [ mutation ] =  useMutation(ADD_NEW_ITEM);

  const handleClose = (closer, name, quantity, notes, cid) => () => {
    mutation({ variables: { name, quantity, notes, cid } });
    closer()
    window.location.reload(false);
  }
  
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>Add a new item</DialogTitle>
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
        required
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
        label="Notes"
        multiline
        rows={4}
        defaultValue=""
        onChange={handleDescriptionChange}
        variant="filled"
      />

      <Typography gutterBottom>Quantity</Typography>
      <div style={{display: "flex", gap: 15}}>
        <Slider
          value={typeof quantity === 'number' ? quantity : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={0}
          max={25}
          valueLabelDisplay="auto"
          valueLabelFormat={(x) => x > 24 ? '25+': x}
        />
        <MuiInput
          value={quantity}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </div>

      </div>
      
      </DialogContent>
      <DialogActions>
      <Button onClick={props.close}>Cancel</Button>
      <Button onClick={handleClose(props.close, name, quantity, description, cid)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemForm;