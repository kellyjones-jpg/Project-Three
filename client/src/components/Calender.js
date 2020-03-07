import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as dateFns from 'date-fns';
import format from 'date-fns/format';
import CalendarDetail from './Form.js'

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        dayModal: "",
        modal: false,
        title: "",
        timeStart: "",
        timeEnd: "",
        appointmentDetails: ""
    };
    ////

    toggle = day => {

        this.setState({
            modal: !this.state.modal,
            selectedDate: day,
            dayModal: format(day, "MMMM do, yyy")
        });
    }

    //
    // the SAVE (sustituion of do something button) from the modal click need to call the db and save the info

    //
    ////

    // handleInput
    handleChange = event => {
        console.log(event.target)
        let name = event.target.name
        let value = event.target.value
        console.log(name, value)
        this.setState({
            [name]: value
        })

    }
    // handleSubmit
    handleSave = event => {
        event.preventDefault()
        console.log(this.state)

        // call update db and when back update state cleaning the info
        this.setState({ modal: !this.state.modal, title: "", timeStart: "", timeEnd: "", appointmentDetails: "" })
    }

    renderHeader() {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }
    renderDays() {
        const dateFormat = "iiii";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    };

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;

                days.push(
                    <div className={`col cell ${
                        !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(cloneDay)}
                    // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        console.log("clicked", day);
        this.toggle(day)
        // setModal(ModalDay)
        // open the modal
        // this.setState({
        //     selectedDate: day
        // });
    };


    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };



    render() {
        return (
            <div>
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>

                <div>
                    <Modal isOpen={this.state.modal} toggle={() => { this.toggle(this.state.selectedDate) }} className={this.props.className}>
                        <ModalHeader toggle={() => { this.toggle(this.state.selectedDate) }}>{this.state.dayModal}</ModalHeader>
                        <ModalBody>
                            <CalendarDetail
                                title={this.state.title}
                                start={this.state.timeStart}
                                end={this.state.timeEnd}
                                detail={this.state.appointmentDetails}
                                handleChange={this.handleChange}

                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSave}>Save</Button>{' '}
                            <Button color="secondary" onClick={() => { this.toggle(this.state.selectedDate) }}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>

        );
    }
}

export default Calendar;