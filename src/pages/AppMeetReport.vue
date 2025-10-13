<template>
    <div class="nk-content-wrap" style="padding-top: 4%; padding-left: 15%; padding-right: 15%; background-color: #f7f7f7;">
      <div class="nk-block-head nk-block-head-md">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h6>Report</h6>
          </div>
          <div class="nk-block-head-content">
            <a class="btn btn-success" style="border-radius: 0.6rem;">
              <em class="icon ni ni-share"></em>
              <span>Share</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">Meeting Details</h4>
            <p v-if="appointDt!=null">
              <strong>Date & Time:</strong> {{ appointDt.appointment_date }}, {{ appointDt.appointment_slot }}
            </p>
            <p v-if="ldata!=null">
              <strong>Organizer:</strong> {{ ldata.name }}
            </p>
            <p v-if="appointDt!=null">
              <strong>Attendees:</strong> {{ appointDt.appointment_customer_name }}
            </p>
            <p v-if="appointDt!=null">
              <strong>Booking Datetime:</strong> {{ appointDt.appointment_datetime }}
            </p>
          </div>
        </div>
      </div>
      <!-- Meeting Summary -->
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">📌 Meeting Summary</h4>
            <p>
              <strong>Objective:</strong> Finalizing the Q2 marketing budget and discussing new campaign ideas.
            </p>
            <h5>Main Discussion Points:</h5>
            <ul class="list list-sm">
              <li>Budget allocation for social media ads.</li>
              <li>Influencer partnerships.</li>
              <li>New email marketing automation tools.</li>
            </ul>
            <h5>Decisions Made:</h5>
            <ul class="list list-sm">
              <li>Increase social media ad spend by 15%.</li>
              <li>Partner with 3 new influencers in Q2.</li>
              <li>Implement AI-powered email segmentation for better conversion rates.</li>
            </ul>
            <h5>Actionable Outcomes:</h5>
            <ul class="list list-sm">
              <li>Bob to finalize the influencer list by March 1st.</li>
              <li>Alice to research AI email tools and present options next week.</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Discussion Log -->
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">📊 Discussion Log</h4>
            <h5>Topic: Budget Allocation for Social Media Ads</h5>
            <p>Bob suggested increasing ad spend by 20%, but after discussion, 15% was agreed upon.</p>
            <p>Alice highlighted that last quarter’s ROI from paid ads was 3.5x.</p>
            <h5>Topic: Influencer Partnerships</h5>
            <p>Dave proposed reaching out to micro-influencers (10K–50K followers).</p>
            <p>Charlie emphasized the need for contract transparency.</p>
          </div>
        </div>
      </div>
      <!-- Sentiment & Engagement Analysis -->
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">📈 Sentiment & Engagement Analysis</h4>
            <p>
              <strong>Overall Sentiment:</strong> Positive
            </p>
            <h5>Speaker Engagement:</h5>
            <ul class="list list-sm">
              <li>Alice spoke 30% of the time</li>
              <li>Bob engaged in 4 major discussions</li>
              <li>Charlie was the most interrupted speaker (5 times)</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Action Items & Next Steps -->
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">📅 Action Items & Next Steps</h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Finalize influencer list</td>
                    <td>Bob</td>
                    <td>March 1</td>
                    <td>
                      <span class="badge badge-danger">High</span>
                    </td>
                    <td>In Progress</td>
                  </tr>
                  <tr>
                    <td>Research AI email tools</td>
                    <td>Alice</td>
                    <td>March 3</td>
                    <td>
                      <span class="badge badge-warning">Medium</span>
                    </td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- AI-Generated Follow-Up Recommendations -->
      <div class="nk-block">
        <div class="card card-bordered" style="border-radius: 1rem;">
          <div class="card-inner">
            <h4 class="title">📩 AI-Generated Follow-Up Recommendations</h4>
            <p>
              <strong>Email Summary Draft:</strong>
            </p>
            <blockquote class="blockquote"> "Dear team, here’s a quick recap of today’s meeting... [AI-generated email]" </blockquote>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import {
      mainBaseUrl
    } from '@/apis/appconst';
    
    import {
      getAppointmentById
    } from '@/apis/appointapi';
    import {
      getMyDt
    } from '@/apis/webapis';
    export default {
      name: 'AppMeetReport',
     
      methods: {
       
        async getMyCall() {
          this.msgType = "";
          this.msgTxt = "";
          const response = await getMyDt(this.appointDt.appointment_vendor);
          if (response.status) {
            this.ldata = response.user;
            this.buss_dt = response.buss_dt;
          }
        },
        async get_pdt() {
          const response1 = await getAppointmentById(this.appoint_id);
          if (response1.status) {
            this.appointDt = response1.appointment;
          }
        }
      },
      data() {
        return {
          base_url: mainBaseUrl,
          appoint_id: "",
          img_url: "",
          buss_dt:null,
          ldata:null,
          appointDt: null
        };
      },
      mounted() {
        this.base_url = mainBaseUrl;
        this.appoint_id = window.location.pathname.split('/').filter(Boolean).pop();
        this.get_pdt();
      }
    };
  </script>
  <style></style>