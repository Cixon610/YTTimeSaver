chrome.runtime.onInstalled.addListener(() => {
  let initParam = {
    dailyLimitedHour: 1,
    blackListMode: [0, 1, 2],
    enableFlag: false,
    dayEndTimer: "12:00",
    dailyDuration: 0
  };
  chrome.storage.sync.set({ ...initParam });
  console.log("initParam:",initParam);
});
