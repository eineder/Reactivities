import React, { useState } from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/layout/models/activity';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';

interface Props {
  activities: IActivity[];
  selectedActivity: IActivity | undefined;
  selectActivity: (id: String) => void;
  cancelSelectActivity: () => void;
}

export function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
}: Props) {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
        ></ActivityList>
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          />
        )}
        <ActivityForm></ActivityForm>
      </GridColumn>
    </Grid>
  );
}
