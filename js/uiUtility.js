let blockPanel = {
  element: document.querySelector("#dwmtBlock"),
  //True: open, False: close, undefined: toggle
  Toggle: (status) => {
    try {
      let el = blockPanel.element;
      let isPanelShowed = blockPanel.IsShow();
      switch (status) {
        case true:
          applyToUI(true);
          break;
        case false:
          applyToUI(false);
          break;
        default:
          applyToUI(!isPanelShowed);
          break;
      }
      function applyToUI(status) {
        if (!status) {
          isPanelShowed && (el.style.display = "none") && blockPanel.RemoveScript();
          return;
        }

        !!el
          ? (el.style.display = "block")
          : //first render
            document.body.appendChild(
              (blockPanel.element = commonElement.createElementWithAttributes("div", { id: "dwmtBlock" }))
            );
        blockPanel.AppendScript();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  IsShow: () => commonElement.isPanelShow(blockPanel),
  AppendScript: () => {
    let frame = commonElement.createElementWithAttributes("iframe", {
      id: "dwmtBlockFrame",
      width: "100%",
      height: "100%",
      src: "https://www.youtube.com/embed/NOZONW-UK0w?controls=0&start=27&autoplay=1",
    });
    blockPanel.element.appendChild(frame);
    //改成call yt api preload video
  },
  RemoveScript: () => {
    let frame = document.querySelector("#dwmtBlockFrame");
    frame.remove();
  },
};

let durationPanel = {
  element: document.querySelector("#dwmtDuration"),
  hasRemainingTime: (dailyDuration, dailyLimitedHour) => {
    return dailyLimitedHour * 3600 - dailyDuration >= 0;
  },
  isShow: () => commonElement.isPanelShow(durationPanel),
  hide: () => durationPanel.isShow() && (durationPanel.element.style.display = "none"),
  update: (dailyDuration, dailyLimitedHour) => {
    let el = durationPanel.element;
    //Only update by second, if duration is float, don't update.
    if (dailyDuration % 1 !== 0) return;
    let remainingTime = durationToHHMMSS(dailyLimitedHour * 3600 - dailyDuration);
    if (!!el) {
      el.style.display = "block";
      el.innerText = remainingTime;
    } else {
      let target = document.querySelector("#search-input");
      el = commonElement.createElementWithAttributes("div", { id: "dwmtDuration", innerText: remainingTime });
      !!el && (durationPanel.element = el) && target?.parentNode.insertBefore(el, target.nextSibling);
    }
  },
};

let commonElement = {
  isPanelShow: (panel) => {
    return ["", "block"].includes(panel.element?.style.display);
  },
  createElementWithAttributes: (elementName, attributeObj) => {
    try {
      let newDiv = document.createElement(elementName);
      Object.entries(attributeObj).forEach((x) => {
        newDiv[x[0]] = x[1];
      });
      return newDiv;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  injectAlertPanel: () => {
    let infoDiv = null;

    let setAlertPanel = setInterval(() => {
      console.log("settimeout is processing...");
      infoDiv = document.querySelector("#primary-inner");
      if (!!infoDiv) {
        let text = commonElement.createElementWithAttributes("div", { id: "dwmtDiv", innerText: "廢片" });
        infoDiv.prepend(text);
        clearInterval(setAlertPanel);
      }
    }, 500);
  },
};

//播放時tooltip會顯示暫停
function isPlaying() {
  const playKey = ["暫停", "pause"];
  let playButtonTitle = document.querySelector(".ytp-play-button.ytp-button")?.title;
  let tooltipContent = document.querySelector(".ytp-tooltip-text.ytp-tooltip-text-no-title")?.innerText;

  if (!playButtonTitle) return false;

  playButtonTitle = playButtonTitle.split(" ")[0];
  tooltipContent = tooltipContent?.split(" ")[0];

  return playKey.includes(playButtonTitle) || playKey.includes(tooltipContent);
}
