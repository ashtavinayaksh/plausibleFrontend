(function ($) {
  "use strict";
  $(function () {
    /* -------------------------------
       PERFORMANCE LINE CHART
    --------------------------------*/
    if ($("#performanceLine").length) {
      const ctx = document.getElementById("performanceLine");
      const graphGradient = ctx.getContext("2d");
      const graphGradient2 = ctx.getContext("2d");
      const saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
      saleGradientBg.addColorStop(0, "rgba(26, 115, 232, 0.18)");
      saleGradientBg.addColorStop(1, "rgba(26, 115, 232, 0.02)");
      const saleGradientBg2 = graphGradient2.createLinearGradient(
        100,
        0,
        50,
        150
      );
      saleGradientBg2.addColorStop(0, "rgba(0, 208, 255, 0.19)");
      saleGradientBg2.addColorStop(1, "rgba(0, 208, 255, 0.03)");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "SUN",
            "sun",
            "MON",
            "mon",
            "TUE",
            "tue",
            "WED",
            "wed",
            "THU",
            "thu",
            "FRI",
            "fri",
            "SAT",
          ],
          datasets: [
            {
              label: "This week",
              data: [
                50, 110, 60, 290, 200, 115, 130, 170, 90, 210, 240, 280, 200,
              ],
              backgroundColor: saleGradientBg,
              borderColor: ["#1F3BB3"],
              borderWidth: 1.5,
              fill: true,
              pointBorderWidth: 1,
              pointRadius: [4],
              pointHoverRadius: [2],
              pointBackgroundColor: "#1F3BB3",
              pointBorderColor: "#fff",
            },
            {
              label: "Last week",
              data: [30, 150, 190, 250, 120, 150, 130, 20, 30, 15, 40, 95, 180],
              backgroundColor: saleGradientBg2,
              borderColor: ["#52CDFF"],
              borderWidth: 1.5,
              fill: true,
              pointBorderWidth: 1,
              pointRadius: [0],
              pointHoverRadius: [0],
              pointBackgroundColor: "#52CDFF",
              pointBorderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { line: { tension: 0.4 } },
          scales: {
            y: {
              border: { display: false },
              grid: { display: true, color: "#F0F0F0", drawBorder: false },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4,
                color: "#6B778C",
                font: { size: 10 },
              },
            },
            x: {
              border: { display: false },
              grid: { display: false },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
                color: "#6B778C",
                font: { size: 10 },
              },
            },
          },
          plugins: { legend: { display: false } },
        },
        plugins: [
          {
            afterDatasetUpdate: function (chart) {
              const chartId = chart.canvas.id;
              const legendId = `${chartId}-legend`;
              const ul = document.createElement("ul");
              for (let i = 0; i < chart.data.datasets.length; i++) {
                ul.innerHTML += `
                <li>
                  <span style="background-color: ${chart.data.datasets[i].borderColor}"></span>
                  ${chart.data.datasets[i].label}
                </li>`;
              }
              const legendEl = document.getElementById(legendId);
              if (legendEl) legendEl.appendChild(ul);
            },
          },
        ],
      });
    }

    /* -------------------------------
       STATUS SUMMARY LINE
    --------------------------------*/
    if ($("#status-summary").length) {
      const statusSummaryChartCanvas =
        document.getElementById("status-summary");
      new Chart(statusSummaryChartCanvas, {
        type: "line",
        data: {
          labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI"],
          datasets: [
            {
              label: "# of Votes",
              data: [50, 68, 70, 10, 12, 80],
              backgroundColor: "#ffcc00",
              borderColor: ["#01B6A0"],
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { line: { tension: 0.4 } },
          scales: {
            y: { display: false, grid: { display: false } },
            x: { display: false, grid: { display: false } },
          },
          plugins: { legend: { display: false } },
        },
      });
    }

    /* -------------------------------
       MARKETING OVERVIEW BAR CHART
    --------------------------------*/
    if ($("#marketingOverview").length) {
      const marketingOverviewCanvas =
        document.getElementById("marketingOverview");
      new Chart(marketingOverviewCanvas, {
        type: "bar",
        data: {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          datasets: [
            {
              label: "Last week",
              data: [
                110, 220, 200, 190, 220, 110, 210, 110, 205, 202, 201, 150,
              ],
              backgroundColor: "#52CDFF",
              borderColor: ["#52CDFF"],
              borderWidth: 0,
              barPercentage: 0.35,
              fill: true,
            },
            {
              label: "This week",
              data: [
                215, 290, 210, 250, 290, 230, 290, 210, 280, 220, 190, 300,
              ],
              backgroundColor: "#1F3BB3",
              borderColor: ["#1F3BB3"],
              borderWidth: 0,
              barPercentage: 0.35,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { line: { tension: 0.4 } },
          scales: {
            y: {
              grid: { display: true, drawTicks: false, color: "#F0F0F0" },
              ticks: { color: "#6B778C", font: { size: 10 } },
            },
            x: {
              stacked: true,
              grid: { display: false },
              ticks: { color: "#6B778C", font: { size: 10 } },
            },
          },
          plugins: { legend: { display: false } },
        },
        plugins: [
          {
            afterDatasetUpdate: function (chart) {
              const chartId = chart.canvas.id;
              const legendId = `${chartId}-legend`;
              const ul = document.createElement("ul");
              for (let i = 0; i < chart.data.datasets.length; i++) {
                ul.innerHTML += `
                <li>
                  <span style="background-color: ${chart.data.datasets[i].borderColor}"></span>
                  ${chart.data.datasets[i].label}
                </li>`;
              }
              const legendEl = document.getElementById(legendId);
              if (legendEl) legendEl.appendChild(ul);
            },
          },
        ],
      });
    }

    /* -------------------------------
       PROGRESS BARS (VISITORS)
    --------------------------------*/
    if ($("#totalVisitors").length) {
      const bar = new ProgressBar.Circle(totalVisitors, {
        color: "#fff",
        strokeWidth: 15,
        trailWidth: 15,
        easing: "easeInOut",
        duration: 1400,
        text: { autoStyleContainer: false },
        from: { color: "#52CDFF", width: 15 },
        to: { color: "#677ae4", width: 15 },
        step: function (state, circle) {
          circle.path.setAttribute("stroke", state.color);
          circle.path.setAttribute("stroke-width", state.width);
          const value = Math.round(circle.value() * 100);
          circle.setText(value === 0 ? "" : value);
        },
      });
      bar.text.style.fontSize = "0rem";
      bar.animate(0.64);
    }

    if ($("#visitperday").length) {
      const bar = new ProgressBar.Circle(visitperday, {
        color: "#fff",
        strokeWidth: 15,
        trailWidth: 15,
        easing: "easeInOut",
        duration: 1400,
        text: { autoStyleContainer: false },
        from: { color: "#34B1AA", width: 15 },
        to: { color: "#677ae4", width: 15 },
        step: function (state, circle) {
          circle.path.setAttribute("stroke", state.color);
          circle.path.setAttribute("stroke-width", state.width);
          const value = Math.round(circle.value() * 100);
          circle.setText(value === 0 ? "" : value);
        },
      });
      bar.text.style.fontSize = "0rem";
      bar.animate(0.34);
    }

    /* -------------------------------
       DOUGHNUT CHART
    --------------------------------*/
    if ($("#doughnutChart").length) {
      const doughnutChartCanvas = document.getElementById("doughnutChart");
      new Chart(doughnutChartCanvas, {
        type: "doughnut",
        data: {
          labels: ["Total", "Net", "Gross", "AVG"],
          datasets: [
            {
              data: [40, 20, 30, 10],
              backgroundColor: ["#1F3BB3", "#FDD0C7", "#52CDFF", "#81DADA"],
              borderColor: ["#1F3BB3", "#FDD0C7", "#52CDFF", "#81DADA"],
            },
          ],
        },
        options: {
          cutout: 90,
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false } },
        },
        plugins: [
          {
            afterDatasetUpdate: function (chart) {
              const chartId = chart.canvas.id;
              const legendId = `${chartId}-legend`;
              const ul = document.createElement("ul");
              for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
                ul.innerHTML += `
                <li>
                  <span style="background-color: ${chart.data.datasets[0].backgroundColor[i]}"></span>
                  ${chart.data.labels[i]}
                </li>`;
              }
              const legendEl = document.getElementById(legendId);
              if (legendEl) legendEl.appendChild(ul);
            },
          },
        ],
      });
    }

    /* -------------------------------
       LEAVE REPORT BAR
    --------------------------------*/
    if ($("#leaveReport").length) {
      const leaveReportCanvas = document.getElementById("leaveReport");
      new Chart(leaveReportCanvas, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Last week",
              data: [18, 25, 39, 11, 24],
              backgroundColor: "#52CDFF",
              borderColor: ["#52CDFF"],
              borderWidth: 0,
              barPercentage: 0.5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              grid: { display: false },
              ticks: { color: "#6B778C", font: { size: 10 } },
            },
            x: {
              grid: { display: false },
              ticks: { color: "#6B778C", font: { size: 10 } },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    }

    /* -------------------------------
       FIXED SAFE NAVBAR/BANNER LOGIC
    --------------------------------*/
    const proBanner = document.querySelector("#proBanner");
    const bannerClose = document.querySelector("#bannerClose");
    const navbar = document.querySelector(".navbar");
    const pageBody = document.querySelector(".page-body-wrapper");

    if (proBanner && navbar && pageBody) {
      if ($.cookie("staradmin2-pro-banner") !== "true") {
        proBanner.classList.add("d-flex");
        navbar.classList.remove("fixed-top");
      } else {
        proBanner.classList.add("d-none");
        navbar.classList.add("fixed-top");
      }

      if (navbar.classList.contains("fixed-top")) {
        pageBody.classList.remove("pt-0");
        navbar.classList.remove("pt-5");
      } else {
        pageBody.classList.add("pt-0");
        navbar.classList.add("pt-5", "mt-3");
      }

      if (bannerClose) {
        bannerClose.addEventListener("click", function () {
          proBanner.classList.add("d-none");
          proBanner.classList.remove("d-flex");
          navbar.classList.remove("pt-5");
          navbar.classList.add("fixed-top");
          pageBody.classList.add("proBanner-padding-top");
          navbar.classList.remove("mt-3");
          const date = new Date();
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
          $.cookie("staradmin2-pro-banner", "true", { expires: date });
        });
      }
    }
  });
})(jQuery);
