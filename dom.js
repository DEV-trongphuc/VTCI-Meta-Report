let globalDataCache = null;
const goalMapping = {
    "Lead Form": ["LEAD_GENERATION", "QUALITY_LEAD"],
    Awareness: ["REACH", "AD_RECALL_LIFT", "IMPRESSIONS"],
    Engagement: ["POST_ENGAGEMENT", "THRUPLAY", "EVENT_RESPONSES"],
    Message: ["REPLIES"],
    Traffic: [
      "OFFSITE_CONVERSIONS",
      "LINK_CLICKS",
      "PROFILE_VISIT",
      "LADING_PAGE_VIEWS",
    ],
    Pagelike: ["PAGE_LIKES"],
  },
  resultMapping = {
    REACH: "reach",
    LEAD_GENERATION: "lead",
    QUALITY_LEAD: "lead",
    THRUPLAY: "video_view",
    POST_ENGAGEMENT: "post_engagement",
    PROFILE_VISIT: "link_click",
    LINK_CLICKS: "link_click",
    LADING_PAGE_VIEWS: "link_click",
    REPLIES: "messenger_start",
    IMPRESSIONS: "impressions",
    PAGE_LIKES: "follows",
  },
  sumFields = [
    "spend",
    "reach",
    "impressions",
    "result",
    "-",
    "-",
    "-",
    "follows",
    "reactions",
    "messenger_start",
    "lead",
    "-",
    "post_engagement",
    "video_view",
    "photo_view",
    "comments",
    "post_save",
    "share",
    "link_click",
  ];
let globalData = {},
  startDate = "",
  endDate = "",
  query = "",
  dataFullAdset = [],
  dataCampaignNow = [],
  tableDataGlobal = [],
  dataAdsetNow = [],
  allDatasets = [],
  isViewPerformance = !1,
  isViewOdoo = !1,
  quickID = 0,
  activeCampaignID = 0,
  campaignNOW = "",
  year = 2025,
  adsetNOW = "",
  date_preset = "",
  selectedViewMonthly = "Spend",
  chartSpentType = null,
  dailyChartInstance = null,
  hourlyChartInstance = null,
  genderChartInstance = null,
  ageGenderChartInstance = null,
  regionChartInstance = null,
  reachChartInstance = null,
  businessID = "1455833788582384";
const actionTypes = {
    follows: "like",
    lead: "onsite_conversion.lead_grouped",
    reactions: "post_reaction",
    comments: "comment",
    share: "post",
    link_click: "link_click",
    messenger_start: "onsite_conversion.messaging_conversation_started_7d",
    post_engagement: "post_engagement",
    photo_view: "photo_view",
    video_view: "video_view",
    post_save: "onsite_conversion.post_save",
  },
  menuItems = document.querySelectorAll(".dom_main_menu li"),
  menu = document.querySelector(".dom_main_menu"),
  demoTitleCampaign = document.querySelector(
    ".dom_demographic_title_item.campaign"
  ),
  demoTitleAdset = document.querySelector(".dom_demographic_title_item.adset"),
  impression_chart_ul = document.querySelector(".dom_toplist.device"),
  loading = document.querySelector(".loading"),
  dom_payment_block = document.querySelector(".dom_payment_block"),
  dom_account_view = document.querySelector(".dom_account_view"),
  fixapp = document.querySelector("#fixapp"),
  dom_sidebar = document.querySelector("#dom_sidebar"),
  domPayment = document.querySelector("#dom_payment"),
  domContent = document.querySelector("#dom_content"),
  domOodo = document.querySelector("#dom_oodo"),
  dom_demographic_back = document.querySelector(".dom_demographic_title i"),
  dom_demographic = document.querySelector(".dom_demographic"),
  menuQuick = document.querySelector(".dom_sub_menu"),
  blockSpentChart = document.querySelector(".spent_chart"),
  dom_filter_head_title = document.querySelector(".dom_filter_head h2"),
  timeItems = document.querySelectorAll(".dom_select_show.time li"),
  switchBtns = document.querySelectorAll(".dom_switch_btns p"),
  selecItemTime = document.querySelector(".dom_selected.time"),
  selecItemLead = document.querySelector(".dom_selected.leadchart"),
  selecItemDaily = document.querySelector(".dom_selected.daily"),
  selecItemMonthly = document.querySelector(".dom_selected.monthly"),
  selecItemYearly = document.querySelector(".dom_selected.yearly"),
  selecItemYearlyUl = document.querySelector(".dom_select_show.yearly"),
  selecItemLeadUl = document.querySelector(".dom_select_show.leadchart"),
  selecItemDailyText = document.querySelector(
    ".dom_selected.daily .dom_selected_text"
  ),
  selecItemLeadText = document.querySelector(
    ".dom_selected.leadchart .dom_selected_text"
  ),
  selecItemMonthlyText = document.querySelector(
    ".dom_selected.monthly .dom_selected_text"
  ),
  selecItemYearlyText = document.querySelector(
    ".dom_selected.yearly .dom_selected_text"
  ),
  zoomBtn = document.querySelector(".dom_logo > i"),
  barBtn = document.querySelector(".dom_navbar"),
  dom_total = document.querySelector(".dom_total"),
  dom_totalDemographic = document.querySelector(".dom_total.demographic"),
  table = document.getElementById("main_table"),
  tableBody = document.querySelector("#main_table > tbody"),
  tableHead = document.querySelector("#main_table > thead"),
  tableFooter = document.querySelector("#main_table > tfoot"),
  dom_toplist = document.querySelector(".dom_toplist"),
  dom_toplist_event = document.querySelector(".dom_toplist.event"),
  searchInput = document.querySelector(".dom_search"),
  dom_rpr = document.querySelector(".dom_rpr"),
  dom_cpm = document.querySelector(".dom_cpm"),
  dom_userP = document.querySelector(".dom_user p"),
  dom_userIMG = document.querySelector(".dom_user img"),
  custom_item = document.querySelector(".custom_item"),
  dom_time_show = document.querySelector("#dom_time_show"),
  dom = document.querySelector("#dom"),
  dom_export_main = document.querySelector(".dom_export_main"),
  apply_custom_date = document.querySelector(".apply_custom_date"),
  selectCampaignList = document.querySelector(
    ".dom_selected.campaign .dom_select_show"
  ),
  selectAdsetList = document.querySelector(
    ".dom_selected.adset .dom_select_show"
  ),
  selectCampaign = document.querySelector(".dom_selected.campaign"),
  selectAdset = document.querySelector(".dom_selected.adset"),
  frequency_impression = document.querySelector(
    ".dom_frequency_label_impression"
  ),
  frequency_reach = document.querySelector(".dom_frequency_label_reach"),
  selecedTextTime = document.querySelector(
    ".dom_selected.time .dom_selected_text"
  ),
  selecedTextCampaign = document.querySelector(
    ".dom_selected.campaign .dom_selected_text"
  ),
  selecedTextAdset = document.querySelector(
    ".dom_selected.adset .dom_selected_text"
  ),
  dom_sidebar_overlay = document.querySelector(".dom_sidebar_overlay");
dom_export_main.addEventListener("click", () => {
  let e = document.getElementById("main_table"),
    t = XLSX.utils.book_new(),
    a = XLSX.utils.table_to_sheet(e);
  XLSX.utils.book_append_sheet(t, a, "Sheet1"),
    XLSX.writeFile(t, "table_data.xlsx");
}),
  fixapp.addEventListener("click", () => {
    localStorage.clear(), location.reload();
  }),
  (document.title = `DOM Report - Meta - ${accName}`),
  (dom_userP.textContent = accName),
  (dom_userIMG.src = accAvatar),
  (dom_account_view.innerHTML = `\n          <div class="account_item">\n            <img class="account_item_avatar" src="${accAvatar}">\n            <div class="account_item_info">\n              <p class="account_item_name">${accName}</p>\n              <p class="account_item_id">${adAccountId}</p>\n            </div>\n          </div>\n`);
const toggleClass = (e, t) => {
    e.classList.toggle(t);
  },
  removeClass = (e, t) => {
    e.classList.remove(t);
  };
