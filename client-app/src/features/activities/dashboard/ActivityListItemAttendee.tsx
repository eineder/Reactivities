import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';

interface Props {
  attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({
  attendees,
}: Props) {
  return (
    <List horizontal>
      {attendees.map((a) => (
        <List.Item key={a.username} as={Link} to={`/profiles/${a.username}`}>
          <Image size='mini' circular src={a.image || '/assets/user.png'} />
        </List.Item>
      ))}
    </List>
  );
});
