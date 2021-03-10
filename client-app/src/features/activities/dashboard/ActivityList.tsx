import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/Store';

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;
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
        {activitiesByDate.map((a) => (
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
                  as={Link}
                  to={`/activities/${a.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={a.id}
                  onClick={(event) => handleActivityDelete(event, a.id)}
                  loading={loading && target === a.id}
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
});
