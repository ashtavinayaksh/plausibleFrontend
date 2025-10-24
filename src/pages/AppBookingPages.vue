<template>
  <!-- Website List View -->
  <div class="premium-websites-wrapper" v-if="main_status == 0">
    <!-- Premium Header with Search and Filters -->
    <div class="premium-header">
      <div class="header-top">
        <div class="header-title-section">
          <h1 class="premium-title">
            <span class="title-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient1)" />
                <path
                  d="M16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23Z"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M9 16H23M16 9C17.6569 11.0571 18.5642 13.4762 18.6 16C18.5642 18.5238 17.6569 20.9429 16 23C14.3431 20.9429 13.4358 18.5238 13.4 16C13.4358 13.4762 14.3431 11.0571 16 9Z"
                  stroke="white"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stop-color="#667eea" />
                    <stop offset="100%" stop-color="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            My Websites
          </h1>
          <p class="premium-subtitle">
            <span class="stats-badge">{{ bookings.length }} Active</span>
            Manage and monitor all your connected websites with real-time
            analytics
          </p>
        </div>
        <div class="header-actions">
          <button @click="set_page(1)" class="action-btn-primary">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4.16667V15.8333M4.16667 10H15.8333"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span>Add Website</span>
          </button>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="search-filter-bar">
        <div class="search-box">
          <input
            type="text"
            placeholder="Search websites by domain, timezone..."
            class="search-input"
            v-model="searchQuery"
            @input="filterWebsites"
            @keyup.enter="filterWebsites"
          />
          <!-- Clear button - shows only when there's text -->
          <button
            v-if="searchQuery && searchQuery.length > 0"
            @click="clearSearch"
            class="search-clear-btn"
            title="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="filter-group">
          <select class="filter-select" v-model="sortBy" @change="sortWebsites">
            <option value="recent">Recently Added</option>
            <option value="visitors">Most Visitors</option>
            <option value="name">Alphabetical</option>
          </select>
          <button
            class="view-toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="2"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="12"
                y="2"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="2"
                y="12"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="12"
                y="12"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </button>
          <button
            class="view-toggle-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Overview Cards -->
    <div class="stats-overview" v-if="bookings.length > 0">
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Total Websites</span>
          <h3 class="stat-value">{{ bookings.length }}</h3>
          <span class="stat-change positive">+2 this month</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Total Visitors</span>
          <h3 class="stat-value">{{ getTotalVisitors() }}</h3>
          <span class="stat-change positive">+18.2% vs last month</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 12H18L15 21L9 3L6 12H2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Avg. Performance</span>
          <h3 class="stat-value">98.5%</h3>
          <span class="stat-change positive">+2.1% uptime</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Active Today</span>
          <h3 class="stat-value">{{ bookings.length }}</h3>
          <span class="stat-change neutral">All systems running</span>
        </div>
      </div>
    </div>

    <!-- Websites Grid/List View -->
    <div class="websites-container" v-if="filteredBookings.length > 0">
      <div
        :class="[
          'websites-layout',
          viewMode === 'grid' ? 'grid-view' : 'list-view',
        ]"
      >
        <div
          class="premium-website-card"
          v-for="website in filteredBookings"
          :key="website.web_id"
        >
          <!-- Card Header -->
          <div class="card-header-premium">
            <div class="website-badge">
              <div class="badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    width="24"
                    height="24"
                    rx="6"
                    fill="url(#cardGradient)"
                  />
                  <path
                    d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                  <path
                    d="M7 12H17M12 7C13.1046 8.68333 13.6569 10.5833 13.6667 12C13.6569 13.4167 13.1046 15.3167 12 17C10.8954 15.3167 10.3431 13.4167 10.3333 12C10.3431 10.5833 10.8954 8.68333 12 7Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                  <defs>
                    <linearGradient
                      id="cardGradient"
                      x1="0"
                      y1="0"
                      x2="24"
                      y2="24"
                    >
                      <stop offset="0%" stop-color="#667eea" />
                      <stop offset="100%" stop-color="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-content">
                <h3 class="website-domain">{{ website.web_link }}</h3>
                <span class="website-status">
                  <span class="status-dot active"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          <!-- Card Stats Grid -->
          <div class="card-stats-grid">
            <div class="stat-box">
              <div class="stat-box-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M9 4.5V9L12 10.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div class="stat-box-content">
                <span class="stat-box-value">{{ website.visitors || 0 }}</span>
                <span class="stat-box-label">Visitors</span>
              </div>
            </div>

            <div class="stat-box">
              <div class="stat-box-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 10H13M10 7V13M21 21L15 15M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="stat-box-content">
                <span class="stat-box-value">{{ getRandomPageviews() }}</span>
                <span class="stat-box-label">Pageviews</span>
              </div>
            </div>

            <div class="stat-box">
              <div class="stat-box-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <circle
                    cx="9"
                    cy="9"
                    r="2.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
              <div class="stat-box-content">
                <span class="stat-box-value">{{ getRandomBounceRate() }}%</span>
                <span class="stat-box-label">Bounce Rate</span>
              </div>
            </div>

            <div class="stat-box">
              <div class="stat-box-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 1.5V3.75M9 14.25V16.5M3.75 9H1.5M16.5 9H14.25M13.7175 13.7175L12.1875 12.1875M13.7175 4.2825L12.1875 5.8125M4.2825 13.7175L5.8125 12.1875M4.2825 4.2825L5.8125 5.8125"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="9"
                    cy="9"
                    r="3"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
              <div class="stat-box-content">
                <span class="stat-box-value">{{
                  website.web_timezone.split("/")[1] || "UTC"
                }}</span>
                <span class="stat-box-label">Timezone</span>
              </div>
            </div>
          </div>

          <!-- Card Footer Actions -->
          <div class="card-footer-premium">
            <div class="card-actions-premium">
              <a
                :href="'/web_report/' + website.web_id"
                class="action-link primary"
                title="View Analytics"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <circle
                    cx="9"
                    cy="9"
                    r="2.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <span>Analytics</span>
              </a>
              <button
                @click="copy_url(website)"
                class="action-link success"
                title="Copy Script"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M15 6.75H8.25C7.42157 6.75 6.75 7.42157 6.75 8.25V15C6.75 15.8284 7.42157 16.5 8.25 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V8.25C16.5 7.42157 15.8284 6.75 15 6.75Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M3.75 11.25H3C2.17157 11.25 1.5 10.5784 1.5 9.75V3C1.5 2.17157 2.17157 1.5 3 1.5H9.75C10.5784 1.5 11.25 2.17157 11.25 3V3.75"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{
                  copiedWebsiteId === website.web_id ? "Copied" : "Script"
                }}</span>
              </button>
              <button
                @click="del_item1(website)"
                class="action-link danger"
                title="Delete"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2.25 4.5H15.75M7.5 8.25V12.75M10.5 8.25V12.75M3.75 4.5L4.5 14.25C4.5 14.8467 4.98726 15.3333 5.58333 15.3333H12.4167C13.0127 15.3333 13.5 14.8467 13.5 14.25L14.25 4.5M6.75 4.5V3C6.75 2.58579 7.08579 2.25 7.5 2.25H10.5C10.9142 2.25 11.25 2.58579 11.25 3V4.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <!-- Performance Bar -->
          <div class="performance-bar">
            <div
              class="performance-fill"
              :style="{ width: getRandomPerformance() + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Empty State -->
    <div class="premium-empty-state" v-if="filteredBookings.length === 0">
      <div class="empty-illustration">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#F7FAFC" />
          <circle cx="100" cy="100" r="60" fill="#EDF2F7" />
          <path
            d="M100 140C122.091 140 140 122.091 140 100C140 77.9086 122.091 60 100 60C77.9086 60 60 77.9086 60 100C60 122.091 77.9086 140 100 140Z"
            stroke="#CBD5E0"
            stroke-width="4"
          />
          <path
            d="M60 100H140M100 60C106.675 71.7257 110.535 85.2153 111 100C110.535 114.785 106.675 128.274 100 140C93.3249 128.274 89.4651 114.785 89 100C89.4651 85.2153 93.3249 71.7257 100 60Z"
            stroke="#CBD5E0"
            stroke-width="4"
          />
        </svg>
      </div>
      <h3 class="empty-title">
        {{ searchQuery ? "No websites found" : "Start Your Analytics Journey" }}
      </h3>
      <p class="empty-description">
        {{
          searchQuery
            ? "Try adjusting your search criteria or clear the search to see all websites"
            : "Add your first website and unlock powerful insights into your traffic, user behavior, and performance metrics."
        }}
      </p>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="empty-cta-btn secondary"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>Clear Search</span>
      </button>
      <button v-else @click="set_page(1)" class="empty-cta-btn">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4.16667V15.8333M4.16667 10H15.8333"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>Add Website</span>
      </button>
    </div>

    <!-- Premium Pagination -->
    <div
      class="premium-pagination"
      v-if="totalRecords > count && filteredBookings.length > 0"
    >
      <div class="pagination-info-premium">
        <span class="info-text"
          >Showing <strong>{{ filteredBookings.length }}</strong> of
          <strong>{{ totalRecords }}</strong> websites</span
        >
      </div>
      <div class="pagination-controls-premium">
        <button
          class="page-btn"
          :disabled="page_no === 0"
          @click="getBookList(Math.max(0, page_no - 1))"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          class="page-btn"
          :class="{ active: page_no === 0 }"
          @click="getBookList(0)"
        >
          1
        </button>
        <button
          class="page-btn"
          :class="{ active: page_no === 1 }"
          @click="getBookList(1)"
        >
          2
        </button>
        <button
          class="page-btn"
          :class="{ active: page_no === 2 }"
          @click="getBookList(2)"
        >
          3
        </button>
        <span class="page-dots">...</span>
        <button
          class="page-btn"
          @click="getBookList(Math.floor(totalRecords / count))"
        >
          {{ Math.ceil(totalRecords / count) }}
        </button>
        <button
          class="page-btn"
          :disabled="(page_no + 1) * count >= totalRecords"
          @click="getBookList(page_no + 1)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="delModal45" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content premium-modal">
          <div class="modal-header-premium">
            <div class="modal-icon-danger">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h5 class="modal-title-premium">Delete Website?</h5>
            <button
              type="button"
              class="modal-close-btn"
              data-bs-dismiss="modal"
              id="btclose45"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="modal-body-premium">
            <p>
              Are you sure you want to delete this website? All analytics data
              and tracking will be permanently removed. This action cannot be
              undone.
            </p>
          </div>
          <div class="modal-footer-premium">
            <button
              type="button"
              class="modal-btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="modal-btn-danger" @click="del_item()">
              Delete Website
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      id="delBt45"
      data-bs-toggle="modal"
      data-bs-target="#delModal45"
      style="display: none"
    ></button>
  </div>

  <!-- Premium Add Website Wizard -->
  <div class="premium-wizard-wrapper" v-if="main_status > 0">
    <div class="wizard-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Add Website</h3>
        <p class="sidebar-subtitle">Follow these steps to start tracking</p>
      </div>

      <div class="sidebar-steps">
        <div
          class="sidebar-step"
          :class="{ active: main_status >= 1, completed: main_status > 1 }"
        >
          <div class="step-indicator">
            <div class="step-number">
              <span v-if="main_status < 2">1</span>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13 4L6 11L3 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="step-line"></div>
          </div>
          <div class="step-info">
            <h4 class="step-name">Website Details</h4>
            <p class="step-desc">Enter your website information</p>
          </div>
        </div>

        <div
          class="sidebar-step"
          :class="{ active: main_status >= 2, completed: main_status > 2 }"
        >
          <div class="step-indicator">
            <div class="step-number">
              <span v-if="main_status < 3">2</span>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13 4L6 11L3 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="step-line"></div>
          </div>
          <div class="step-info">
            <h4 class="step-name">Install Script</h4>
            <p class="step-desc">Add tracking code to your site</p>
          </div>
        </div>

        <div class="sidebar-step" :class="{ active: main_status >= 3 }">
          <div class="step-indicator">
            <div class="step-number">3</div>
          </div>
          <div class="step-info">
            <h4 class="step-name">Verify & Launch</h4>
            <p class="step-desc">Confirm installation</p>
          </div>
        </div>
      </div>

      <div class="sidebar-help">
        <div class="help-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M7.57495 7.5C7.77087 6.94305 8.15758 6.47341 8.66658 6.17426C9.17558 5.87512 9.77403 5.76577 10.3559 5.86558C10.9378 5.96539 11.4656 6.26792 11.8458 6.71959C12.2261 7.17126 12.4342 7.74295 12.4333 8.33333C12.4333 10 9.93328 10.8333 9.93328 10.8333M10 14.1667H10.0083"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="help-content">
          <h5 class="help-title">Need Help?</h5>
          <p class="help-text">Check our documentation or contact support</p>
          <a href="#" class="help-link">View Guide →</a>
        </div>
      </div>
    </div>

    <div class="wizard-content">
      <div class="wizard-content-header">
        <button @click="prev_page()" class="wizard-back-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
        <div class="wizard-progress-bar">
          <div
            class="progress-fill"
            :style="{ width: (main_status / 3) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <!-- Alert Message -->
      <div v-if="msgTxt" class="premium-alert" :class="msgType">
        <div class="alert-icon">
          <svg
            v-if="msgType === 'success'"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.667 5L7.5 14.167L3.333 10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-if="msgType === 'danger'"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="alert-content">
          <p class="alert-message">{{ msgTxt }}</p>
        </div>
        <button class="alert-close" @click="msgTxt = ''">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- Step 1: Website Details -->
      <div class="wizard-step-content" v-if="main_status === 1">
        <div class="step-header">
          <div class="step-icon-large">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#EEF2FF" />
              <path
                d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z"
                stroke="#667eea"
                stroke-width="2"
              />
              <path
                d="M14 24H34M24 14C26.5013 17.8767 28.0456 22.4604 28.1333 24C28.0456 25.5396 26.5013 30.1233 24 34C21.4987 30.1233 19.9544 25.5396 19.8667 24C19.9544 22.4604 21.4987 17.8767 24 14Z"
                stroke="#667eea"
                stroke-width="2"
              />
            </svg>
          </div>
          <h2 class="step-title-large">Website Information</h2>
          <p class="step-description-large">
            Enter your website URL and select your reporting timezone to get
            started
          </p>
        </div>

        <div class="premium-form">
          <div class="form-group-premium">
            <div class="input-wrapper">
              <span class="input-prefix">https://</span>
              <input
                type="text"
                class="form-input-premium with-prefix"
                placeholder="example.com"
                v-model="web_link"
                @input="setContent()"
              />
            </div>
            <span class="input-hint-premium"
              >Enter your domain without http:// or https://</span
            >
          </div>

          <div class="form-group-premium">
            <select class="form-select-premium" v-model="web_timezone">
              <option value="">Select your timezone</option>
              <optgroup label="Americas">
                <option value="US/Eastern">(GMT-04:00) Eastern Time</option>
                <option value="US/Central">(GMT-05:00) Central Time</option>
                <option value="US/Mountain">(GMT-06:00) Mountain Time</option>
                <option value="US/Pacific">(GMT-07:00) Pacific Time</option>
                <option value="America/Sao_Paulo">(GMT-03:00) São Paulo</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="Europe/London">(GMT+01:00) London</option>
                <option value="Europe/Paris">(GMT+02:00) Paris</option>
                <option value="Europe/Moscow">(GMT+03:00) Moscow</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="Asia/Dubai">(GMT+04:00) Dubai</option>
                <option value="Asia/Kolkata">(GMT+05:30) India</option>
                <option value="Asia/Shanghai">(GMT+08:00) Shanghai</option>
                <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
              </optgroup>
              <optgroup label="Pacific">
                <option value="Australia/Sydney">(GMT+10:00) Sydney</option>
                <option value="Pacific/Auckland">(GMT+12:00) Auckland</option>
              </optgroup>
            </select>
            <span class="input-hint-premium"
              >All reports will be displayed in this timezone</span
            >
          </div>

          <div class="feature-highlights">
            <div class="feature-item-premium">
              <div class="feature-icon-check">✓</div>
              <span>Real-time visitor tracking</span>
            </div>
            <div class="feature-item-premium">
              <div class="feature-icon-check">✓</div>
              <span>No cookies required</span>
            </div>
            <div class="feature-item-premium">
              <div class="feature-icon-check">✓</div>
              <span>GDPR compliant</span>
            </div>
            <div class="feature-item-premium">
              <div class="feature-icon-check">✓</div>
              <span>Lightweight script (&lt;1KB)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Installation -->
      <div class="wizard-step-content" v-if="main_status === 2">
        <div class="step-header">
          <div class="step-icon-large">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#FEF3C7" />
              <path
                d="M20 28L24 32L34 22M32 14H16C14.8954 14 14 14.8954 14 16V32C14 33.1046 14.8954 34 16 34H32C33.1046 34 34 33.1046 34 32V16C34 14.8954 33.1046 14 32 14Z"
                stroke="#F59E0B"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h2 class="step-title-large">Install Tracking Script</h2>
          <p class="step-description-large">
            Add this snippet to the &lt;head&gt; section of your website
          </p>
        </div>

        <div class="code-installation-section">
          <div class="code-block-premium">
            <div class="code-header-premium">
              <div class="code-tabs">
                <button class="code-tab active">HTML</button>
              </div>
              <button class="copy-button-premium" @click="copy_script()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 5H7C5.89543 5 5 5.89543 5 7V13C5 14.1046 5.89543 15 7 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M3 11H2C1.44772 11 1 10.5523 1 10V2C1 1.44772 1.44772 1 2 1H10C10.5523 1 11 1.44772 11 2V3"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <span>Copy Code</span>
              </button>
            </div>
            <pre
              class="code-content-premium"
            ><code>{{ web_script }}</code></pre>
          </div>

          <div class="installation-steps">
            <h4 class="installation-title">Installation Steps:</h4>
            <div class="installation-step">
              <div class="step-num">1</div>
              <div class="step-text">
                <strong>Copy the script</strong>
                <p>Click the "Copy Code" button above</p>
              </div>
            </div>
            <div class="installation-step">
              <div class="step-num">2</div>
              <div class="step-text">
                <strong>Add to your website</strong>
                <p>Paste it in the &lt;head&gt; section of your HTML</p>
              </div>
            </div>
            <div class="installation-step">
              <div class="step-num">3</div>
              <div class="step-text">
                <strong>Deploy changes</strong>
                <p>Push your changes and verify installation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Verification -->
      <div class="wizard-step-content" v-if="main_status === 3">
        <div class="step-header">
          <div class="step-icon-large success">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#D1FAE5" />
              <path
                d="M34 18L20.5 31.5L14 25"
                stroke="#10B981"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 class="step-title-large">Verifying Installation...</h2>
          <p class="step-description-large">
            Please wait while we check if the tracking script is properly
            installed
          </p>
        </div>

        <div class="verification-status">
          <div class="verification-spinner">
            <div class="spinner"></div>
          </div>
          <p class="verification-text">
            Checking your website configuration...
          </p>

          <div class="verification-checklist">
            <div class="check-item completed">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#10B981"
                  stroke-width="2"
                />
                <path
                  d="M6 10L9 13L14 8"
                  stroke="#10B981"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Script format validated</span>
            </div>
            <div class="check-item completed">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#10B981"
                  stroke-width="2"
                />
                <path
                  d="M6 10L9 13L14 8"
                  stroke="#10B981"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Domain configuration checked</span>
            </div>
            <div class="check-item loading">
              <div class="check-spinner"></div>
              <span>Waiting for first pageview...</span>
            </div>
          </div>

          <div class="manual-verification-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#667eea"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <div>
              <strong>Manual Verification</strong>
              <p>
                If automatic verification fails, you can check the installation
                in your browser's developer console.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wizard Footer Actions -->
      <div class="wizard-footer-actions">
        <button
          v-if="main_status > 1"
          @click="prev_page()"
          class="wizard-btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Previous
        </button>
        <button @click="next_page()" class="wizard-btn-primary">
          {{ main_status === 3 ? "Complete Setup" : "Continue" }}
          <svg
            v-if="main_status < 3"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mainBaseUrl } from "@/apis/appconst";
