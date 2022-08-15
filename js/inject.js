window.onload = () => {
  console.log("onload");
  let playButton = document.querySelector("button.ytp-play-button.ytp-button");
  (function timer() {
    let seconds = setInterval(() => {
      getServiceParams(
        [serviceParams.All],
        ({ dailyLimitedHour, filterValues, enableFlag, dayEndTimer, dailyDuration }) => {
          if (enableFlag) {
            let toBlock = false;
            //Update remainingTime
            let hasRemainingTime = durationPanel.hasRemainingTime(dailyDuration, dailyLimitedHour);
            if (hasRemainingTime) {
              //TODO:BlockList
              if(isPlaying()){
                durationPanel.Update(dailyDuration, dailyLimitedHour);
                chrome.storage.sync.set({ dailyDuration: ++dailyDuration });
              }
            }

            //dayEndTimer
            toBlock = isTimeOverHHMM(dayEndTimer) || !hasRemainingTime;
            toBlock
              ? !blockPanel.IsShow() && blockPanel.Toggle(toBlock) && isPlaying() && playButton.click()
              : blockPanel.IsShow() && blockPanel.Toggle(toBlock) && isPlaying() && playButton.click();
          }
          else{
            blockPanel.IsShow() && blockPanel.Toggle(false);
          }
        }
      );
    }, 500);
  })();
};
