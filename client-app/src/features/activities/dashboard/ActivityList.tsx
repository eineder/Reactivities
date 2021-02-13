import React from 'react';
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/layout/models/activity';

interface Props {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

export function ActivityList({ activities, selectActivity }: Props) {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((a) => (
          <Item>
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
                <Label basic={true} content={a.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