import { getMyDt } from "@/apis/webapis";
import {
  getBookingList,
  addBooking,
  deleteBookingById,
} from "@/apis/bookingpageapis";

export default {
  name: "AppBookingPages",
  data() {
    return {
      base_url: "",
      bookings: [],
      filteredBookings: [],
      page_no: 0,
      count: "10",
      totalRecords: "0",
      msgType: "",
      msgTxt: "",
      item_id: "",
      main_status: 0,
      ldata: null,
      web_id: "",
      web_link: "",
      web_script: "",
      web_timezone: "",
      web_user: "",
      searchQuery: "",
      sortBy: "recent",
      viewMode: "grid",
      copiedWebsiteId: null,
    };
  },
  methods: {
    setContent() {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.setAttribute("data-domain", this.web_link);
      script.setAttribute("data-api", "http://pls.analytcly.ai/api/event");
      script.src = "http://pls.analytcly.ai/js/script.js";
      this.web_script = script.outerHTML;
    },

    async getMyDtCall() {
      const response = await getMyDt(this.ldata.user_id);
      if (response.status) {
        this.ldata = response.user_dt;
        sessionStorage.setItem("ldata", JSON.stringify(this.ldata));
      }
    },

    async getBookList(page_no) {
      this.page_no = page_no;
      const response = await getBookingList(
        this.page_no,
        this.count,
        this.ldata.user_id
      );
      if (response.status) {
        this.bookings = response.records;
        // Reset search when loading new data
        this.searchQuery = "";
        this.filteredBookings = [...response.records];
        this.totalRecords = response.total1;
      }
    },

    filterWebsites() {
      if (!this.searchQuery || this.searchQuery.trim() === "") {
        this.filteredBookings = [...this.bookings];
      } else {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredBookings = this.bookings.filter((site) => {
          // Search in multiple fields for better results
          return (
            site.web_link.toLowerCase().includes(query) ||
            site.web_timezone.toLowerCase().includes(query) ||
            (site.visitors && site.visitors.toString().includes(query))
          );
        });
      }
      // Apply sorting after filtering
      this.sortWebsites();
    },

    sortWebsites() {
      // Create a copy to avoid mutating the original array
      let sortedBookings = [...this.filteredBookings];

      switch (this.sortBy) {
        case "visitors":
          sortedBookings.sort((a, b) => {
            const visitorsA = parseInt(a.visitors) || 0;
            const visitorsB = parseInt(b.visitors) || 0;
            return visitorsB - visitorsA;
          });
          break;
        case "name":
          sortedBookings.sort((a, b) => a.web_link.localeCompare(b.web_link));
          break;
        case "recent":
        default:
          // If you have a date field, sort by it, otherwise maintain original order
          break;
      }

      this.filteredBookings = sortedBookings;
    },

    clearSearch() {
      this.searchQuery = "";
      this.filterWebsites();
    },

    getTotalVisitors() {
      return this.bookings.reduce(
        (sum, site) => sum + parseInt(site.visitors || 0),
        0
      );
    },

    getRandomPageviews() {
      return Math.floor(Math.random() * 5000) + 1000;
    },

    getRandomBounceRate() {
      return (Math.random() * 30 + 20).toFixed(1);
    },

    getRandomPerformance() {
      return Math.floor(Math.random() * 20) + 80;
    },

    del_item1(bookDt) {
      this.item_id = bookDt.web_id;
      document.getElementById("delBt45").click();
    },

    async del_item() {
      const response = await deleteBookingById(this.item_id);
      if (response.status) {
        document.getElementById("btclose45").click();
        this.getBookList(0);
        this.msgType = "success";
        this.msgTxt = "Website deleted successfully!";
      }
    },

    async next_page() {
      if (this.main_status < 2) {
        if (this.main_status == 1) {
          if (this.web_link.length > 0 && this.web_timezone.length > 0) {
            this.main_status++;
            this.msgType = "success";
            this.msgTxt =
              "Great! Now install the tracking script on your website.";
          } else {
            this.msgType = "danger";
            this.msgTxt = "Please enter website URL and select timezone";
          }
        }
      } else {
        this.create_page();
      }
    },

    copy_url(user) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.setAttribute("data-domain", user.web_link);
      script.setAttribute("data-api", "http://pls.analytcly.ai/api/event");
      script.src = "http://pls.analytcly.ai/js/script.js";

      navigator.clipboard
        .writeText(script.outerHTML)
        .then(() => {
          this.msgType = "success";
          this.msgTxt = "Script copied to clipboard!";
          this.copiedWebsiteId = user.web_id;
          setTimeout(() => {
            this.msgType = "";
            this.msgTxt = "";
            this.copiedWebsiteId = null;
          }, 3000);
        })
        .catch((err) => console.error("Error copying: ", err));
    },

    copy_script() {
      navigator.clipboard
        .writeText(this.web_script)
        .then(() => {
          this.msgType = "success";
          this.msgTxt = "Script copied to clipboard!";
          setTimeout(() => {
            this.msgType = "";
            this.msgTxt = "";
          }, 3000);
        })
        .catch((err) => console.error("Error copying: ", err));
    },

    async create_page() {
      this.msgType = "";
      this.msgTxt = "";

      const response = await addBooking(
        this.web_id,
        this.web_link,
        this.web_script,
        this.web_timezone,
        this.ldata.user_id
      );

      if (response.status) {
        this.msgType = "success";
        this.msgTxt = "Website added successfully!";
        setTimeout(() => {
          this.main_status = 0;
          this.getBookList(0);
          this.web_id = "";
          this.web_link = "";
          this.web_script = "";
          this.web_timezone = "";
        }, 1500);
      } else {
        this.msgType = "danger";
        this.msgTxt = response.message;
      }
    },

    prev_page() {
      if (this.main_status > 1) {
        this.main_status--;
        this.msgType = "";
        this.msgTxt = "";
      } else if (this.main_status === 1) {
        this.main_status = 0;
        this.msgType = "";
        this.msgTxt = "";
      }
    },

    set_page(page) {
      this.main_status = page;
      this.msgType = "";
      this.msgTxt = "";
    },
  },

  created() {
    this.base_url = mainBaseUrl;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.setAttribute("data-domain", this.web_link);
    script.setAttribute("data-api", "http://pls.analytcly.ai/api/event");
    script.src = "http://pls.analytcly.ai/js/script.js";
    this.web_script = script.outerHTML;

    const storedLdata = sessionStorage.getItem("ldata");
    if (storedLdata) {
      this.ldata = JSON.parse(storedLdata);
      this.getMyDtCall();
      this.getBookList(0);
    }
  },
};
</script>

