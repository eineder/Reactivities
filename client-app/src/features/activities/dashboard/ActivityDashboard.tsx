import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/stores/Store';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';

interface Props {
  activities: Activity[];
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default observer(function ActivityDashboard({
  activities,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) {
  const { activityStore } = useStore();
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        ></ActivityList>
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
});
