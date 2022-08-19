let playButton = document.querySelector("button.ytp-play-button.ytp-button");

chrome.runtime.onMessage.addListener((toBlock, sender, sendResponse) => {
  toBlock
    ? !blockPanel.IsShow() && blockPanel.Toggle(toBlock) && isPlaying() && playButton.click()
    : blockPanel.IsShow() && blockPanel.Toggle(toBlock) && isPlaying() && playButton.click();
});

window.onload = () => {
  console.log("onload");
  const interval = 500;
  setInterval(() => {
    getServiceParams(
      [serviceParams.All],
      ({ dailyLimitedHour, filterValues, enableFlag, dayEndTimer, dailyDuration, dateStamp, ...rest }) => {
        if (enableFlag) {
          let toBlock = false;
          //Update dateStamp and reset dailyDuration for cross date case
          let currentDate = new Date().getDate();
          if (dateStamp != currentDate) {
            chrome.storage.sync.set({ dailyDuration: 0, dateStamp: currentDate });
            return;
          }
          let hasRemainingTime = durationPanel.hasRemainingTime(dailyDuration, dailyLimitedHour);
          if (hasRemainingTime) {
            //TODO:BlockList
            if (isPlaying()) {
              durationPanel.update(dailyDuration, dailyLimitedHour, enableFlag);
              chrome.storage.sync.set({ dailyDuration: dailyDuration + interval / 1000 });
            }
          }

          toBlock = isTimeOverHHMM(dayEndTimer) || !hasRemainingTime;
          chrome.runtime.sendMessage(toBlock);
        } else {
          blockPanel.Toggle(false);
          durationPanel.hide();
        }
      }
    );
  }, interval);
};
