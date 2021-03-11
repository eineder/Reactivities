import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { activitiesByDate } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <ActivityListItem
            key={activity.id}
            activity={activity}
          ></ActivityListItem>
        ))}
      </Item.Group>
    </Segment>
  );
});
