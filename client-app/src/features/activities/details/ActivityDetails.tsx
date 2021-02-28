import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/stores/Store';

interface Props {
  activity: Activity;
}

export function ActivityDetails({ activity }: Props) {
  const { activityStore } = useStore();

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => activityStore.openForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => activityStore.cancelSelectedActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
