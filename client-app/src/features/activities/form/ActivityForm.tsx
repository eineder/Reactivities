import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/layout/models/activity';

interface Props {
  activity: IActivity | undefined;
  closeForm: () => void;
}

export function ActivityForm({ activity, closeForm }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.Input placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" type="date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
}
