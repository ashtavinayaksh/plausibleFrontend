<template>
  <div class="dashboard-wrapper">
    <!-- Dashboard with Analytics iframe -->
    <div v-if="isDataHv" class="analytics-container">
      <div class="analytics-frame-wrapper">
        <iframe :src="web_url" id="myIframe" class="analytics-iframe"></iframe>
      </div>
    </div>

    <!-- Empty State - No Websites -->
    <div v-if="isDataHv == false" class="empty-state-wrapper">
      <div class="empty-state-card">
        <div class="empty-state-content">
          <!-- Icon Section -->
          <div class="icon-section">
            <div class="icon-circle-wrapper">
              <div class="icon-circle">
                <i class="icon ni ni-calendar-booking empty-icon"></i>
              </div>
              <div class="pulse-ring"></div>
            </div>
          </div>

          <!-- Text Section -->
          <div class="text-section">
            <h2 class="empty-title">No Websites Available</h2>
            <p class="empty-description">
              Start tracking your website analytics by adding your first
              website. Get insights into visitors, pageviews, and more.
            </p>
          </div>

          <!-- Action Button -->
          <div class="action-section">
            <a href="/my_websites" class="add-website-btn">
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 4V16M4 10H16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>Add Your First Website</span>
            </a>
          </div>

          <!-- Features Grid -->
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <div class="feature-content">
                <h4>Real-time Analytics</h4>
                <p>Track visitors in real-time</p>
              </div>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <div class="feature-content">
                <h4>User Insights</h4>
                <p>Understand user behavior</p>
              </div>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <div class="feature-content">
                <h4>Performance</h4>
                <p>Monitor site performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Chat Button -->
  </div>
</template>

<script>
import { reportUrl } from "@/apis/appconst";

import { checkWebUrl } from "@/apis/webapis";

export default {
  name: "AppDash",

  methods: {
    async chkUrlNow() {
      const response = await checkWebUrl(this.web_url);
      if (response.status) {
        this.isDataHv = false;
      }
    },
    clickChatNow() {
      const iframe = document.getElementById("myIframe");
      if (iframe) {
        iframe.contentWindow.postMessage(
          "clickChatButton",
          "https://api.analytcly.ai"
        );
      }
    },
  },
  data() {
    return {
      ldata: null,
      web_id: "",
      web_url: "",
      isDataHv: true,
    };
  },
  created() {
    this.web_id = window.location.pathname.split("/").filter(Boolean).pop();
    if (
      sessionStorage.getItem("ldata") &&
      sessionStorage.getItem("ldata").length > 0
    ) {
      this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
      this.web_url = reportUrl + "" + this.ldata.user_id + "/none";
      this.chkUrlNow();
    }
  },
};
</script>

<style scoped>
/* Dashboard Wrapper */
.dashboard-wrapper {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  position: relative;
}

/* Analytics Container */
.analytics-container {
  width: 100%;
  height: 100vh;
  padding: 0;
}

.analytics-frame-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.analytics-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Empty State Wrapper */
.empty-state-wrapper {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.empty-state-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
}

.empty-state-content {
  padding: 4rem 3rem;
  text-align: center;
}

/* Icon Section */
.icon-section {
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
}

.icon-circle-wrapper {
  position: relative;
  display: inline-block;
}

.icon-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #667eea;
  opacity: 0.6;
  animation: pulse-animation 2s ease-out infinite;
}

@keyframes pulse-animation {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.empty-icon {
  font-size: 3.5rem;
  color: #ffffff;
}

/* Text Section */
.text-section {
  margin-bottom: 2.5rem;
}

.empty-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.empty-description {
  font-size: 1.125rem;
  color: #718096;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Action Button */
.action-section {
  margin-bottom: 3rem;
}

.add-website-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.0625rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}

.add-website-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
  color: #ffffff;
}

.add-website-btn:active {
  transform: translateY(-1px);
}

.btn-icon {
  color: currentColor;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.feature-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  background: #ffffff;
  border-color: #e9ecef;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.feature-content {
  text-align: left;
}

.feature-content h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.feature-content p {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}

/* AI Chat FAB */
.ai-chat-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #1f3bb3 0%, #667eea 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(31, 59, 179, 0.4);
  transition: all 0.3s ease;
  z-index: 9999;
}

.ai-chat-fab:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 12px 32px rgba(31, 59, 179, 0.5);
}

.ai-chat-fab:hover .chat-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-8px);
}

.ai-chat-fab:active {
  transform: scale(1.05);
}

.chat-icon {
  width: 32px;
  height: 32px;
  color: #ffffff;
  z-index: 1;
}

.chat-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(31, 59, 179, 0.4);
  animation: chat-pulse 2s ease-out infinite;
}

@keyframes chat-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.chat-tooltip {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(0);
  background: #2d3748;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chat-tooltip::after {
  content: "";
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left-color: #2d3748;
}

/* Responsive Design */
@media (max-width: 768px) {
  .empty-state-content {
    padding: 3rem 2rem;
  }

  .icon-circle {
    width: 100px;
    height: 100px;
  }

  .pulse-ring {
    width: 100px;
    height: 100px;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .empty-description {
    font-size: 1rem;
  }

  .add-website-btn {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .ai-chat-fab {
    width: 56px;
    height: 56px;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .chat-icon {
    width: 28px;
    height: 28px;
  }

  .chat-tooltip {
    display: none;
  }
}

@media (max-width: 480px) {
  .empty-state-wrapper {
    padding: 1rem;
  }

  .empty-state-card {
    border-radius: 16px;
  }

  .empty-state-content {
    padding: 2rem 1.5rem;
  }

  .icon-circle {
    width: 80px;
    height: 80px;
  }

  .pulse-ring {
    width: 80px;
    height: 80px;
  }

  .empty-icon {
    font-size: 2.5rem;
  }

  .empty-title {
    font-size: 1.25rem;
  }

  .empty-description {
    font-size: 0.9375rem;
  }

  .add-website-btn {
    width: 100%;
    justify-content: center;
  }

  .feature-card {
    padding: 1.25rem;
  }
}
</style>
