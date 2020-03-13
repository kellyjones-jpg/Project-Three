import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as dateFns from 'date-fns';
import format from 'date-fns/format';
import CalendarDetail from './Form.js';
import SavedEvent from './Event.js'

const fakeApp = {

    20200305: [
        {
            title: "",
            timeStart: "",
            timeEnd: "",
            appointmentDetails: ""
        }
    ]

}

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedId: 0,
        dayModal: "",
        modal: false,
        title: "",
        timeStart: "",
        timeEnd: "",
        appointmentDetails: "",
        temp: {}
    };


    componentDidMount() {
        this.renderAppointments()
    }

    renderAppointments() {
        axios.get('/api/db')
            .then(res => {
                console.log(res.data)
                this.setState({ event: res.data })


            })


        // call the db get all the appointmentes and when back update the state
    }


    //changes the view of the modal
    toggle = day => {
        this.setState({
            modal: !this.state.modal,
            selectedDate: day,
            dayModal: format(day, "MMMM do, yyy"),
            title: "", timeStart: "", timeEnd: "", appointmentDetails: ""
        });
    }
    //changes the view of the modal
    handleClickApp = e => {
        /// call the db and pass the info for the id then update the state
        e.stopPropagation();
        console.log(e)
        let id = 1
        axios.get('/:id', {

        })
        this.setState({ modal: !this.state.modal, selectedId: id, title: "xxxx", timeStart: "08:00", timeEnd: "09:00", appointmentDetails: "testing" });
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
        let dayTemp = format(this.state.selectedDate, 'yyyyMMdd')
        let newAppointment = {
            day: dayTemp,
            title: this.state.title,
            timeStart: this.state.timeStart,
            timeEnd: this.state.timeEnd,
            appointmentDetails: this.state.appointmentDetails
        }
        // API call to create db pass the object newAppointment then when back you update state
        axios.post('/api/db', newAppointment)
            .then((response) => {
                axios.get('/api/db')
                    .then(res => {
                        console.log(res.data)
                        this.setState({ event: res.data })


                    })
                console.log(response);
                // Update local state with new object
                // OR just pull the whole db down
            })
            .catch(function (error) {
                console.log(error);
            });
        // update db
        // db.create(newEvent).then(res => this.setState.events(res))
        // on response, update state

        console.log("selected day:", dayTemp)
        this.setState({
            temp: {
                ...this.state.temp,
                [dayTemp]: [
                    {
                        title: this.state.title,
                        timeStart: this.state.timeStart,
                        timeEnd: this.state.timeEnd,
                        appointmentDetails: this.state.appointmentDetails
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
                // console.log(formattedDate)
                // console.log(day)
                // console.log(startDate)
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

                        {/* // rendering a single day
// iterate through this.state.event 
//if this.state.event.day = the day we are rendering then print out saved event */}
                        {this.state.event &&
                            //  console.log(format(day, 'yyyyMMdd'))

                            this.state.event.map(appt => {
                                return appt.day == format(day, "yyyyMMdd") &&
                                    <SavedEvent
                                        title={appt.title}
                                        id={appt._id}
                                        handleClickApp={this.handleClickApp}
                                    />
                            }
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