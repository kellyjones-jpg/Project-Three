import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const CalendarDetail = (props) => {
    return (
        <Form>

            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                    type="input"
                    name="title"
                    id="title"
                    value={props.title}
                    onChange={props.handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="timeStart">Start</Label>
                <Input
                    type="datetime"
                    name="timeStart"
                    id="timeStart"
                    value={props.start}
                    onChange={props.handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="timeEnd">End</Label>
                <Input
                    type="datetime"
                    name="timeEnd"
                    id="timeEnd"
                    value={props.end}
                    onChange={props.handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="appointmentDetails">Details</Label>
                <Input
                    type="textarea"
                    name="appointmentDetails"
                    id="appointmentDetails"
                    value={props.detail}
                    onChange={props.handleChange}
                />
            </FormGroup>
        </Form>
    );
}

export default CalendarDetail;