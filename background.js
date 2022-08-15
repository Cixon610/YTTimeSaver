chrome.runtime.onInstalled.addListener(() => {
  let initParam = {
    dailyLimitedHour: 1,
    filterValues: [],
    enableFlag: false,
    dayEndTimer: "23:59:59",
    dateStamp: new Date(),
    dailyDuration: 0
  };
  chrome.storage.sync.set({ ...initParam });
  console.log("initParam:",initParam);
});
