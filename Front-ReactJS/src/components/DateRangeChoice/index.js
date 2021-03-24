import React, { Component } from 'react'
import StyleDateRangeChoice from './StyleDateRangeChoice';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import frLocale from 'moment/locale/fr';
import moment from 'moment';

import { DateRangePicker } from 'react-dates';

export default class DateRangeChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          endDate: moment(),
          focusedInput: null,
        };
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }
    componentDidMount() {
        console.log('here in component')
        this.setState({
          startDate: moment(),
          endDate: moment(),
          focusedInput: null,
        });
    }
      
    
    onDatesChange({ startDate, endDate }) {
        this.setState({ 
            startDate: startDate,
            endDate: endDate
        });
        this.props.changeRange({startDate, endDate});
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;
        return (
            <div>
                <StyleDateRangeChoice>
                    <DateRangePicker
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={startDate}
                        endDate={endDate}
                        focusedInput={focusedInput}
                        onDatesChange={this.onDatesChange}
                        onFocusChange={this.onFocusChange}
                    />
                </StyleDateRangeChoice>
            </div>
        )
    }
}
