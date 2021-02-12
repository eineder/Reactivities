import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

export const ActivityForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.Input placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" type="date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
      </Form>
    </Segment>
  );
};
