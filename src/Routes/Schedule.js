import "../styles/Schedule.css";
import Local from "../components/Local";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const Schedule = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const [todos, setTodos] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [bChecked, setChecked] = useState(false);

  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
  }, []);
  useEffect(() => {
    getEventsList({ allEvents, setAllEvents });
  }, []);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  }, [allEvents]);
  useEffect(() => {
    if (addBtn === true) {
      setAllEvents([...allEvents, newEvent]);
      setNewEvent({ title: "", start: "", end: "" });
    }
    setAddBtn(false);
  }, [addBtn]);

  const getEventsList = ({ allEvents, setAllEvents }) => {
    if (localStorage.getItem("events") === null) {
      localStorage.setItem("events", JSON.stringify([]));
    } else {
      let eventsLocal = JSON.parse(
        localStorage.getItem("events", JSON.stringify(allEvents))
      );
      setAllEvents(eventsLocal);
    }
  };

  const DateInput = ({ placeholder, value, onClick, onChange }) => (
    <input
      className="datepicker"
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      onChange={onChange}
    />
  );

  const addEventHandler = async () => {
    if (newEvent.title !== "" && newEvent.start !== "" && newEvent.end !== "") {
      let endDate = new Date(newEvent.end);
      endDate.setDate(endDate.getDate() + 1);
      setNewEvent({ ...newEvent, end: endDate });
      setAddBtn(true);
      console.log(bChecked);
    }
    // setAllEvents([...allEvents, newEvent2]);
  };
  const selectEventHandler = (event) => {
    if (
      window.confirm(`Do you want to delete this event?\n > ${event.title}`)
    ) {
      deleteEventHandler({ event });
    }
  };
  const deleteEventHandler = ({ event }) => {
    setAllEvents(
      allEvents.filter(
        (el) =>
          el.title !== event.title ||
          el.start !== event.start ||
          el.end !== event.end
      )
    );
  };

  return (
    <div className="Schedule">
      <div className="event-div">
        <p>Add Schedule</p>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          // showPopperArrow={false}
          customInput={<DateInput />}
          placeholderText="Start Date"
          dateFormat="yyyy/MM/dd"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          // showPopperArrow={false}
          customInput={<DateInput />}
          placeholderText="End Date"
          dateFormat="yyyy/MM/dd"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <div className="calendar-check-div">
          <input
            id="checkList"
            type="checkbox"
            checked={bChecked}
            onChange={() => setChecked(!bChecked)}
          />
          <label htmlFor="checkList" className="calendar-checkbox">
            CheckList
          </label>
        </div>
        <button onClick={addEventHandler}>Add</button>
      </div>
      <div className="cal-div">
        <Calendar
          className="calendar"
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={selectEventHandler}
        />
      </div>
    </div>
  );
};

export default Schedule;
