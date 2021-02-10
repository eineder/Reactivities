import React, { useState } from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/layout/models/activity';
import { ActivityList } from './ActivityList';

interface IProps {
  activities: IActivity[];
}

export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList activities={activities}></ActivityList>
        {/* <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List> */}
      </GridColumn>
    </Grid>
  );
};
