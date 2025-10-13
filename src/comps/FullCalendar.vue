<template>
    <div class="container mt-3">
      <h2>Event Calendar</h2>
      <FullCalendar class="calendar" :options="calendarOptions" />
  
      <!-- Modal for Event Details -->
      <div v-if="selectedEvent" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.5)">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Event Details</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p><strong>Title:</strong> {{ selectedEvent.title }}</p>
              <p><strong>Date:</strong> {{ selectedEvent.date }}</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="deleteEvent">Delete Event</button>
              <button class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        selectedEvent: null,
        calendarOptions: {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: "dayGridMonth",
          selectable: true,
          editable: true,
          events: [
            { id: "1", title: "Meeting", date: "2025-03-01" },
            { id: "2", title: "Workshop", date: "2025-03-10" },
          ],
          eventClick: this.openEventModal,
          dateClick: this.addEvent,
        },
      };
    },
    methods: {
      openEventModal(info) {
        this.selectedEvent = { title: info.event.title, date: info.event.startStr, id: info.event.id };
      },
      closeModal() {
        this.selectedEvent = null;
      },
      deleteEvent() {
        this.calendarOptions.events = this.calendarOptions.events.filter(event => event.id !== this.selectedEvent.id);
        this.selectedEvent = null;
      },
      addEvent(info) {
        const newTitle = prompt("Enter event title:");
        if (newTitle) {
          this.calendarOptions.events.push({ title: newTitle, date: info.dateStr });
        }
      },
    },
  };
  </script>
  
  <style>
  /* FullCalendar styling */
  .calendar {
    max-width: 900px;
    margin: auto;
  }
  </style>
  