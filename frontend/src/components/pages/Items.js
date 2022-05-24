import * as React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { GET_ALL_ITEMS } from '../../queries';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'quantity', headerName: 'Quantity', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1, align: 'center', headerAlign: 'center'  },
  { field: 'container', headerName: 'Container', flex: 1, align: 'center', headerAlign: 'center'  },
  { field: 'inUse', headerName: 'In Use', flex: 1, align: 'center', headerAlign: 'center'  }
]

function ItemsView() {
  const { loading, data, error } = useQuery(GET_ALL_ITEMS);
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        let rows = data.items.map(({ id, name, quantity, lastModified, parent, parentConnection }) => {
          return {
            id: id,
            name: name,
            quantity: quantity,
            lastModified: new Date(lastModified).toLocaleString(),
            container: parent ? parent.name : 'None',
            inUse: parentConnection.edges[0].in_use ? 'Yes' : 'No'
          }
        });
        setRows(
          rows
        );
      }
    }
  }, [loading, data, error]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        All Items
      </Typography>

      <Grid container spacing={3} >
        <DataGrid
          autoHeight {...data}
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    </Container>
  );
}

export default ItemsView;