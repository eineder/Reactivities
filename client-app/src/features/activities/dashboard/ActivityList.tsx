import React, { SyntheticEvent, useState } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState('');

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    deleteActivity(id);
    setTarget(event.currentTarget.name);
  }

  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((a) => (
          <Item key={a.id}>
            <Item.Content>
              <Item.Header as="a">{a.title}</Item.Header>
              <Item.Meta>{a.date}</Item.Meta>
              <Item.Description>
                <div>{a.description}</div>
                <div>
                  {a.city}, {a.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(a.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={a.id}
                  onClick={(event) => handleActivityDelete(event, a.id)}
                  loading={submitting && target === a.id}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic={true} content={a.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
