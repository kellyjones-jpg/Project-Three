import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as dateFns from 'date-fns';
import format from 'date-fns/format';
import CalendarDetail from './Form.js';
import SavedEvent from './Event.js'

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        dayModal: "",
        modal: false,
        title: "",
        timeStart: "",
        timeEnd: "",
        appointmentDetails: "",
        temp: {
            20200305: [
                {
                    title: "Grooming",
                    timeStart: "1300",
                    timeEnd: "2:00pm",
                    appointmentDetails: "In Aurora"
                },
                {
                    title: "Vet",
                    timeStart: "3:00pm",
                    timeEnd: "4:00pm",
                    appointmentDetails: "In Aurora"
                }
            ]
        }
    };

    //changes the view of the modal
    toggle = day => {
        this.setState({
            modal: !this.state.modal,
            selectedDate: day,
            dayModal: format(day, "MMMM do, yyy")
        });
    }

    // handleChange - runs on every keystroke in the form to update the React state, the displayed value will update as the user types
    handleChange = event => {
        console.log(event.target)
        let name = event.target.name
        let value = event.target.value
        console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    // the SAVE (substitution of do something button) from the modal click need to call the db and save the info
    // handleSubmit
    handleSave = event => {
        event.preventDefault()
        console.log(this.state)
        // update db
        // db.create(newEvent).then(res => this.setState.events(res))
        // on response, update state
        this.setState({
            temp: {
                ...this.state.temp,
                20200309: [
                    {
                        title: "Pick up",
                        timeStart: "1:00pm",
                        timeEnd: "2:00pm",
                        appointmentDetails: "In Aurora"
                    }
                ]
            }
        })
        // call update db and when back update state cleaning the info
        this.setState({ modal: !this.state.modal, title: "", timeStart: "", timeEnd: "", appointmentDetails: "" });
    }

    //this is rendering the month header with the arrows to change month
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

    //this is rendering the MON-SUN 
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


                        {this.state.temp[format(day, 'yyyyMMdd')] &&
                        //  console.log(format(day, 'yyyyMMdd'))
                            this.state.temp[format(day, 'yyyyMMdd')].map(appt => 
                                <SavedEvent
                                    title={appt.title}
                                />
                            )
                        }

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

    //pops the modal up when a day is clicked
    onDateClick = day => {
        console.log("clicked", day);
        this.toggle(day);
    };

    //when forward arrow is clicked, next month is shown
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    //when back arrow is clicked, next month is shown
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