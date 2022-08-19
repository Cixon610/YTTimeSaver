chrome.runtime.onInstalled.addListener(() => {
  let initParam = {
    dailyLimitedHour: 1,
    filterValues: [],
    enableFlag: false,
    dayEndTimer: "23:59:59",
    dateStamp: new Date().getDate(),
    dailyDuration: 0,
    activeTabInfo: {},
  };
  chrome.storage.sync.set({ ...initParam });
  console.log("initParam:", initParam);
});

//To prevent all tab trigger blockpanel, add listener to log active tab info
chrome.tabs.onActivated.addListener((activeTabInfo) => {
  chrome.storage.sync.set({ activeTabInfo: activeTabInfo });
});

//Get all tabs
//chrome.tabs.query({}, (tabs) => console.log("tabs", tabs));

//Info active tab to show blockpanel
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  chrome.storage.sync.get("activeTabInfo", ({ activeTabInfo }) => {
    chrome.tabs.sendMessage(activeTabInfo.tabId, message);
  });
});
