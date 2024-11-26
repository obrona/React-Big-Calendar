import { React, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);



function MyCalendar() {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [eventTitle, setEventTitle] = useState('')
  const [selectEvent, setSelectEvent] = useState(null)

  function handleSelectSlot(slotInfo) {
    setShowModal(true);
    setSelectedDate(slotInfo.start)
    console.log("hello")
  }

  function handleSelectEvent(event) {
    setShowModal(true)
    setSelectEvent(event)
    setEventTitle(event.title)

  }
  function saveEvent() {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = {...selectEvent, title: eventTitle}
        const updatedEvents = events.map(event => {
          return (event === selectEvent) ? updatedEvent : event
        })
        setEvents(updatedEvents)
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, 'hours').toDate()
        }
        setEvents([...events, newEvent])
      }
      setShowModal(false)
      setEventTitle('')
      setSelectEvent(null)
    }
  }

  function deleteEvents() {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent)
      setEvents(updatedEvents)
      setShowModal(false)
      setEventTitle('')
      setSelectEvent(null)
    }
  }
  
  
  
  
  return (
    <div style={{height: '95vh'}} >
      <Calendar
        views={['month']}
        style={{margin: '50px'}}
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        selectable={true}
        onSelectSlot={(slot) => handleSelectSlot(slot)}
        onSelectEvent={(event) => handleSelectEvent(event)}
        popup={true}

      />

      {showModal && (
        <div class="modal" style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', left: 0}}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  {selectEvent ? 'Edit Event' : 'Add Event'}
                </h5>
                <button type="button" class='btn-close' 
                  onClick={() => {
                    setShowModal(false)
                    setEventTitle('')
                    setSelectEvent(null)
                  }}></button>
              </div>
              <div class="modal-body">
                <label>Event Title:</label>
                <input 
                  type='text' 
                  className='form-control' i
                  id='eventTitle' 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                {selectEvent && (
                  <button
                    type='button'
                    className='btn btn-danger me-2'
                    onClick={deleteEvents}
                  >Delete Event</button>
                )}
                <button type="button" onClick={saveEvent} class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { MyCalendar }