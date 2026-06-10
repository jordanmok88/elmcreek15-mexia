(function () {
  "use strict";

  const GREEN = "#1f7a3d";
  const GREEN_DK = "#0f5128";
  const GREEN_SOFT = "#e3f1e6";
  const MUTED = "#5d6b62";

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { family: "Inter", size: 11 }, color: "#16241c" }
      }
    }
  };

  function makeChart(id, config) {
    const canvas = document.getElementById(id);
    if (!canvas || typeof Chart === "undefined") return null;
    return new Chart(canvas, config);
  }

  function initFunnelChart() {
    return makeChart("chartFunnel", {
      type: "bar",
      data: {
        labels: ["Reach", "Engage", "Lead (Call/Text)", "Tour / Showing", "Reserve ($900)"],
        datasets: [{
          label: "Funnel stage (illustrative targets)",
          data: [100, 35, 12, 5, 2],
          backgroundColor: [GREEN_SOFT, "#b8dcc4", GREEN, GREEN_DK, "#0b3f20"],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        ...chartDefaults,
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: "Relative volume (targets — not actuals)", font: { size: 10 } },
            ticks: { font: { size: 10 } }
          },
          y: { ticks: { font: { size: 11, weight: "600" } } }
        },
        plugins: {
          ...chartDefaults.plugins,
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => "Target index: " + ctx.raw + " (assumption for planning)"
            }
          }
        }
      }
    });
  }

  function initChannelMixChart() {
    return makeChart("chartChannelMix", {
      type: "doughnut",
      data: {
        labels: [
          "Listing portals",
          "Local social & groups",
          "Content (video / Pinterest)",
          "Partnerships & referrals",
          "Optional paid layer"
        ],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [GREEN, GREEN_DK, "#3d9a5c", GREEN_SOFT, MUTED],
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          legend: { position: "right", labels: { boxWidth: 12, padding: 10, font: { size: 10 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.label + ": " + ctx.raw + "% effort (organic-first plan)"
            }
          }
        }
      }
    });
  }

  function initTimelineChart() {
    return makeChart("chartTimeline", {
      type: "bar",
      data: {
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"],
        datasets: [
          {
            label: "Syndication & listings",
            data: [90, 70, 40, 30, 25, 20],
            backgroundColor: GREEN,
            borderRadius: 4
          },
          {
            label: "Social & content",
            data: [30, 50, 70, 80, 75, 70],
            backgroundColor: GREEN_DK,
            borderRadius: 4
          },
          {
            label: "Partnerships",
            data: [20, 40, 50, 60, 55, 50],
            backgroundColor: GREEN_SOFT,
            borderRadius: 4
          }
        ]
      },
      options: {
        ...chartDefaults,
        scales: {
          x: { stacked: true, ticks: { font: { size: 10 } } },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 100,
            title: { display: true, text: "Relative effort index", font: { size: 10 } },
            ticks: { font: { size: 10 } }
          }
        },
        plugins: {
          ...chartDefaults.plugins,
          legend: { position: "bottom", labels: { font: { size: 10 } } }
        }
      }
    });
  }

  function initBudgetChart() {
    return makeChart("chartBudget", {
      type: "doughnut",
      data: {
        labels: [
          "Meta traffic / retargeting",
          "Google Search (geo)",
          "Featured listing boosts",
          "Hold / test reserve"
        ],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: [GREEN, GREEN_DK, "#3d9a5c", GREEN_SOFT],
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          legend: { position: "right", labels: { boxWidth: 12, font: { size: 10 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.label + ": " + ctx.raw + "% of optional budget"
            }
          }
        }
      }
    });
  }

  const charts = [];

  function initCharts() {
    charts.push(
      initFunnelChart(),
      initChannelMixChart(),
      initTimelineChart(),
      initBudgetChart()
    );
  }

  function destroyCharts() {
    charts.forEach((c) => c && c.destroy());
    charts.length = 0;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof Reveal === "undefined") return;

    Reveal.initialize({
      hash: true,
      slideNumber: "c/t",
      progress: true,
      center: true,
      transition: "slide",
      backgroundTransition: "fade",
      width: 1280,
      height: 720,
      margin: 0.06
    }).then(function () {
      initCharts();
      Reveal.on("slidechanged", function () {
        charts.forEach((c) => c && c.resize());
      });
    });
  });
})();
