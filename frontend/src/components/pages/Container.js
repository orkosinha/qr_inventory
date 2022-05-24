import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { GET_CONTENTS, DELETE_CONTAINER_BY_ID, GET_CONTAINER_BY_ID } from '../../queries';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

function ContentTree(props) {
  const { loading, error, data } = useQuery(GET_CONTENTS, {variables: {cid: props.id}});

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center'}}> <CircularProgress /> </Box>;

  if (error) return <p>Error :</p>;
  const ChildTreeItem = (child) => {
    let result = null;
    if (child.children) {
      result = child.children.map((gchild) =>  ChildTreeItem(gchild));
    }
    return (
      <Link key={child.id} to={child.children? `/container/${child.id}` : `/item/${child.id}`} >
        <TreeItem style={{color: "black"}} key={child.id} nodeId={child.id} label={child.name} onClick={() => console.log(`clicked ${child.name}`)}>{result}</TreeItem>
      </Link>
    );
  };

  return data.containers.map(({ id, name, children }) => (
    <Link key={id} to={children? `/container/${id}` : `/item/${id}`} >
      <TreeItem style={{color: "black"}} key={id} nodeId={id} label={name} onClick={() => console.log(`clicked ${name}`)}>
        { Array.isArray(children)
          ? children.map((child) => ChildTreeItem(child)) : null }
      </TreeItem>
    </Link>
  ));
}

function ContainerView() {
  let params = useParams();
  console.log(params.containerId);
  const { loading, data, error } = useQuery(GET_CONTAINER_BY_ID, { variables: { id: params.containerId } });
  const [ deleteContainer ] = useMutation(DELETE_CONTAINER_BY_ID, { variables: { id: params.containerId } });
  const [container, setContainer] = React.useState({})

  React.useEffect(() => {
    if (!loading && !error && data.containers) {
      setContainer(data.containers[0]);
    }
  }, [loading, data, error]);


  console.log(container)
  if (loading || !container.name) {
    return <Box sx={{ display: 'flex', justifyContent: 'center'}}> <CircularProgress /> </Box>;
  }

  if (error) {
    return (
      <Typography variant="h4" sx={{ mb: 5 }}>
        Error with container
      </Typography>
    )
  }
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {container.name}
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {`Last modified: ${new Date(container.lastModified).toLocaleString()}`}
        </Typography>
        {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {`Directly contains ${container.childrenConnection.totalCount} containers or items.`}
        </Typography> */}
        {container.parent ? 
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            {`Contained in ${container.parent.name}`}
          </Typography> : null 
        }
      </Typography>

      { container.description?
        <Typography variant="h4" sx={{ mb: 5 }}>
          Description
          <Typography variant="body1" sx={{ mb: 5 }}>
            {container.description}
          </Typography>
        </Typography> : null
      }

    <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowY: 'auto' }}
        >
          <ContentTree id={container.id}/>
    </TreeView>

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
          onClick={deleteContainer}
        >
          Delete
        </Fab>
      </Box>

    </Container>
  );
}

export default ContainerView;