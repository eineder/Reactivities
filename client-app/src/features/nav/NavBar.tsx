import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export function NavBar() {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
