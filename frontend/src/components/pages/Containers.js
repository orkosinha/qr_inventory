import * as React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { GET_ALL_CONTAINERS } from '../../queries';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1, align: 'center', headerAlign: 'center'  },
  { field: 'container', headerName: 'Container', flex: 1, align: 'center', headerAlign: 'center'  },
  { field: 'numItems', headerName: '# Individual Items', flex: 1, align: 'center', headerAlign: 'center'  }
]

function ContainersView() {
  const { loading, data, error } = useQuery(GET_ALL_CONTAINERS);
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        let rows = data.containers.map(({ id, name, lastModified, parent, childrenConnection }) => {
          return {
            id: id,
            name: name,
            lastModified: new Date(lastModified).toLocaleString(),
            container: parent ? parent.name : 'None',
            numItems: childrenConnection.totalCount
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
        All Containers
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

export default ContainersView;