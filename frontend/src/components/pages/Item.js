import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { GET_ITEM_BY_ID, DELETE_ITEM_BY_ID, USE_ITEM_BY_ID } from '../../queries';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

function ItemView() {
  let params = useParams();
  const { loading, data, error } = useQuery(GET_ITEM_BY_ID, { variables: { id: params.itemId } });
  const [ deleteItem ] = useMutation(DELETE_ITEM_BY_ID, { variables: { id: params.itemId } });
  const [ changeItemState ] = useMutation(USE_ITEM_BY_ID)
  const [item, setItem] = React.useState({})

  React.useEffect(() => {
    if (!loading && !error && data.items) {
      setItem(data.items[0]);
    }
  }, [loading, data, error]);

  if (loading || !item.name) {
    return <Box sx={{ display: 'flex', justifyContent: 'center'}}> <CircularProgress /> </Box>;
  }

  if (error) {
    return (
      <Typography variant="h4" sx={{ mb: 5 }}>
        Error with item
      </Typography>
    )
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {`${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`}  
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {`Last modified: ${new Date(item.lastModified).toLocaleString()}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {`Currently ${item.parentConnection.edges[0].in_use ? '' : 'not '} in use`}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {`Contained in ${item.parent.name}`}
        </Typography>
      </Typography>

      { item.notes?
        <Typography variant="h5" sx={{ mb: 5 }}>
          Notes
          <Typography variant="body1" sx={{ mb: 5 }}>
            {item.notes}
          </Typography>
        </Typography> : null
      }

      <Box sx={{ position: 'relative', mt: 3, height: 100 }}>
        <Fab
          color="error"
          variant="extended"
          style={{
            margin: 0,
            top: 'auto',
            left: 'auto',
            bottom: 80,
            position: 'fixed',
          }}
          component={Link}
          to='/'
          onClick={deleteItem}
        >
          Delete
        </Fab>
        <Fab
          color="secondary"
          variant="extended"
          style={{
            margin: 0,
            top: 'auto',
            left: 'auto',
            bottom: 150,
            position: 'fixed',
          }}
          onClick={() => {
            changeItemState({variables: {id: item.id, state: !item.parentConnection.edges[0].in_use}});
            window.location.reload(false);
          }}
        >
          {item.parentConnection.edges[0].in_use ? 'Put Back' : 'Use'}
        </Fab>
      </Box>

    </Container>
  );
}

export default ItemView;