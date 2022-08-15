let blockPanel = {
  element: document.querySelector("#dwmtBlock"),
  //True: open, False: close, undefined: toggle
  Toggle: (status) => {
    try {
      let el = blockPanel.element;
      let isPanelShowed = !!el && (el.style.display == "block" || el.style.display == "");
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
            document.body.appendChild((blockPanel.element = createElementWithAttributes("div", { id: "dwmtBlock" })));
        blockPanel.AppendScript();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  IsShow: () => ["", "block"].includes(blockPanel.element?.style.display),
  AppendScript: () => {
    let frame = createElementWithAttributes("iframe", {
      id: "dwmtBlockFrame",
      width: "100%",
      height: "100%",
      src: "https://www.youtube.com/embed/HfNR_cpfLGw?controls=0&start=11&autoplay=1",
    });
    blockPanel.element.appendChild(frame);
    //改成call yt api preload video
  },
  RemoveScript: () => {
    let frame = document.querySelector("#dwmtBlockFrame");
    frame.remove();
  }
};

let durationPanel = {
  element: document.querySelector("#dwmtDuration"),
  hasRemainingTime: (dailyDuration, dailyLimitedHour) => {
    return dailyLimitedHour * 3600 - dailyDuration >= 0;
  },
  Update: (dailyDuration, dailyLimitedHour) => {
    let remainingTime = durationToHHMMSS(dailyLimitedHour * 3600 - dailyDuration);
    let el = durationPanel.element;
    if (!!el) {
      el.innerText = remainingTime;
    } else {
      let target = document.querySelector("#search-input");
      el = createElementWithAttributes("div", { id: "dwmtDuration", innerText: remainingTime });
      !!el && (durationPanel.element = el) && target?.parentNode.insertBefore(el, target.nextSibling);
    }
  },
};

function createElementWithAttributes(elementName, attributeObj) {
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
}

function injectAlertPanel() {
  let infoDiv = null;

  let setAlertPanel = setInterval(() => {
    console.log("settimeout is processing...");
    infoDiv = document.querySelector("#primary-inner");
    if (!!infoDiv) {
      let text = createElementWithAttributes("div", { id: "dwmtDiv", innerText: "廢片" });
      infoDiv.prepend(text);
      clearInterval(setAlertPanel);
    }
  }, 500);
}

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
