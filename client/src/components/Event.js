import React from 'react';
import { Badge, Button } from 'reactstrap';

const SavedEvent = (props) => {
  return (
    <div >
      <Button onClick={
        props.handleClickApp
      }
        color="primary" outline>
        {props.title}
        <Badge color="secondary"></Badge>
      </Button>
    </div>
  );
}

export default SavedEvent;