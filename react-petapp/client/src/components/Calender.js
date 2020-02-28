import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    renderHeader() {}
    renderDays() {}
    
    render() {
        return (
            <div>
                <div>Header</div>
                <div>Days</div>
                <div>Cells</div>
            </div>

        );
    }
}

export default Calendar;