import React from 'react';
import { Badge, Button } from 'reactstrap';

const SavedEvent = (props) => {
  return (
    <div>
      <Button color="primary" outline>
          <div>{props.title}</div>
          <Badge color="secondary"></Badge>
      </Button>
    </div>
  );
}

export default SavedEvent;