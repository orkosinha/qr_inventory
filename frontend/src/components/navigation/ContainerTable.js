import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  useQuery,
} from "@apollo/client";
import { GET_ROOT_CONTAINERS } from '../../queries';
import { Link } from 'react-router-dom';

function RootContainers() {
  const { loading, error, data } = useQuery(GET_ROOT_CONTAINERS);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center'}}> <CircularProgress /> </Box>;

  if (error) return <p>Error :</p>;
  const ChildTreeItem = (child) => {
    let result = null;
    if (child.children) {
      result = child.children.map((gchild) =>  ChildTreeItem(gchild));
    }
    return (
      <Link key={child.id} to={child.children? `./container/${child.id}` : `./item/${child.id}`} >
        <TreeItem style={{color: "black"}} key={child.id} nodeId={child.id} label={child.name} onClick={() => console.log(`clicked ${child.name}`)}>{result}</TreeItem>
      </Link>
    );
  };

  return data.containers.map(({ id, name, children }) => (
    <Link key={id} to={children? `./container/${id}` : `./item/${id}`} >
      <TreeItem style={{color: "black"}} key={id} nodeId={id} label={name} onClick={() => console.log(`clicked ${name}`)}>
        { Array.isArray(children)
          ? children.map((child) => ChildTreeItem(child)) : null }
      </TreeItem>
    </Link>
  ));
}

function ContainerTable() {
  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      <RootContainers/>
    </TreeView>
  );
}

export default ContainerTable;