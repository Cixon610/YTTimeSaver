//#region Parameter
let dlhElement = document.querySelector("[name='dailyLimitedHour']");
let filters = [...document.querySelectorAll("#filterContainer input")];
let filterElements = {
  All: filters,
  BlackFlag: filters.filter((x) => x.value == "b")[0],
  BlackDetails: filters.filter((x) => x.value.includes("b") && x.value !== "b"),
  WhiteFlag: filters.filter((x) => x.value == "w")[0],
  WhiteDetails: filters.filter((x) => x.value.includes("w") && x.value !== "w"),
};
let filtersCache = [];
let switchElement = document.querySelector("#title input");
let dayEndTimerElement = document.querySelector("[name='dayEndTimer']");
//#endregion

//#region function
function updateMainFilterStatus(mainEle, detailEles) {
  detailEles.some((x) => x.checked) ? (mainEle.checked = true) : (mainEle.checked = false);
}
function updateFilters() {
  filtersCache = filterElements.All.filter((x) => x.checked).map((x) => x.value);
  chrome.storage.sync.set({ filterValues: filtersCache });
}
//#endregion

//#region init param
// getServiceParams(
//   [serviceParams.All],
//   ({ dailyLimitedHour, filterValues, enableFlag, dayEndTimer }) => {
//     console.log(dailyLimitedHour, filterValues, enableFlag, dayEndTimer);
//     dlhElement.value = dailyLimitedHour;
//     filterElements
//       .filter((x) => filterValues?.includes(+x.value))
//       .forEach((x) => {
//         x.checked = true;
//       });
//     switchElement.checked = enableFlag;
//     dayEndTimerElement.value = dayEndTimer;
//   }
// );
chrome.storage.sync.get(
  ["dailyLimitedHour", "filterValues", "enableFlag", "dayEndTimer"],
  ({ dailyLimitedHour, filterValues, enableFlag, dayEndTimer }) => {
    console.log(dailyLimitedHour, filterValues, enableFlag, dayEndTimer);
    dlhElement.value = dailyLimitedHour;
    filterElements.All.filter((x) => filterValues?.includes(x.value)).forEach((x) => {
      x.checked = true;
    });
    filtersCache = filterValues;
    switchElement.checked = enableFlag;
    dayEndTimerElement.value = dayEndTimer;
  }
);
//#endregion

//#region EventListner
//daily limit
dlhElement.addEventListener("blur", async () => {
  let dailyLimitedHour = +dlhElement.value;
  if (isNaN(dailyLimitedHour)) return;
  dailyLimitedHour > 24 && (dlhElement.value = 24);
  dailyLimitedHour < 0 && (dlhElement.value = 0);
  //set dailylimithour value
  chrome.storage.sync.set({ dailyLimitedHour: dlhElement.value });
  console.log(`dailyLimitedHour: ${dlhElement.value}`);
});

//dayEndTimer
dayEndTimerElement.addEventListener("blur", async () => {
  console.log(dayEndTimerElement.value);
  chrome.storage.sync.set({ dayEndTimer: dayEndTimerElement.value });
});
//filters
filterElements.All.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.currentTarget != filterElements.BlackFlag && e.currentTarget != filterElements.WhiteFlag) {
      updateMainFilterStatus(filterElements.BlackFlag, filterElements.BlackDetails);
      updateMainFilterStatus(filterElements.WhiteFlag, filterElements.WhiteDetails);
    }
    updateFilters();
  });
});
[filterElements.BlackFlag, filterElements.WhiteFlag].forEach((element) => {
  element.addEventListener("click", (e) => {
    let checked = e.currentTarget.checked;
    e.currentTarget == filterElements.BlackFlag
      ? filterElements.BlackDetails.forEach((x) => (x.checked = checked))
      : filterElements.WhiteDetails.forEach((x) => (x.checked = checked));
    filtersCache = filterElements.All.map((x) => x.value);
    updateFilters();
  });
});
//enable switch
switchElement.addEventListener("change", (e) => {
  console.log("e.currentTarget.checked", e.currentTarget.checked);
  chrome.storage.sync.set({ enableFlag: e.currentTarget.checked });
});
//#endregion
