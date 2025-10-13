<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-md">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Calendar</h3>
          </div>
          <div class="nk-block-head-content">
            <a class="btn btn-success" data-bs-toggle="modal" style="border-radius: 0.6rem;"
            data-bs-target="#modalForm">
              <em class="icon ni ni-plus"></em>
              <span>New Event</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nk-block">
        <div class="card card-bordered"  style="border-radius: 1.5rem;">
          <div class="card-inner">
            <BookCalender @day-click="handleDayClick" />
          </div>
        </div>
      </div>
      <div v-if="selectedEvent" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.5)">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Event Details</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p>
                <strong>Title:</strong> {{ selectedEvent.title }}
              </p>
              <p>
                <strong>Date:</strong> {{ selectedEvent.date }}
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="deleteEvent">Delete Event</button>
              <button class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="modalForm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Event</h5><a href="#" class="close" data-bs-dismiss="modal"
                            aria-label="Close"><em class="icon ni ni-cross"></em></a>
                    </div>
                    <div class="modal-body">
                        <form action="#" class="form-validate is-alter">
                            <div class="form-group"><label class="form-label" for="full-name">Title</label>
                                <div class="form-control-wrap"><input type="text" class="form-control" id="Title"
                                        required></div>
                            </div>
                            <div class="row g-gs">
                              <div class="col-sm-6">
                                  <div class="form-group">
                                      <label class="form-label" for="email-address">Start Date</label>
                                        <div class="form-control-wrap"><input type="date" class="form-control"
                                                id="email-address" required></div>
                                    </div>
                              </div>
                        <div class="col-sm-6">
                            <div class="form-group"><label class="form-label" for="email-address">Start Time</label>
                                <div class="form-control-wrap"><input type="time" class="form-control"
                                        id="email-address" required></div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row g-gs">
                        <div class="col-sm-6">
                            <div class="form-group"><label class="form-label" for="phone-no">End Date</label>
                                <div class="form-control-wrap"><input type="date" class="form-control" id="phone-no">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group"><label class="form-label" for="email-address">End Time</label>
                                <div class="form-control-wrap"><input type="time" class="form-control"
                                        id="email-address" required></div>
                            </div>
                        </div>
                    </div>
                    <br>
                            <div class="form-group"><label class="form-label" for="pay-amount">Email or Phone Number</label>
                                <div class="form-control-wrap"><input type="number" class="form-control"
                                        id="pay-amount"></div>
                            </div>
                            
                                <div class="form-group">
                                    <label class="form-label" for="page_desc">Description
                                        (Optional)</label>
                                    <div class="form-control-wrap">
                                        <textarea class="form-control no-resize" v-model="brand_desc" id="page_desc"></textarea>
                                    </div>
                                </div>
                            <div class="form-group">
                              <button type="submit" class="btn btn-lg btn-success" style="border-radius: 0.6rem;">
                                Create
                            </button>
                          </div>
                        </form>
                    </div>
                    <div class="modal-footer bg-light"><span class="sub-text">Modal Footer Text</span></div>
                </div>
            </div>
        </div>
    </div>
  </template>
  <script>
    import {
      mainBaseUrl
    } from '@/apis/appconst';
    
    import BookCalender from "../comps/BookCalender.vue";
    
    export default {
      name: 'AppCalender',
      components: {
        BookCalender,
      },
      data() {
        return {
          base_url: "",
          l1: ["1", "2", "3", "4", "5"],
          
        };
      },
      methods: {
        handleDayClick($day_name) {
          alert($day_name);
        },
      },
      mounted() {
        this.base_url = mainBaseUrl;
      },
    }
  </script>
  <style scoped>
    .calendar {
  max-width: 900px;
  margin: auto;
}
  </style>