import "../styles/Schedule.css";
import {
  Calendar,
  // dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import moment from "moment";

const Schedule = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  // const localizer = dateFnsLocalizer({
  //   format,
  //   parse,
  //   startOfWeek,
  //   getDay,
  //   locales,
  // });
  const events = [
    {
      title: "test1",
      allDay: true,
      start: new Date(2022, 2, 0),
      end: new Date(2022, 2, 0),
    },
    {
      title: "test2",
      start: new Date(2022, 2, 0),
      end: new Date(2022, 2, 0),
    },
    {
      title: "test3",
      start: new Date(2022, 2, 0),
      end: new Date(2022, 2, 0),
    },
  ];
  const [newEvent, setNetEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  return (
    <div className="Schedule">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "100px" }}
      />
    </div>
  );
};

export default Schedule;