<style scoped>
/* Premium Websites Wrapper */
.premium-websites-wrapper {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 120px);
}

/* Premium Header */
.premium-header {
  margin-bottom: 2rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.header-title-section {
  flex: 1;
  min-width: 300px;
}

.premium-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.5px;
}

.title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.premium-subtitle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

.stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 20px;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn-secondary,
.action-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-btn-secondary {
  background: #ffffff;
  color: #475569;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.action-btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.action-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.action-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

/* Search and Filter Bar */
.search-filter-bar {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1e293b;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input:not(:placeholder-shown) {
  border-color: #667eea;
  background: #fafbff;
}

.search-clear-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border: none;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-clear-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.view-toggle-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94a3b8;
}

.view-toggle-btn:hover {
  border-color: #cbd5e0;
  background: #f8fafc;
}

.view-toggle-btn.active {
  border-color: #667eea;
  background: #eef2ff;
  color: #667eea;
}

/* Stats Overview */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.purple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.stat-icon.blue {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: #ffffff;
}

.stat-icon.green {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: #ffffff;
}

.stat-icon.orange {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: #ffffff;
}

.stat-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-label {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.375rem;
}

.stat-change {
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-change.neutral {
  color: #64748b;
}

/* Websites Layout */
.websites-container {
  margin-bottom: 2rem;
}

.websites-layout.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.websites-layout.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Premium Website Card */
.premium-website-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.premium-website-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  /* background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); */
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.premium-website-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.premium-website-card:hover::before {
  transform: scaleX(1);
}

.card-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.website-badge {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  flex: 1;
}

.badge-icon {
  flex-shrink: 0;
}

.badge-content {
  flex: 1;
  min-width: 0;
}

.website-domain {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.375rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
}

.website-status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.card-menu {
  flex-shrink: 0;
}

.menu-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: none;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

/* Card Stats Grid */
.card-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.stat-box:hover {
  background: #f1f5f9;
}

.stat-box-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #667eea;
}

.stat-box-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.stat-box-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-box-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

/* Card Footer */
.card-footer-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  margin-bottom: 0.75rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.card-actions-premium {
  display: flex;
  gap: 0.5rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-link.primary {
  background: #667eea;
  color: #ffffff;
}

.action-link.primary:hover {
  background: #5568d3;
  color: #ffffff;
}

.action-link.success {
  background: #d1fae5;
  color: #10b981;
}

.action-link.success:hover {
  background: #a7f3d0;
}

.action-link.danger {
  background: #fee2e2;
  color: #ef4444;
}

.action-link.danger:hover {
  background: #fecaca;
}

/* Performance Bar */
.performance-bar {
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.performance-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  border-radius: 10px;
  transition: width 1s ease;
}

/* Premium Empty State */
.premium-empty-state {
  text-align: center;
  padding: 2rem 1rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.empty-illustration {
  margin-bottom: 2rem;
}

.empty-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.empty-description {
  font-size: 1.0625rem;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.empty-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.empty-cta-btn.secondary {
  background: #f8fafc;
  color: #475569;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.empty-cta-btn.secondary:hover {
  background: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Premium Pagination */
.premium-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.pagination-info-premium {
  color: #64748b;
  font-size: 0.9375rem;
}

.info-text strong {
  color: #1e293b;
  font-weight: 700;
}

.pagination-controls-premium {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #cbd5e0;
  background: #f8fafc;
}

.page-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border-color: transparent;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-dots {
  color: #cbd5e0;
  font-weight: 700;
  padding: 0 0.5rem;
}

/* Premium Modal */
.premium-modal {
  border-radius: 20px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header-premium {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: none;
  position: relative;
}

.modal-icon-danger {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #ef4444;
}

.modal-title-premium {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: none;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.modal-body-premium {
  padding: 1rem 2rem 2rem;
  text-align: center;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-footer-premium {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 2rem 2rem;
  border-top: none;
  justify-content: center;
}

.modal-btn-secondary,
.modal-btn-danger {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-btn-secondary {
  background: #f8fafc;
  color: #475569;
}

.modal-btn-secondary:hover {
  background: #e2e8f0;
}

.modal-btn-danger {
  background: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.modal-btn-danger:hover {
  background: #dc2626;
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

/* Premium Wizard Wrapper */
.premium-wizard-wrapper {
  display: flex;
  min-height: calc(100vh - 120px);
  background: #f8fafc;
  padding: 1rem;
  gap: 1rem;
}

/* Wizard Sidebar */
.wizard-sidebar {
  width: 320px;
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 2.5rem;
}

.sidebar-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.sidebar-subtitle {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0;
}

/* Sidebar Steps */
.sidebar-steps {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-step {
  display: flex;
  gap: 1rem;
  position: relative;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.sidebar-step.active .step-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.sidebar-step.completed .step-number {
  background: #10b981;
  color: #ffffff;
}

.step-line {
  width: 2px;
  flex: 1;
  background: #e2e8f0;
  margin: 0.5rem 0;
  transition: all 0.3s ease;
}

.sidebar-step.completed .step-line {
  background: #10b981;
}

.step-info {
  flex: 1;
  padding-top: 0.5rem;
}

.step-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.step-desc {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
}

.sidebar-step.active .step-name {
  color: #667eea;
}

/* Sidebar Help */
.sidebar-help {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  gap: 1rem;
}

.help-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #eef2ff;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.help-content {
  flex: 1;
}

.help-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.help-text {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.help-link {
  font-size: 0.8125rem;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

.help-link:hover {
  text-decoration: underline;
}

/* Wizard Content */
.wizard-content {
  flex: 1;
  background: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.wizard-content-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.wizard-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #f8fafc;
  color: #475569;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wizard-back-btn:hover {
  background: #e2e8f0;
}

.wizard-progress-bar {
  flex: 1;
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
}

/* Premium Alert */
.premium-alert {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  position: relative;
}

.premium-alert.success {
  background: #d1fae5;
  border-left: 4px solid #10b981;
}

.premium-alert.danger {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
}

.alert-icon {
  flex-shrink: 0;
}

.premium-alert.success .alert-icon {
  color: #10b981;
}

.premium-alert.danger .alert-icon {
  color: #ef4444;
}

.alert-content {
  flex: 1;
}

.alert-message {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: inherit;
}

.alert-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.alert-close:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Wizard Step Content */
.wizard-step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.step-header {
  text-align: center;
  margin-bottom: 3rem;
}

.step-icon-large {
  margin: 0 auto 1.5rem;
  display: inline-flex;
}

.step-title-large {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.step-description-large {
  font-size: 1.0625rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Premium Form */
.premium-form {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
}

.form-group-premium {
  margin-bottom: 2rem;
}

.form-label-premium {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 1.25rem;
  font-size: 0.9375rem;
  color: #94a3b8;
  font-weight: 600;
  pointer-events: none;
}

.form-input-premium,
.form-select-premium {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s ease;
  background: #ffffff;
  font-weight: 500;
}

.form-input-premium.with-prefix {
  padding-left: 5.5rem;
}

.form-input-premium:focus,
.form-select-premium:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-hint-premium {
  display: block;
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-top: 0.5rem;
  font-weight: 500;
}

/* Feature Highlights */
.feature-highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.feature-item-premium {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
}

.feature-item-premium span {
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
}

/* Code Installation Section */
.code-installation-section {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.code-block-premium {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  margin-bottom: 2rem;
}

.code-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #1e293b;
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
}

.code-tab {
  padding: 0.5rem 1rem;
  background: transparent;
  color: #94a3b8;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-tab.active {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.copy-button-premium {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button-premium:hover {
  background: rgba(255, 255, 255, 0.2);
}

.code-content-premium {
  margin: 0;
  padding: 2rem;
  background: #0f172a;
  overflow-x: auto;
  max-height: 400px;
}

.code-content-premium code {
  font-family: "Monaco", "Menlo", "Courier New", monospace;
  font-size: 0.875rem;
  color: #e2e8f0;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Installation Steps */
.installation-steps {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.installation-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.25rem 0;
}

.installation-step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.installation-step:last-child {
  margin-bottom: 0;
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-text strong {
  display: block;
  font-size: 0.9375rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.step-text p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Platform Guides */
.platform-guides {
  padding: 1.5rem;
  background: #eef2ff;
  border-radius: 12px;
}

.guides-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.guide-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.guide-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #ffffff;
  color: #667eea;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.guide-link:hover {
  background: #f8fafc;
  color: #5568d3;
  transform: translateY(-2px);
}

/* Verification Status */
.verification-status {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.verification-spinner {
  margin: 2rem auto;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.verification-text {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.verification-checklist {
  text-align: left;
  margin-bottom: 2rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #475569;
}

.check-item.completed {
  background: #d1fae5;
  color: #10b981;
}

.check-item.loading {
  background: #fef3c7;
  color: #f59e0b;
}

.check-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #fde68a;
  border-top: 2px solid #f59e0b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

.manual-verification-box {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #eef2ff;
  border-left: 4px solid #667eea;
  border-radius: 12px;
  text-align: left;
}

.manual-verification-box svg {
  flex-shrink: 0;
  color: #667eea;
}

.manual-verification-box strong {
  display: block;
  font-size: 0.9375rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.manual-verification-box p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

/* Wizard Footer Actions */
.wizard-footer-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
}

.wizard-btn-secondary,
.wizard-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wizard-btn-secondary {
  background: #f8fafc;
  color: #475569;
}

.wizard-btn-secondary:hover {
  background: #e2e8f0;
}

.wizard-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.wizard-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .premium-wizard-wrapper {
    flex-direction: column;
  }

  .wizard-sidebar {
    width: 100%;
  }

  .sidebar-steps {
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar-step {
    min-width: 200px;
  }

  .step-line {
    width: 100%;
    height: 2px;
  }
}

@media (max-width: 991px) {
  .premium-websites-wrapper,
  .premium-wizard-wrapper {
    padding: 1.5rem;
  }

  .premium-title {
    font-size: 2rem;
  }

  .header-top {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    width: 100%;
  }

  .action-btn-secondary,
  .action-btn-primary {
    flex: 1;
    justify-content: center;
  }

  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .websites-layout.grid-view {
    grid-template-columns: 1fr;
  }

  .premium-pagination {
    flex-direction: column;
    gap: 1rem;
  }

  .card-stats-grid {
    grid-template-columns: 1fr;
  }

  .feature-highlights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .premium-websites-wrapper,
  .premium-wizard-wrapper {
    padding: 1rem;
  }

  .premium-title {
    font-size: 1.5rem;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .search-filter-bar {
    flex-direction: column;
  }

  .card-actions-premium {
    flex-direction: column;
  }

  .action-link {
    width: 100%;
    justify-content: center;
  }

  .wizard-sidebar {
    padding: 1.5rem;
  }

  .wizard-content {
    padding: 1.5rem;
  }

  .wizard-footer-actions {
    flex-direction: column;
  }

  .wizard-btn-secondary,
  .wizard-btn-primary {
    width: 100%;
    justify-content: center;
  }

  .step-title-large {
    font-size: 1.5rem;
  }
}
</style>
