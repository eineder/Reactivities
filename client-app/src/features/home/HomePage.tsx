import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Header, Segment, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/Store';
import LoginForm from '../user/LoginForm';

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
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
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <Fragment>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
            >
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<h1>Register!</h1>)}
              size="huge"
            >
              Register!
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
});
