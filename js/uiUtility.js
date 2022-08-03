let blockPanel = {
  element: document.querySelector("#dwmtBlock"),
  Toggle: () => {
    try {
      let el = blockPanel.element;
      if (!!el) {
        el.style.display == "block" ? (el.style.display = "none") : (el.style.display = "block");
      } else {
        el = createElementWithAttributes("div", { id: "dwmtBlock" });
        !!el && (blockPanel.element = el) && document.body.appendChild(el);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  IsShow: () => ["", "block"].includes(blockPanel.element?.style.display),
};

let durationPanel = {
  element: document.querySelector("#dwmtDuration"),
  hasRemainingTime: (dailyDuration, dailyLimitedHour) =>{
    return (dailyLimitedHour * 3600 - dailyDuration) >= 0;
  },
  Update: (dailyDuration, dailyLimitedHour) => {
    let remainingTime = durationToHHMMSS(dailyLimitedHour * 3600 - dailyDuration);
    let el = durationPanel.element;
    if(!!el){
      el.innerText = remainingTime;
    }
    else{
      let target = document.querySelector("#search-input");
      el = createElementWithAttributes("div", { id: "dwmtDuration", innerText: remainingTime });
      !!el && (durationPanel.element = el) && target?.parentNode.insertBefore(el,target.nextSibling);
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
