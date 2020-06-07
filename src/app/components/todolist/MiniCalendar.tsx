import React from 'react';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';

interface IProps {
    setDate: Function;
    setShowMiniCalendar: Function;
}

interface IState {
    dateObject: moment.Moment;
    selectedDay: Number;
}

export class MiniCalendar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dateObject: moment(),
            selectedDay: 0,
        };
    }
    weekdayshort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    firstDayOfMonth = () => {
        const dateObject = this.state.dateObject;
        const firstDay = moment(dateObject)
            .startOf('month')
            .format('d');
        return firstDay;
    };
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };
    month = () => {
        return this.state.dateObject.format('MMMM');
    };
    year = () => {
        return this.state.dateObject.format('Y');
    };
    currentDay = () => {
        return this.state.dateObject.format('D');
    };
    onPrev = () => {
        this.setState({
            dateObject: this.state.dateObject.subtract(1, 'M'),
        });
    };
    onCurrent = () => {
        this.setState({
            dateObject: moment(),
        });
    };
    onNext = () => {
        this.setState({
            dateObject: this.state.dateObject.add(1, 'M'),
        });
    };
    onDayClick = (d: Number) => {
        this.setState(
            {
                selectedDay: d,
            },
            () => {
                this.props.setDate(
                    `${this.year()}/${this.state.dateObject.format('M')}/${
                        this.state.selectedDay
                    }`
                );
                this.props.setShowMiniCalendar(false);
            }
        );
    };
    render() {
        const weekdayshortname = this.weekdayshort.map((day, index) => {
            return <th key={index}>{day}</th>;
        });
        const blanks = [];
        for (let i = 1; i < Number(this.firstDayOfMonth()); i++) {
            blanks.push(<td key={'blank ' + i}>{''}</td>);
        }
        const daysInMonth = [];
        for (let d = 1; d <= Number(this.daysInMonth()); d++) {
            const currentDay =
                d === Number(this.currentDay()) &&
                this.month() === moment().format('MMMM') &&
                this.year() === moment().format('YYYY')
                    ? '-today'
                    : '';
            daysInMonth.push(
                <td
                    key={d}
                    className={`mini-calendar__days-table__cell${currentDay}`}
                    onClick={() => this.onDayClick(d)}
                >
                    <div>{d}</div>
                </td>
            );
        }
        const totalSlots = [...blanks, ...daysInMonth];
        // tslint:disable-next-line: no-any
        const rows: any = [];
        // tslint:disable-next-line: no-any
        let cells: any = [];
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });
        const daysinmonth = rows.map((day: string, index: number) => {
            return <tr key={index}>{day}</tr>;
        });
        return (
            <div className='mini-calendar'>
                <div className='mini-calendar__navigator'>
                    <div className='mini-calendar__navigator__current-month-year'>
                        {this.month()}
                        &nbsp;
                        {this.year()}
                    </div>
                    <div className='mini-calendar__navigator__buttons'>
                        <FaChevronLeft
                            onClick={() => this.onPrev()}
                            className='mini-calendar__navigator__buttons__icon'
                        />
                        <FiCircle
                            onClick={() => this.onCurrent()}
                            className='mini-calendar__navigator__buttons__icon'
                        />
                        <FaChevronRight
                            onClick={() => this.onNext()}
                            className='mini-calendar__navigator__buttons__icon'
                        />
                    </div>
                </div>
                <table className='mini-calendar__weekdays'>
                    <tbody>
                        <tr key={0}>{weekdayshortname}</tr>
                    </tbody>
                </table>
                <table className='mini-calendar__days-table'>
                    <tbody>{daysinmonth}</tbody>
                </table>
            </div>
        );
    }
}
