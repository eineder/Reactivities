import React from 'react';
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/layout/models/activity';

interface IProps {
  activities: IActivity[];
}

export const ActivityList: React.FC<IProps> = ({ activities }) => {
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
                <Button floated="right" content="View" color="blue"></Button>
                <Label basic={true} content={a.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
