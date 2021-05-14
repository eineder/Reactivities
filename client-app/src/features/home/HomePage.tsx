import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Header, Segment, Button } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header inverted as="h2" content="Welcome to Reactivities"></Header>
        <Button as={Link} to="/login" size="huge">
          Login!
        </Button>
      </Container>
    </Segment>
  );
}
