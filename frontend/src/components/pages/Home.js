import * as React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from './Summary';
import { useQuery } from '@apollo/client';
import { ALL_USED_ITEMS, GET_TOTAL_CONTAINER_COUNT, GET_TOTAL_ITEM_COUNT, LAST_MODIFIED_CONTAINER } from '../../queries';

function ItemCount() {
  const { loading, data, error } = useQuery(GET_TOTAL_ITEM_COUNT);
  const [items, setItems] = React.useState(0);

  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        setItems(data.itemsAggregate.quantity.sum);
      }
    }
    
  }, [loading, data, error]);

  if (error) {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Total Items Stored" total="None" color="warning" icon={'ic:twotone-category'} />
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary title="Total Items Stored" total={items} variant="h3" icon={'ic:twotone-category'} />
    </Grid>
  );
}

function ContainerCount() {
  const { loading, data, error } = useQuery(GET_TOTAL_CONTAINER_COUNT);
  const [containers, setContainers] = React.useState(0);
  
  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        setContainers(data.containersAggregate.count);
      }
    }
    
  }, [loading, data, error]);

  if (error) {
    if (error) {
      return (
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Containers" total="None" color="warning" icon={'ic:twotone-inventory-2'} />
        </Grid>
      );
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary title="Total Containers" total={containers} variant="h3" icon={'ic:twotone-inventory-2'} />
    </Grid>
  );
}

function LastModifiedItem() {
  const { loading, data, error } = useQuery(LAST_MODIFIED_CONTAINER);
  const [lastModified, setLastModified] = React.useState("Loading...");

  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        let date = new Date(data.itemsAggregate.lastModified.max).toLocaleDateString();
        setLastModified(date);
      }
    }
    
  }, [loading, data, error]);

  if (error) {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Last Item Moved" total="No Items" color="warning" icon={'carbon:recently-viewed'} />
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary title="Last Item Moved" total={lastModified} variant="h4" icon={'carbon:recently-viewed'} />
    </Grid>
  );
}

function InUseItems() {
  const { loading, data, error } = useQuery(ALL_USED_ITEMS);
  const [inUse, setInUse] = React.useState(0);

  React.useEffect(() => {
    if (!loading) {
      if (!error) {
        setInUse(data.itemsAggregate.count);
      }
    }
  }, [loading, data, error]);

  if (error) {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Items in Use" total="No Items" color="warning" icon={'ic:baseline-outbox'} />
      </Grid>
    );
  }
  
  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary title="Items in Use" total={inUse} variant="h3" icon={'ic:baseline-outbox'} />
    </Grid>   
  );
}

function HomeView() {
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        👋 Hi, Welcome back
      </Typography>

      <Grid container spacing={3}>
        <ItemCount />

        <ContainerCount />

        <LastModifiedItem />

        <InUseItems />
      </Grid>
    </Container>
  );
}

export default HomeView;