window.onload = () => {
  let playButton = document.querySelector("button.ytp-play-button.ytp-button");
  (function timer() {
    let seconds = setInterval(() => {
      getServiceParams(
        [serviceParams.All],
        ({ dailyLimitedHour, blackListMode, enableFlag, dayEndTimer, dailyDuration }) => {
          if (enableFlag) {
            let toBlock = false;
            //Update remainingTime
            let hasRemainingTime = durationPanel.hasRemainingTime(dailyDuration, dailyLimitedHour)
            if(hasRemainingTime){
              durationPanel.Update(dailyDuration, dailyLimitedHour);
              chrome.storage.sync.set({dailyDuration: ++dailyDuration});
            }

            //dayEndTimer
            toBlock = isTimeOverHHMM(dayEndTimer) || !hasRemainingTime;
            
            toBlock
              ? !blockPanel.IsShow() && blockPanel.Toggle() && playButton.click()
              : blockPanel.IsShow() && blockPanel.Toggle() && playButton.click();
          }
        }
      );
    }, 1000);
  })();
};