function removeActiveFrom(e) {
  const t = document.querySelector(e);
  t && t.classList.remove("active");
}
barBtn.addEventListener("click", () => toggleClass(dom_sidebar, "active")),
  dom_sidebar.addEventListener("click", () =>
    removeClass(dom_sidebar, "active")
  ),
  dom_sidebar_overlay.addEventListener("click", () =>
    removeClass(dom_sidebar, "active")
  ),
  zoomBtn.addEventListener("click", () => {
    toggleClass(dom, "zoom"),
      window.innerWidth <= 768 && removeClass(dom, "zoom");
  }),
  selectCampaign.addEventListener("click", () => {
    removeActiveFrom(".dom_selected.adset.active"),
      toggleClass(selectCampaign, "active");
  }),
  dom_demographic_back.addEventListener("click", () =>
    removeClass(dom_demographic, "active")
  ),
  tableBody.addEventListener("click", (e) => {
    const t = e.target.closest(".view_insights");
    if (!t) return;
    const a = t.closest("tr");
    a &&
      handleViewDemographic(
        a.dataset.campaign || "Unknown",
        a.dataset.adset || "Unknown",
        a.dataset.id || 0
      );
  }),
  selectAdset.addEventListener("click", () => {
    removeActiveFrom(".dom_selected.campaign.active"),
      toggleClass(selectAdset, "active");
  });
const debouncedFilter = useDebounce((e) => {
  filterTableByCampaign(e.target.value);
}, 1e3);
searchInput.addEventListener("input", debouncedFilter),
  switchBtns.forEach((e, t) => {
    e.addEventListener("click", () => {
      setActiveOnly(e, ".dom_switch_btns p.active"),
        0 === t
          ? renderTopCampaign(dataCampaignNow)
          : renderTopAdset(dataAdsetNow);
    });
  }),
  document.addEventListener("change", function (e) {
    if ("dom_select_all" === e.target.id) {
      const t = e.target.checked;
      document.querySelectorAll(".dom_select_row").forEach((e) => {
        e.checked = t;
        const a = e.closest("tr");
        a && a.classList.toggle("checked", t);
      });
    } else if (e.target.classList.contains("dom_select_row")) {
      const t = e.target.closest("tr");
      t && t.classList.toggle("checked", e.target.checked);
      const a = document.querySelectorAll(".dom_select_row"),
        n = document.querySelectorAll(".dom_select_row:checked");
      document.getElementById("dom_select_all").checked =
        a.length > 0 && a.length === n.length;
    }
    updateFooterOnCheck(tableDataGlobal);
  }),
  apply_custom_date.addEventListener("click", () => {
    const e = document.getElementById("start").value,
      t = document.getElementById("end").value;
    if (!e || !t) return void alert("Please select both start and end dates.");
    const a = new Date(e),
      n = new Date(t),
      o = new Date(),
      s = new Date();
    s.setMonth(o.getMonth() - 37),
      a > n
        ? alert("Start date cannot be later than the end date.")
        : a < s
        ? alert("Start date cannot be older than 37 months from TODAY.")
        : ((startDate = e),
          (endDate = t),
          setActiveOnly(custom_item, ".dom_select_show.time li.active"),
          (selecedTextTime.textContent = "Custom Date"),
          (date_preset = "custom_date"),
          mainApp());
  }),
  selecItemTime.addEventListener("click", (e) => {
    e.target === selecItemTime && selecItemTime.classList.toggle("active");
  }),
  timeItems.forEach((e, t) => {
    e.addEventListener("click", () => {
      t != timeItems.length - 1 &&
        (e.classList.contains("active")
          ? selecItemTime.classList.remove("active")
          : (setActiveOnly(e, ".dom_select_show.time li.active"),
            (selecedTextTime.textContent = e.textContent.trim()),
            (date_preset = e.dataset.date),
            mainApp(),
            isViewPerformance ||
              document
                .querySelector(".dom_main_menu li")
                ?.classList.contains("active") ||
              document
                .querySelectorAll(".dom_main_menu li")[3]
                ?.classList.contains("active") ||
              (showPerformanceTab(),
              removeActiveOnly(".dom_main_menu li.active"),
              document
                .querySelector(".dom_main_menu li")
                .classList.add("active"),
              removeActiveOnly(".dom_sub_menu li.active"),
              blockSpentChart.classList.remove("none"),
              localStorage.removeItem("viewPerformance"))));
    });
  }),
  selecItemDaily.addEventListener("click", (e) => {
    selecItemDaily.classList.toggle("active");
    const t = e.target.closest("li");
    if (t && !t.classList.contains("active")) {
      setActiveOnly(t, ".dom_select_show.daily li.active");
      const e = t.dataset.view;
      (selecItemDailyText.textContent = e), updateChart(e);
    }
  }),
  selecItemMonthly.addEventListener("click", (e) => {
    selecItemMonthly.classList.toggle("active");
    const t = e.target.closest("li");
    if (t && !t.classList.contains("active")) {
      setActiveOnly(t, ".dom_select_show.monthly li.active");
      const e = t.dataset.view;
      (selecItemMonthlyText.textContent = e), updateChartMonthly(e);
    }
  }),
  selecItemYearly.addEventListener("click", (e) => {
    selecItemYearly.classList.toggle("active");
    const t = e.target.closest("li");
    if (t && !t.classList.contains("active")) {
      setActiveOnly(t, ".dom_select_show.yearly li.active");
      const e = t.dataset.view;
      (selecItemYearlyText.textContent = e), fetchDataMonthly(e, !0);
    }
  }),
  renderTableHead(),
  fetchAdAccountActivities();
