let dlhElement = document.querySelector("[name='dailyLimitedHour']");
let filterElement = [...document.querySelectorAll("#filterContainer input")];
let switchElement = document.querySelector("#title input");
let dayEndTimerElement = document.querySelector("[name='dayEndTimer']");
//#region init param
// getServiceParams(
//   [serviceParams.All],
//   ({ dailyLimitedHour, blackListMode, enableFlag, dayEndTimer }) => {
//     console.log(dailyLimitedHour, blackListMode, enableFlag, dayEndTimer);
//     dlhElement.value = dailyLimitedHour;
//     filterElement
//       .filter((x) => blackListMode?.includes(+x.value))
//       .forEach((x) => {
//         x.checked = true;
//       });
//     switchElement.checked = enableFlag;
//     dayEndTimerElement.value = dayEndTimer;
//   }
// );
chrome.storage.sync.get(
  ["dailyLimitedHour", "blackListMode", "enableFlag", "dayEndTimer"],
  ({ dailyLimitedHour, blackListMode, enableFlag, dayEndTimer }) => {
    console.log(dailyLimitedHour, blackListMode, enableFlag, dayEndTimer);
    dlhElement.value = dailyLimitedHour;
    filterElement
      .filter((x) => blackListMode?.includes(+x.value))
      .forEach((x) => {
        x.checked = true;
      });
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
//filter
// filterElement.addEventListener("click",()=>{
//   console.log()
// })

//enable switch
switchElement.addEventListener("change", (e) => {
  console.log("e.currentTarget.checked", e.currentTarget.checked);
  chrome.storage.sync.set({ enableFlag: e.currentTarget.checked });
});

// chrome.storage.sync.get("",({}) => {

// });
//#endregion

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// // The body of this function will be execuetd as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
