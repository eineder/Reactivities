import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/Store';
import { ActivityDetails } from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} />
        )}
        {editMode && <ActivityForm />}
      </GridColumn>
    </Grid>
  );
});