const menuOdoo = document.querySelectorAll(".dom_main_menu li")[3];
function showPerformanceTab() {
  domContent.classList.remove("none"),
    domPayment.classList.add("none"),
    domOodo.classList.add("none");
}
function showPaymentTab() {
  domContent.classList.add("none"),
    domPayment.classList.remove("none"),
    domOodo.classList.add("none");
}
async function fetchData(e, t) {
  !isViewOdoo && loading.classList.add("active");
  let a = [],
    n = `https://graph.facebook.com/v22.0/act_${adAccountId}/insights?level=adset&fields=campaign_name,adset_name,adset_id,spend,impressions,reach,actions,optimization_goal&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&time_range={"since":"${e}","until":"${t}"}&access_token=${accessToken}&limit=1000`;
  try {
    for (; n; ) {
      const e = await fetch(n);
      if (!e.ok) throw new Error(`Network error: ${e.statusText}`);
      const t = await e.json();
      if (t.error) return;
      (a = [...a, ...(t.data || [])]),
        (n = t.paging && t.paging.next ? t.paging.next : null);
    }
    return a;
  } catch (e) {}
}
async function fetchDataDaily(e, t) {
  let a = [],
    n = `https://graph.facebook.com/v22.0/act_${adAccountId}/insights?fields=spend,reach,actions,date_start&time_increment=1&time_range={"since":"${e}","until":"${t}"}&access_token=${accessToken}&limit=1000`;
  try {
    for (; n; ) {
      const e = await fetch(n);
      if (!e.ok) throw new Error(`Network error: ${e.statusText}`);
      const t = await e.json();
      if (t.error)
        return void (!isViewOdoo && loading.classList.remove("active"));
      (a = [...a, ...(t.data || [])]),
        (n = t.paging && t.paging.next ? t.paging.next : null);
    }
    return a;
  } catch (e) {}
}
async function fetchDataMonthly(e, t) {
  t && !isViewOdoo && loading.classList.add("active");
  let a = [],
    n = `https://graph.facebook.com/v22.0/act_${adAccountId}/insights?fields=spend,reach,actions,date_start&time_increment=monthly&time_range={"since":"${`${e}-01-01`}","until":"${`${e}-12-31`}"}&access_token=${accessToken}&limit=1000`;
  try {
    for (; n; ) {
      const e = await fetch(n);
      if (!e.ok) throw new Error(`Network error: ${e.statusText}`);
      const t = await e.json();
      if (t.error)
        return void (!isViewOdoo && loading.classList.remove("active"));
      (a = [...a, ...(t.data || [])]),
        (n = t.paging && t.paging.next ? t.paging.next : null);
    }
    handleMonthly(a), t && !isViewOdoo && loading.classList.remove("active");
  } catch (e) {}
}
function handleViewPerformance(e) {
  if (
    (showPerformanceTab(),
    dom.classList.add("isViewPerformance"),
    (isViewPerformance = !0),
    (localStorage.viewPerformance = "1"),
    e)
  )
    return;
  const t = document.querySelector(`.dom_sub_menu li[data-index="${quickID}"]`);
  t && t.click();
}
function renderQuickFilter() {
  const e = document.createDocumentFragment();
  quickFilter.forEach((t, a) => {
    const n = document.createElement("li");
    (n.dataset.filter = t),
      (n.dataset.index = a),
      (n.innerHTML = `<i class="fa-solid fa-bolt"></i><span>${t}</span>`),
      e.appendChild(n);
  }),
    (menuQuick.innerHTML = ""),
    menuQuick.appendChild(e);
}
function updateUIForQuickFilter(e) {
  setActiveOnly(e, ".dom_sub_menu li.active"), (activeCampaignID = 0);
  const t = quickFilter[quickID];
  (dom_filter_head_title.textContent = `Report for ${t}`),
    (selecedTextCampaign.textContent = "Data for all campaigns"),
    (campaignNOW = ""),
    (adsetNOW = "");
  const a = quickFilterData(t);
  renderCampaignRadioBox(a),
    viewFilter(a),
    selectAdset.classList.remove("show"),
    (localStorage.quickID = quickID),
    blockSpentChart.classList.remove("none");
}
function viewFilter(e) {
  menuItems[1].classList.contains("active") ||
    (document
      .querySelector(".dom_main_menu li.active")
      ?.classList.remove("active"),
    menuItems[1].classList.add("active")),
    useData(e),
    switchBtns[Number(!!campaignNOW)].click();
}
function quickFilterData(e, t, a) {
  if (!(isBrand || (e && goalMapping[e])))
    throw new Error("Invalid or missing goal");
  return dataFullAdset.filter(
    (n) =>
      (isBrand
        ? n.campaign_name.toLowerCase().includes(e.toLowerCase())
        : goalMapping[e].includes(n.optimization_goal)) &&
      (!t || n.campaign_name === t) &&
      (!a || n.adset_name === a)
  );
}
function renderTopCampaign(e) {
  if (!e || "object" != typeof e || !dom_toplist) return;
  if ("function" != typeof formatCurrency) return;
  const t = [];
  let a = 0;
  for (const [n, o] of Object.entries(e)) {
    const e = parseFloat(o) || 0;
    e > 0 && (t.push([n, e]), e > a && (a = e));
  }
  if (!t.length) return void dom_toplist.replaceChildren();
  t.sort((e, t) => t[1] - e[1]);
  const n = document.createDocumentFragment();
  for (let e = 0, o = t.length; e < o; e++) {
    const [o, s] = t[e],
      r = document.createElement("li"),
      i = document.createElement("p");
    i.innerHTML = `<span>${o}</span><span>${formatCurrency(s)}</span>`;
    const c = document.createElement("p"),
      l = document.createElement("span");
    l.classList.add("progress-bar"),
      (l.style.width = `${((s / a) * 100).toFixed(2)}%`),
      c.appendChild(l),
      r.appendChild(i),
      r.appendChild(c),
      n.appendChild(r);
  }
  dom_toplist.replaceChildren(n);
}
function getUniqueCampaignNames(e) {
  return Array.isArray(e)
    ? [...new Set(e.map((e) => e.campaign_name).filter(Boolean))]
    : [];
}
function renderCampaignRadioBox(e) {
  if (!e || "object" != typeof e || !selectCampaignList) return;
  const t = getUniqueCampaignNames(e);
  selectCampaignList.innerHTML = [
    '<li class="campaign-item active" data-index="0">\n      <span class="radio_box"></span>\n      <span>Data for all campaigns</span>\n    </li>',
    ...t.map(
      (e, t) =>
        `\n      <li class="campaign-item" data-index="${
          t + 1
        }" data-name="${e}">\n        <span class="radio_box"></span>\n        <span>${e}</span>\n      </li>\n    `
    ),
  ].join("");
}
function renderAdsetinCampaign(e) {
  if (((selectAdsetList.innerHTML = ""), !e?.length)) return;
  const t = document.createDocumentFragment(),
    a = (e, t, a = !1) => {
      const n = document.createElement("li");
      return (
        n.classList.add("adset-item"),
        a && n.classList.add("active"),
        (n.dataset.index = t),
        e && (n.dataset.name = e),
        (n.innerHTML = `\n      <span class="radio_box"></span>\n      <span>${
          e || "Data for all adsets"
        }</span>\n    `),
        n
      );
    };
  t.appendChild(a(null, 0, !0)),
    e.forEach((e, n) => {
      t.appendChild(a(e.adset_name, n + 1));
    }),
    selectAdsetList.appendChild(t);
}
function renderTopEvent(e) {
  if (!e || "object" != typeof e) return;
  (dom_toplist_event.innerHTML = ""),
    e.result &&
      (dom_rpr.textContent = formatNumber((e.reach / e.result).toFixed(0))),
    e.impressions &&
      ((dom_cpm.textContent = formatCurrency(
        ((1e3 * e.spent) / e.impressions).toFixed(0)
      )),
      renderFrequency(e.impressions, e.reach));
  const t = Object.entries(e)
    .filter(([e]) => !["spent", "impressions", "reach", "result"].includes(e))
    .map(([e, t]) => ({ name: e, value: t || 0 }))
    .sort((e, t) => t.value - e.value);
  if (0 === t.length) return;
  const a = t[0].value,
    n = document.createDocumentFragment();
  t.forEach(({ name: e, value: t }) => {
    const o = document.createElement("li"),
      s = document.createElement("p"),
      r = document.createElement("span");
    r.textContent = formatMetricName(e);
    const i = document.createElement("span");
    (i.textContent = formatNumber(t)), s.appendChild(r), s.appendChild(i);
    const c = document.createElement("p"),
      l = document.createElement("span");
    (l.style.width = `${((t / a) * 100).toFixed(2)}%`),
      c.appendChild(l),
      o.appendChild(s),
      o.appendChild(c),
      n.appendChild(o);
  }),
    dom_toplist_event.appendChild(n);
}
function renderFrequency(e, t) {
  const a = t > 0 ? (e / t).toFixed(2) : "0";
  (document.querySelector(".frequency_number").textContent = a),
    document
      .querySelector(".semi-donut")
      .style.setProperty("--percentage", Math.min((a / 4) * 100, 100)),
    (frequency_impression.textContent = e.toLocaleString()),
    (frequency_reach.textContent = t.toLocaleString());
}
function renderTopAdset(e) {
  if (!Array.isArray(e) || 0 === e.length)
    return void dom_toplist.replaceChildren();
  let t = 0;
  const a = [];
  for (let n = 0, o = e.length; n < o; n++) {
    const o = parseFloat(e[n].spend) || 0;
    o > 0 &&
      (a.push({ name: e[n].adset_name || "Unknown", value: o }),
      o > t && (t = o));
  }
  a.sort((e, t) => t.value - e.value);
  const n = document.createDocumentFragment();
  for (let e = 0, o = a.length; e < o; e++) {
    const { name: o, value: s } = a[e],
      r = document.createElement("li"),
      i = document.createElement("p");
    i.innerHTML = `<span>${o}</span><span>${formatCurrency(s)}</span>`;
    const c = document.createElement("p"),
      l = document.createElement("span");
    l.classList.add("progress-bar"),
      (l.style.width = `${((s / t) * 100).toFixed(2)}%`),
      c.appendChild(l),
      r.appendChild(i),
      r.appendChild(c),
      n.appendChild(r);
  }
  dom_toplist.replaceChildren(n);
}
function renderTableHead() {
  tableHead &&
    (tableHead.innerHTML = `<tr>${[
      '<input type="checkbox" id="dom_select_all">',
      "Campaign Name",
      "Adset Name",
      "Insights",
      "Cost Spent",
      "Reach",
      "Impression",
      "Result",
      "CPR",
      "Optimization Goal",
      "Frequency",
      "Follows",
      "Reaction",
      "Messenger Start",
      "Lead",
      "CPM",
      "Engagement",
      "Video view",
      "Photo view",
      "Comments",
      "Post Save",
      "Share",
      "Link Click",
    ]
      .map((e) => `<th>${e}</th>`)
      .join("")}</tr>`);
}
function measureExecutionTime(e, ...t) {
  performance.now();
  const a = e(...t);
  performance.now();
  return a;
}
function processData(e, t) {
  const a = Object.create(null),
    n = Object.create(null),
    o = Object.create(null),
    s = new Set(quickFilter),
    r = new Map(Object.entries(goalMapping)),
    i = new Array(e.length),
    c = new Array(e.length);
  for (const e of r.keys()) n[e] = 0;
  for (let l = 0, d = e.length; l < d; l++) {
    const d = e[l],
      {
        campaign_name: m = "Unknown",
        spend: u = 0,
        optimization_goal: p = "Unknown",
        adset_name: g = "N/A",
        reach: h = 0,
        impressions: _ = 0,
        actions: f = [],
      } = d,
      y = +u || 0;
    if (((a[m] = (a[m] || 0) + y), isBrand && t)) {
      const e = m;
      for (const t of s)
        if (e.toLowerCase().includes(t.toLowerCase())) {
          o[t] = (o[t] || 0) + y;
          break;
        }
    } else
      for (const [e, t] of r)
        if (t.includes(p)) {
          n[e] += y;
          break;
        }
    const b = new Map(f.map((e) => [e.action_type, e.value || 0]));
    (i[l] = {
      id: l,
      campaign_name: m,
      adset_name: g,
      optimization_goal: p,
      spend: y,
      reach: h,
      impressions: _,
      ...Object.keys(actionTypes).reduce(
        (e, t) => ((e[t] = b.get(actionTypes[t]) || 0), e),
        {}
      ),
    }),
      (i[l].result = (resultMapping[p] && i[l][resultMapping[p]]) || 0);
    const v = i[l].result;
    (i[l].frequency = h > 0 ? (_ / h).toFixed(2) : "0"),
      (i[l].cpm = _ > 0 ? ((1e3 * y) / _) | 0 : "0"),
      (i[l].cpr = (y / (v || 1)).toFixed(y / (v || 1) > 50 ? 0 : 1)),
      (c[
        l
      ] = `<tr data-id="${l}" data-campaign="${m}" data-adset="${g}">\n      <td><input type="checkbox" class="dom_select_row" data-id="${l}"></td>\n      <td>${m}</td>\n      <td>${g}</td>\n      <td class="view_insights">\n        <i class="fa-solid fa-magnifying-glass-chart"></i>\n      </td>\n      <td>${formatNumber(
        i[l].spend
      )} ₫</td>\n      <td>${formatNumber(
        i[l].reach
      )}</td>\n      <td>${formatNumber(
        i[l].impressions
      )}</td>\n      <td>${formatNumber(
        i[l].result
      )}</td>\n      <td>${formatNumber(
        i[l].cpr
      )} ₫</td>\n      <td>${formatMetricName(
        i[l].optimization_goal
      )}</td>\n      <td>${i[l].frequency}</td>\n      <td>${
        formatNumber(i[l].follows) || 0
      }</td>\n      <td>${formatNumber(i[l].reactions) || 0}</td>\n      <td>${
        i[l].messenger_start || 0
      }</td>\n      <td>${i[l].lead || 0}</td>\n      <td>${formatNumber(
        i[l].cpm
      )} ₫</td>\n      <td>${
        formatNumber(i[l].post_engagement) || 0
      }</td>\n      <td>${formatNumber(i[l].video_view) || 0}</td>\n      <td>${
        formatNumber(i[l].photo_view) || 0
      }</td>\n      <td>${i[l].comments || 0}</td>\n      <td>${
        i[l].post_save || 0
      }</td>\n      <td>${i[l].share || 0}</td>\n      <td>${
        formatNumber(i[l].link_click) || 0
      }</td>\n    </tr>`);
  }
  return {
    dataFilter: e,
    campaignTotal: a,
    optimizationTotal: n,
    brandTotal: o,
    tableData: i,
    tbodyHTML: c.join(""),
  };
}
function updateFooterOnCheck(e) {
  if (!tableFooter) return;
  const t = document.querySelectorAll(".dom_select_row:checked"),
    a = document.querySelectorAll(".dom_select_row"),
    n = 0 === t.length,
    o = n ? a : t,
    s = new Map(e.map((e) => [e.id, e])),
    r = new Float64Array(sumFields.length);
  for (let e = 0, t = o.length; e < t; e++) {
    const t = 0 | o[e].dataset.id,
      a = s.get(t);
    if (a)
      for (let e = 0; e < sumFields.length; e++)
        "-" !== sumFields[e] && (r[e] += +a[sumFields[e]] || 0);
  }
  let i = `<tr><td colspan="4"><strong>${
    n ? `Total ${a.length} Row` : `Total x${t.length} Selected Row`
  }</strong></td>`;
  for (let e = 0; e < sumFields.length; e++)
    i += `<td>${
      "-" === sumFields[e]
        ? "-"
        : "spend" === sumFields[e]
        ? `${r[e].toLocaleString()} đ`
        : r[e].toLocaleString()
    }</td>`;
  tableFooter.innerHTML = i;
  const c = {
      spent: r[0],
      reach: r[1],
      impressions: r[2],
      post_engagement: r[12],
      lead: r[10],
      message: r[9],
      link_click: r[19],
      reactions: r[8],
      likepage: r[7],
      post_save: r[15],
      video_view: r[13],
      photo_view: r[14],
      comments: r[16],
      share: r[17],
      result: r[3],
    },
    l = calculateMetricByGoal(Array.from(o, (e) => s.get(0 | e.dataset.id)));
  renderMetricTotal(dom_total, c, l), isViewPerformance && renderTopEvent(c);
}
function calculateMetricByGoal(e) {
  const t = Object.create(null);
  for (let a = 0, n = e.length; a < n; a++) {
    const n = e[a],
      o = n.optimization_goal || "Unknown";
    t[o] ||
      (t[o] = {
        spent: 0,
        reach: 0,
        impressions: 0,
        post_engagement: 0,
        lead: 0,
        message: 0,
        link_click: 0,
        reactions: 0,
        likepage: 0,
      });
    const s = t[o];
    (s.spent += +n.spend || 0),
      (s.reach += +n.reach || 0),
      (s.impressions += +n.impressions || 0),
      (s.post_engagement += +n.post_engagement || 0),
      (s.lead += +n.lead || 0),
      (s.message += +n.messenger_start || 0),
      (s.link_click += +n.link_click || 0),
      (s.reactions += +n.reactions || 0),
      (s.likepage += +n.follows || 0);
  }
  return t;
}
function calculateUnit(e, t, a, n = 1) {
  const { spent: o, totalDivisor: s } = e.reduce(
    (e, n) => {
      const o = t[n];
      return o && ((e.spent += o.spent || 0), (e.totalDivisor += o[a] || 0)), e;
    },
    { spent: 0, totalDivisor: 0 }
  );
  return s > 0 ? ((o / s) * n) | 0 : "-";
}
function filterTableByCampaign(e) {
  const t = e.toLowerCase().trim();
  useData(
    dataFullAdset.filter(
      (e) =>
        e.campaign_name.toLowerCase().includes(t) ||
        e.adset_name.toLowerCase().includes(t)
    )
  );
}
function renderMetricTotal(e, t, a) {
  const n = [
    {
      name: "Total Spent",
      icon: "fa-solid fa-sack-dollar",
      type: "Total Spent",
      value: t.spent || t.spend,
      unit: "Spent",
    },
    {
      name: "Total Reach",
      icon: "fa-solid fa-street-view",
      type: "Cost per 1000 Reach",
      value: t.reach,
      unit: calculateUnit(["REACH"], a, "reach", 1e3),
    },
    {
      name: "Total Message",
      icon: "fa-solid fa-photo-film",
      type: "Cost per Message",
      value: t.message || t.messenger_start,
      unit: calculateUnit(["REPLIES"], a, "message"),
    },
    {
      name: "Likepage/Follows",
      icon: "fa-solid fa-thumbs-up",
      type: "Cost per LikePage",
      value: t.likepage || t.follows,
      unit: calculateUnit(["PAGE_LIKES"], a, "likepage"),
    },
    {
      name: "Engagements",
      icon: "fa-solid fa-photo-film",
      type: "Cost per Engagement",
      value: t.post_engagement,
      unit: calculateUnit(["POST_ENGAGEMENT"], a, "post_engagement"),
    },
    {
      name: "Total Impressions",
      icon: "fa-solid fa-eye",
      type: "Awareness CPM",
      value: t.impressions,
      unit: calculateUnit(["REACH"], a, "impressions", 1e3),
    },
    {
      name: "Total Leads",
      icon: "fa-solid fa-bullseye",
      type: "Cost per Lead",
      value: t.lead,
      unit: calculateUnit(["QUALITY_LEAD", "LEAD_GENERATION"], a, "lead"),
    },
    {
      name: "Total Reactions",
      icon: "fa-solid fa-heart",
      type: "Cost per Reaction",
      value: t.reactions,
      unit: calculateUnit(["POST_ENGAGEMENT"], a, "reactions"),
    },
  ];
  e.innerHTML = n
    .map(
      ({ name: e, icon: t, type: a, value: n, unit: o }) =>
        `\n      <div class="dom_total_item">\n        <div>\n          <p class="dom_total_type">${e}</p>\n        <p class="dom_total_number">\n  ${
          "Spent" === o
            ? `${isNaN(n) ? "0" : formatNumber(n)} ₫`
            : `${isNaN(n) ? "0" : formatNumber(n)}`
        }\n</p>\n        </div>\n        <div class="dom_total_unit">\n          ${
          "Spent" === o
            ? '<a class="dom_unit_number">Excludes +5% VAT</a>'
            : `<p class="dom_unit_number">${
                "-" !== o ? `${formatNumber(o)} ₫` : o
              }</p>`
        }\n          <p class="dom_unit_text">${a}</p>\n        </div>\n        <i class="${t}"></i>\n      </div>`
    )
    .join("");
}
function formatCurrency(e) {
  return `${(1 * e).toLocaleString()} ₫`;
}
function formatNumber(e) {
  return `${(1 * e).toLocaleString()}`;
}
function formatCurrencyText(e) {
  return e >= 1e9
    ? (e / 1e9).toFixed(1) + "B"
    : e >= 1e6
    ? (e / 1e6).toFixed(1) + "M"
    : e >= 1e3
    ? (e / 1e3).toFixed(1) + "K"
    : e.toLocaleString("vi-VN");
}
function formatMetricName(e) {
  return e
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (e) => e.toUpperCase());
}
function getFormattedDateRange(e) {
  const t = new Date();
  let a, n;
  switch (e) {
    case "today":
      a = n = t;
      break;
    case "yesterday":
      (a = new Date(t)), a.setDate(t.getDate() - 1), (n = a);
      break;
    case "this%5fmonth":
      (a = new Date(Date.UTC(t.getFullYear(), t.getMonth(), 1, 7))),
        (n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), 7)));
      break;
    case "last%5fmonth":
      (a = new Date(Date.UTC(t.getFullYear(), t.getMonth() - 1, 1, 7))),
        (n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), 0, 7)));
      break;
    case "this%5fquarter":
      (a = new Date(
        Date.UTC(t.getFullYear(), 3 * Math.floor(t.getMonth() / 3), 1, 7)
      )),
        (n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), 7)));
      break;
    case "last%5fquarter":
      (n = new Date(
        Date.UTC(t.getFullYear(), 3 * Math.floor(t.getMonth() / 3), 0, 7)
      )),
        (a = new Date(
          Date.UTC(t.getFullYear(), 3 * Math.floor(t.getMonth() / 3) - 3, 1, 7)
        ));
      break;
    case "this_year":
      (a = new Date(Date.UTC(t.getFullYear(), 0, 1, 7))),
        (n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), 7)));
      break;
    case "custom_date":
      (a = new Date(startDate)), (n = new Date(endDate));
      break;
    default:
      return "";
  }
  if (
    ((startDate = formatApiDate(a)),
    (endDate = formatApiDate(n)),
    "custom_date" === e)
  ) {
    const e = `?start=${formatDateForQuery(startDate)}&end=${formatDateForQuery(
      endDate
    )}`;
    history.pushState(null, "", e);
  } else history.pushState(null, "", window.location.pathname);
  return a.getTime() === n.getTime()
    ? formatDate(a)
    : `${formatDate(a)} - ${formatDate(n)}`;
}
function formatDateForQuery(e) {
  if (!e || "string" != typeof e) return "";
  const [t, a, n] = e.split("-");
  return `${n}-${a}-${t}`;
}
function formatDate(e) {
  const t = new Date(e);
  return `${t.getDate().toString().padStart(2, "0")}/${(t.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${t.getFullYear()}`;
}
function formatApiDate(e) {
  return e.toISOString().split("T")[0];
}
function drawBarChart(e) {
  const t = Object.keys(e),
    a = Object.values(e);
  if (chartSpentType)
    (chartSpentType.data.labels = t),
      (chartSpentType.data.datasets[0].data = a),
      chartSpentType.update();
  else {
    const e = document.getElementById("chartSpentType").getContext("2d");
    chartSpentType = new Chart(e, {
      type: "bar",
      data: {
        labels: t,
        datasets: [{ label: "Spent", data: a, backgroundColor: "#ffa900db" }],
      },
      options: {
        responsive: !0,
        borderRadius: 5,
        plugins: {
          legend: { display: !1 },
          tooltip: { enabled: !0 },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#7c7c7c",
            font: { size: 11, weight: "bold" },
            formatter: (e) => formatCurrencyText(e),
          },
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            beginAtZero: !0,
            ticks: {
              font: { size: 11 },
              callback: (e) => formatCurrencyText(e),
            },
            afterDataLimits: (e) => {
              e.max *= 1.1;
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }
}
function handleMonthly(e) {
  let t = [],
    a = [],
    n = [],
    o = [],
    s = [],
    r = [],
    i = [],
    c = [],
    l = [];
  0 !== e.length
    ? (e.forEach((e) => {
        const d = e?.date_start || "Unknown Date",
          m = parseFloat(e?.spend) || 0,
          u = parseFloat(e?.reach) || 0;
        let p = 0,
          g = 0,
          h = 0,
          _ = 0,
          f = 0,
          y = 0;
        e.actions &&
          Array.isArray(e.actions) &&
          e.actions.forEach((e) => {
            "onsite_conversion.messaging_conversation_started_7d" ===
              e?.action_type && (p = e?.value || 0),
              "post_reaction" === e?.action_type && (g = e?.value || 0),
              "like" === e?.action_type && (h = e?.value || 0),
              "post_engagement" === e?.action_type && (_ = e?.value || 0),
              "link_click" === e?.action_type && (f = e?.value || 0),
              "onsite_conversion.lead_grouped" === e?.action_type &&
                (y = e?.value || 0);
          }),
          t.push(d),
          a.push(m),
          n.push(u),
          o.push(p),
          s.push(g),
          r.push(h),
          i.push(_),
          c.push(f),
          l.push(y);
      }),
      drawMonthlyChart(t, a, n, o, s, r, i, c, l))
    : drawMonthlyChart(t, a, n, o, s, r, i, c, l);
}
function drawDailyChart(e, t, a, n, o, s, r, i, c) {
  const l = document.getElementById("chartDaily").getContext("2d"),
    d = l.createLinearGradient(0, 0, 0, 400);
  d.addColorStop(0, "rgba(255, 171, 0,0.7)"),
    d.addColorStop(1, "rgba(255, 171, 0, 0.1)"),
    dailyChartInstance && dailyChartInstance.destroy(),
    (allDatasets = [
      {
        label: "Post Engagement",
        data: r,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Leads",
        data: c,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Link Click",
        data: i,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Spend",
        data: t,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Reach",
        data: a,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Message Start",
        data: n,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Post Reactions",
        data: o,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
      {
        label: "Page Likes",
        data: s,
        backgroundColor: d,
        borderColor: "rgba(255, 171, 0, 1)",
        fill: !0,
        tension: 0.1,
      },
    ]),
    (dailyChartInstance = new Chart(l, {
      type: "line",
      data: {
        labels: e,
        datasets: allDatasets.filter((e) => "Spend" === e.label),
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        plugins: { legend: { position: "top", display: !1 } },
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: {
            beginAtZero: !0,
            ticks: {
              font: { size: 12 },
              callback: function (e) {
                return formatCurrencyText(e);
              },
            },
          },
        },
      },
    }));
}
let monthlyChartInstance;
function drawMonthlyChart(e, t, a, n, o, s, r, i, c) {
  const l = document.getElementById("chartMonthly").getContext("2d"),
    d = Array(12).fill(0),
    m = Array(12).fill(0),
    u = Array(12).fill(0),
    p = Array(12).fill(0),
    g = Array(12).fill(0),
    h = Array(12).fill(0),
    _ = Array(12).fill(0),
    f = Array(12).fill(0),
    y = [
      { data: t, fixed: d },
      { data: a, fixed: m },
      { data: n, fixed: u },
      { data: o, fixed: p },
      { data: s, fixed: g },
      { data: r, fixed: h },
      { data: i, fixed: _ },
      { data: c, fixed: f },
    ];
  e.forEach((e, t) => {
    const a = new Date(e).getMonth();
    y.forEach(({ data: e, fixed: n }) => {
      n[a] = e[t] || 0;
    });
  }),
    monthlyChartInstance && monthlyChartInstance.destroy(),
    (allMonthlysets = [
      {
        label: "Post Engagement",
        data: h,
        backgroundColor: "rgba(255, 171, 0, 1)",
      },
      { label: "Leads", data: f, backgroundColor: "rgba(255, 171, 0, 1)" },
      { label: "Link Click", data: _, backgroundColor: "rgba(255, 171, 0, 1)" },
      { label: "Spend", data: d, backgroundColor: "rgba(255, 171, 0, 1)" },
      { label: "Reach", data: m, backgroundColor: "rgba(255, 171, 0, 1)" },
      {
        label: "Message Start",
        data: u,
        backgroundColor: "rgba(255, 171, 0, 1)",
      },
      {
        label: "Post Reactions",
        data: p,
        backgroundColor: "rgba(255, 171, 0, 1)",
      },
      { label: "Page Likes", data: g, backgroundColor: "rgba(255, 171, 0, 1)" },
    ]),
    (monthlyChartInstance = new Chart(l, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: allMonthlysets.filter((e) => e.label === selectedViewMonthly),
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        borderRadius: 5,
        plugins: {
          legend: { display: !1 },
          tooltip: { enabled: !0 },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#7c7c7c",
            font: { size: 11, weight: "bold" },
            formatter: (e) => formatCurrencyText(e),
          },
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            beginAtZero: !0,
            ticks: {
              font: { size: 11 },
              callback: (e) => formatCurrencyText(e),
            },
            afterDataLimits: (e) => {
              e.max *= 1.1;
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    }));
}
function updateChart(e) {
  if (dailyChartInstance) {
    const t = [...allDatasets].filter((t) => t.label === e);
    t.length > 0 &&
      ((dailyChartInstance.data.datasets = t), dailyChartInstance.update());
  }
}
function updateChartMonthly(e) {
  if (((selectedViewMonthly = e), monthlyChartInstance)) {
    const t = [...allMonthlysets].filter((t) => t.label === e);
    t.length > 0 &&
      ((monthlyChartInstance.data.datasets = t), monthlyChartInstance.update());
  }
}
function handleDailyDate(e) {
  let t = [],
    a = [],
    n = [],
    o = [],
    s = [],
    r = [],
    i = [],
    c = [],
    l = [];
  0 !== e.length
    ? (e.forEach((e) => {
        const d = e?.date_start || "Unknown Date",
          m = parseFloat(e?.spend) || 0,
          u = parseFloat(e?.reach) || 0;
        let p = 0,
          g = 0,
          h = 0,
          _ = 0,
          f = 0,
          y = 0;
        e.actions &&
          Array.isArray(e.actions) &&
          e.actions.forEach((e) => {
            "onsite_conversion.messaging_conversation_started_7d" ===
              e?.action_type && (p = e?.value || 0),
              "post_reaction" === e?.action_type && (g = e?.value || 0),
              "like" === e?.action_type && (h = e?.value || 0),
              "post_engagement" === e?.action_type && (_ = e?.value || 0),
              "link_click" === e?.action_type && (f = e?.value || 0),
              "onsite_conversion.lead_grouped" === e?.action_type &&
                (y = e?.value || 0);
          }),
          t.push(d),
          a.push(m),
          n.push(u),
          o.push(p),
          s.push(g),
          r.push(h),
          i.push(_),
          c.push(f),
          l.push(y);
      }),
      drawDailyChart(t, a, n, o, s, r, i, c, l))
    : drawDailyChart(t, a, n, o, s, r, i, c, l);
}
async function fetchHourlyData(e) {
  try {
    const t = await fetch(e);
    processHourlyData((await t.json()).data);
  } catch (e) {}
}
function processHourlyData(e) {
  const t = [],
    a = [],
    n = [];
  e.forEach((e) => {
    const o = e.hourly_stats_aggregated_by_advertiser_time_zone.split(":")[0];
    t.push(1 * o + "h"), a.push(e.impressions), n.push(e.spend);
  }),
    drawHourlyChart(t, a, n),
    !isViewOdoo && loading.classList.remove("active");
}
function drawHourlyChart(e, t, a) {
  const n = document.getElementById("hourlyChart").getContext("2d"),
    o = n.createLinearGradient(0, 0, 0, 400);
  o.addColorStop(0, "rgba(48, 51, 86, 0.7)"),
    o.addColorStop(1, "rgba(48, 51, 86, 0.1)");
  const s = n.createLinearGradient(0, 0, 0, 400);
  s.addColorStop(0, "rgba(255, 171, 0,0.7)"),
    s.addColorStop(1, "rgba(255, 171, 0, 0.1)"),
    window.hourlyChartInstance && window.hourlyChartInstance.destroy(),
    (window.hourlyChartInstance = new Chart(n, {
      type: "line",
      data: {
        labels: e,
        datasets: [
          {
            label: "Impressions",
            data: t,
            backgroundColor: o,
            borderColor: "rgba(48, 51, 86, 1)",
            borderWidth: 2,
            tension: 0.3,
            fill: !0,
          },
          {
            label: "Spend",
            data: a,
            backgroundColor: s,
            borderColor: "rgba(255, 171, 0, 1)",
            borderWidth: 2,
            tension: 0.3,
            fill: !0,
          },
        ],
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        plugins: { legend: { position: "top", align: "end" } },
        scales: {
          x: {
            title: { display: !1, text: "Giờ trong ngày" },
            ticks: { min: 0, max: 23, stepSize: 1 },
          },
          y: { beginAtZero: !0, title: { display: !1, text: "Số lượng" } },
        },
      },
    }));
}
function useDebounce(e, t) {
  let a;
  return (...n) => {
    clearTimeout(a), (a = setTimeout(() => e(...n), t));
  };
}
function setActiveOnly(e, t) {
  if (t) {
    const e = document.querySelector(t);
    e && e.classList.remove("active");
  }
  e.classList.add("active");
}
function removeActiveOnly(e) {
  document.querySelector(e) &&
    document.querySelector(e).classList.remove("active");
}
function renderTable(e) {
  const t = document.createDocumentFragment(),
    a = document.createElement("tbody");
  for (a.innerHTML = e; a.firstChild; ) t.appendChild(a.firstChild);
  tableBody.hasChildNodes()
    ? tableBody.replaceChildren(t)
    : tableBody.appendChild(t);
}
function useData(e, t) {
  let a = t ? (globalDataCache ??= processData(e, !0)) : processData(e);
  renderTable(a.tbodyHTML),
    (t && tableDataGlobal === a.tableData) ||
      ((tableDataGlobal = a.tableData), updateFooterOnCheck(tableDataGlobal));
  drawBarChart(isBrand && t ? a.brandTotal : a.optimizationTotal),
    renderTopCampaign(a.campaignTotal),
    (t && dataAdsetNow === a.dataFilter) ||
      ((dataAdsetNow = a.dataFilter), (dataCampaignNow = a.campaignTotal));
}
async function mainApp() {
  try {
    (globalDataCache = null),
      selecItemTime.classList.remove("active"),
      (dom_time_show.textContent = getFormattedDateRange(date_preset)),
      isViewOdoo && main();
    const [e, t] = await Promise.all([
      fetchData(startDate, endDate).catch((e) => []),
      fetchDataDaily(startDate, endDate).catch((e) => []),
    ]);
    (dataFullAdset = Array.isArray(e) ? e : []),
      t.length && handleDailyDate(t),
      dataFullAdset.length && useData(dataFullAdset, !0),
      renderQuickFilter(),
      "1" !== localStorage.getItem("viewPerformance") ||
        isViewOdoo ||
        handleViewPerformance(),
      "true" !== localStorage.getItem("isViewOdoo") ||
        isViewOdoo ||
        menuOdoo.click();
  } catch (e) {
  } finally {
    !isViewOdoo && loading.classList.remove("active");
  }
}
function getStartEndFromURL() {
  const e = new URLSearchParams(window.location.search);
  let t = e.get("start"),
    a = e.get("end");
  if (t && a) {
    const [e, n, o] = t.split("-").map(Number),
      [s, r, i] = a.split("-").map(Number);
    if (
      ((t = new Date(Date.UTC(o, n - 1, e))),
      (a = new Date(Date.UTC(i, r - 1, s))),
      !isNaN(t.getTime()) && !isNaN(a.getTime()))
    )
      return (
        (startDate = t),
        (endDate = a),
        (date_preset = "custom_date"),
        (selecedTextTime.textContent = "Custom Date"),
        void setActiveOnly(custom_item, ".dom_select_show.time li.active")
      );
  }
  date_preset = "this%5fmonth";
}
function createApiUrl(e, t) {
  return `https://graph.facebook.com/v22.0/act_${adAccountId}/insights?fields=${e}&filtering=${t}&time_range={"since":"${startDate}","until":"${endDate}"}&access_token=${accessToken}&limit=1000`;
}
async function fetchDataFlat(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error("Network response was not ok");
    const a = await t.json();
    let n = {};
    a.data.forEach((e) => {
      const t = e.publisher_platform || "Unknown",
        a = e.reach || 0;
      n[t] || (n[t] = 0), (n[t] += a);
    }),
      drawChart2(n);
  } catch (e) {}
}
function capitalizeFirstLetter(e) {
  return e.replace(/\b\w/g, (e) => e.toUpperCase());
}
function drawChart2(e) {
  const t = document.getElementById("reachChart").getContext("2d"),
    a = ["audience_network", "facebook", "instagram", "messenger"].reduce(
      (t, a) => (e[a] && (t[a] = e[a]), t),
      {}
    ),
    n = Object.keys(a).map((e) => capitalizeFirstLetter(e)),
    o = Object.values(a);
  reachChartInstance && reachChartInstance.destroy(),
    (reachChartInstance = new Chart(t, {
      type: "pie",
      data: {
        labels: n,
        datasets: [
          {
            label: "Total Reach",
            data: o,
            backgroundColor: ["#ffab00", "#262a53", "#cccccc", "#ffc756"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: !0,
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              boxWidth: 20,
              padding: 15,
              maxWidth: 200,
              usePointStyle: !0,
            },
          },
          title: { display: !1 },
        },
      },
    }));
}
async function fetchRegionData(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error("Network response was not ok");
    const a = await t.json();
    if (a.error) return;
    let n = {};
    a.data.forEach((e) => {
      const t = e.region || "Unknown",
        a = e.reach || 0;
      n[t] || (n[t] = 0), (n[t] += a);
    }),
      drawRegionChart(n);
  } catch (e) {}
}
function drawAgeGenderChart(e, t, a) {
  const n = document.getElementById("ageGenderChart").getContext("2d");
  ageGenderChartInstance && ageGenderChartInstance.destroy(),
    (ageGenderChartInstance = new Chart(n, {
      type: "bar",
      data: {
        labels: e,
        datasets: [
          { label: "Male", data: t, backgroundColor: "#202449ed" },
          { label: "Female", data: a, backgroundColor: "#ffab00e3" },
        ],
      },
      options: {
        borderRadius: 5,
        responsive: !0,
        plugins: { legend: { position: "top" }, title: { display: !1 } },
        scales: { x: { stacked: !1 }, y: { beginAtZero: !0 } },
        barPercentage: 0.8,
      },
    }));
}
function drawRegionChart(e) {
  const t = document.getElementById("regionChart").getContext("2d"),
    a = 0.015 * Object.values(e).reduce((e, t) => e + 1 * t, 0),
    n = Object.entries(e).filter(([, e]) => e >= a);
  if (0 === n.length) return;
  const o = n.map(([e]) => e.replace(/\s*(Province|City)$/i, "").trim()),
    s = n.map(([, e]) => e);
  regionChartInstance && regionChartInstance.destroy(),
    (regionChartInstance = new Chart(t, {
      type: "bar",
      data: {
        labels: o,
        datasets: [
          {
            data: s,
            backgroundColor: [
              "#ffb524",
              "#ffb524",
              "#ffb524",
              "#ffb524",
              "#ffb524",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: !0,
        borderRadius: 5,
        plugins: { legend: { position: "top", display: !1 } },
        scales: { y: { beginAtZero: !0 } },
        barPercentage: 0.6,
      },
    }));
}
async function fetchGenderData(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error(`HTTP Error! Status: ${t.status}`);
    const a = await t.json();
    let n = {};
    a.data.forEach((e) => {
      const t = e.gender || "Unknown",
        a = e.reach || 0;
      n[t] || (n[t] = 0), (n[t] += a);
    }),
      drawGenderChart(n);
  } catch (e) {}
}
function drawGenderChart(e) {
  const t = document.getElementById("genderChart").getContext("2d"),
    a = Object.keys(e).map((e) => capitalizeFirstLetter(e)),
    n = Object.values(e);
  genderChartInstance && genderChartInstance.destroy(),
    (genderChartInstance = new Chart(t, {
      type: "pie",
      data: {
        labels: a,
        datasets: [
          {
            label: "Lượt Reach theo giới tính",
            data: n,
            backgroundColor: ["#ffab00", "#262a53", "#cccccc"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: !0,
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              boxWidth: 20,
              padding: 15,
              maxWidth: 200,
              usePointStyle: !0,
            },
          },
        },
      },
    }));
}
async function fetchImpressionData(e) {
  try {
    const t = await fetch(e),
      a = await t.json();
    if (!a.data || !Array.isArray(a.data)) return;
    handleImpressionDevide(
      a.data.reduce((e, t) => {
        const a = t.impression_device,
          n = parseInt(t.impressions, 10);
        return (e[a] = (e[a] || 0) + n), e;
      }, {})
    );
  } catch (e) {}
}
function handleImpressionDevide(e) {
  if (e) {
    const t = Object.entries(e).sort((e, t) => t[1] - e[1]);
    let a = "";
    const n = t.length > 0 && t[0][1];
    t.forEach(([e, t]) => {
      const o = (t / n) * 100;
      a += `<li>\n                  <p><span>${formatLabel(
        e
      )}</span> <span>${formatNumber(
        t
      )}</span></p>\n                  <p><span style="width: ${o}%"></span></p>\n                </li>`;
    }),
      (impression_chart_ul.innerHTML = a);
  }
}
menu.addEventListener("click", (e) => {
  const t = e.target.closest("li");
  if (!t || t.classList.contains("active")) return;
  setActiveOnly(t, ".dom_main_menu li.active"),
    (isViewPerformance = !1),
    dom.classList.remove("isViewPerformance"),
    (isViewOdoo = !1),
    (localStorage.isViewOdoo = !1);
  const a = Array.from(t.parentElement.children).indexOf(t);
  switch ((window.scrollTo({ top: 0, behavior: "smooth" }), a)) {
    case 0:
      showPerformanceTab(),
        useData(dataFullAdset, !0),
        removeActiveOnly(".dom_sub_menu li.active"),
        blockSpentChart.classList.remove("none"),
        switchBtns[0].click(),
        localStorage.removeItem("viewPerformance");
      break;
    case 1:
      handleViewPerformance();
      break;
    case 2:
      showPaymentTab(), localStorage.removeItem("viewPerformance");
      break;
    case 3:
      localStorage.removeItem("viewPerformance"),
        domContent.classList.add("none"),
        domPayment.classList.add("none"),
        domOodo.classList.remove("none"),
        (isViewOdoo = !0),
        (localStorage.isViewOdoo = !0),
        main();
      break;
  }
}),
  menuQuick.addEventListener("click", (e) => {
    const t = e.target.closest("li");
    t &&
      ((isViewOdoo = !1),
      (quickID = Number(t.dataset.index)),
      (isViewOdoo = !1),
      (localStorage.isViewOdoo = !1),
      handleViewPerformance(t),
      updateUIForQuickFilter(t));
  }),
  selectCampaignList.addEventListener("click", (e) => {
    const t = e.target.closest(".campaign-item");
    if (!t) return;
    const a = Number(t.dataset.index);
    if (a === activeCampaignID) return;
    const n = t.dataset.name || "Data for all campaigns",
      o = document.querySelector(".campaign-item.active");
    if (
      (o && o.classList.remove("active"),
      t.classList.add("active"),
      (activeCampaignID = a),
      selecedTextCampaign.textContent !== n &&
        (selecedTextCampaign.textContent = n),
      (adsetNOW = ""),
      (campaignNOW = a > 0 ? n : ""),
      selectAdset.classList.toggle("show", a > 0),
      a > 0)
    ) {
      renderAdsetinCampaign(dataFullAdset.filter((e) => e.campaign_name === n)),
        "Data for all adsets" !== selecedTextAdset?.textContent &&
          (selecedTextAdset.textContent = "Data for all adsets");
    }
    blockSpentChart.classList.remove("none");
    viewFilter(quickFilterData(quickFilter[quickID], campaignNOW, adsetNOW));
  }),
  selectAdsetList.addEventListener("click", (e) => {
    const t = e.target.closest(".adset-item");
    if (!t || t.classList.contains("active")) return;
    document.querySelector(".adset-item.active")?.classList.remove("active"),
      t.classList.add("active");
    const a = t.dataset.name || "Data for all adsets";
    selecedTextAdset.textContent !== a && (selecedTextAdset.textContent = a),
      (adsetNOW = t.dataset.index > 0 ? a : ""),
      blockSpentChart.classList.toggle("none", "" !== adsetNOW);
    viewFilter(quickFilterData(quickFilter[quickID], campaignNOW, adsetNOW));
  });
const formatLabel = (e) =>
  e
    .split("_")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
    .join(" ");
async function fetchDataAge(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error("Network response was not ok");
    const a = await t.json();
    if (a.error) return;
    let n = {};
    a.data.forEach((e) => {
      const t = e.age || "Unknown",
        a = e.gender || "Unknown",
        o = e.reach || 0,
        s = `${t}_${a}`;
      n[s] || (n[s] = 0), (n[s] += o);
    });
    const o = [...new Set(a.data.map((e) => e.age))].sort(),
      s = o.map((e) => n[`${e}_male`] || 0),
      r = o.map((e) => n[`${e}_female`] || 0);
    drawAgeGenderChart(o, s, r);
  } catch (e) {}
}
function handleViewDemographic(e, t, a) {
  !isViewOdoo && loading.classList.add("active"),
    (demoTitleAdset.textContent = t),
    (demoTitleCampaign.textContent = e),
    dom_demographic.classList.add("active");
  const n = calculateMetricByGoal([tableDataGlobal[a]]);
  renderMetricTotal(dom_totalDemographic, tableDataGlobal[a], n);
  const o = [
      { field: "campaign.name", operator: "EQUAL", value: e },
      { field: "adset.name", operator: "EQUAL", value: t },
    ],
    s = JSON.stringify(o),
    r = {
      platform: fetchDataFlat,
      age: fetchDataAge,
      region: fetchRegionData,
      gender: fetchGenderData,
      device: fetchImpressionData,
      hourly: fetchHourlyData,
    };
  Object.entries({
    platform: "campaign_name,reach&breakdowns=publisher_platform",
    age: "campaign_name,reach&breakdowns=age,gender",
    region: "campaign_name,reach&breakdowns=region",
    gender: "campaign_name,reach&breakdowns=gender",
    device: "campaign_name,impressions&breakdowns=impression_device",
    hourly:
      "campaign_name,impressions,spend&breakdowns=hourly_stats_aggregated_by_advertiser_time_zone",
  }).forEach(([e, t]) => {
    const a = createApiUrl(t, s);
    r[e](a);
  });
}
async function fetchAdAccountActivities() {
  let e = `https://graph.facebook.com/v22.0/act_${adAccountId}?fields=balance,age,created_time,fb_entity,tax_id,id,name,account_status,currency,amount_spent,funding_source_details,spend_cap,business,owner,timezone_name,disable_reason&access_token=${accessToken}`;
  try {
    const t = await fetch(e);
    renderDomPayment(await t.json());
  } catch (e) {}
}
function renderMonthlyinYear() {
  const e = new Date().getFullYear(),
    t = [e, e - 1, e - 2];
  (selecItemYearlyText.textContent = e),
    (selecItemYearlyUl.innerHTML = ""),
    t.forEach((t) => {
      const a = document.createElement("li");
      a.setAttribute("data-view", t),
        (a.innerHTML = `<span class="radio_box"></span><span>${t}</span>`),
        t === e && a.classList.add("active"),
        selecItemYearlyUl.appendChild(a);
    });
}
function renderDomPayment(e) {
  renderMonthlyinYear();
  const t = e.funding_source_details?.display_string.includes("VISA");
  dom_payment_block.innerHTML = `\n      <div class="dom_block">\n          <div class="dom_block_item w25">\n            <h2>Current Debt Balance</h2>\n            <div class="dom_balance">\n              <p>\n                <i class="fa-solid fa-money-check-dollar"></i>\n                <span class="dom_balance_current">${formatCurrency(
    e.balance
  )}</span>\n                <span>+5% VAT</span>\n              </p>\n              <div>\n                <p>Total Account Spent</p>\n                <p class="dom_balance_total">${formatCurrency(
    e.amount_spent
  )} <span>(Inc. VAT)</span></p>\n                 <p class="small">Facebook only returns 37 months ago</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="dom_block_item w25">\n            <h2>Payment info</h2>\n            <div class="dom_payment_info">\n            <p> \n      <img src="https://ampersand-reports-dom.netlify.app/DOM-img/${
    t ? "visa.png" : "mastercard.png"
  }" />\n      <span>${
    e.funding_source_details.display_string
  }</span>\n    </p>\n              <p>Currency: ${
    e.currency
  }</p>\n              <p>Spend cap: ${
    0 == e.spend_cap ? "No limit" : formatCurrency(e.spend_cap)
  }</p>\n            </div>\n          </div>\n          <div class="dom_block_item w50">\n            <h2><i class="fa-solid fa-circle-info"></i> Account Info</h2>\n            <div class="dom_account_info">\n              <ul>\n                <li>Account</li>\n                <li>Account Name: ${
    e.name
  }</li>\n                <li>Account ID: ${
    e.id
  }</li>\n                <li>Create Time: ${
    e.created_time.split("T")[0]
  }</li>\n              </ul>\n              <ul>\n                <li>Business</li>\n                <li>Business Name: ${
    e.business.name
  }</li>\n                <li>Business ID: ${
    e.business.id
  }</li>\n                <li>Time Zone: ${
    e.timezone_name
  }</li>\n              </ul>\n            </div>\n          </div>\n        </div>\n  `;
}
getStartEndFromURL(), mainApp(), fetchDataMonthly(year);
