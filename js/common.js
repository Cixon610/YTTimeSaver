const serviceParams = Object.freeze({
  All: 0,
  dailyLimitedHour: 1,
  filterValues: 2,
  enableFlag: 3,
  dayEndTimer: 4,
  dateStamp: 5,
  dailyDuration: 6,
  activeTabInfo: 7
});

function isTimeOverHHMM(stringValue) {
  try {
    let tmparr = stringValue.split(":");
    let targetTime = +tmparr[0] * 60 + +tmparr[1];
    let currentDate = new Date();
    let currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    console.log("currentDate", currentDate.getHours(), currentDate.getMinutes());
    return currentTime >= targetTime;
  } catch (error) {
    console.error("isTimeOverHHMM error!!");
    return false;
  }
}

function getServiceParams(params,callback) {
  try {
    let keys = Object.keys(serviceParams);
    // get params without All key
    params.includes(serviceParams.All) && (keys = keys.slice(1));

    chrome.storage.sync.get(keys, (latestParams) => {
        callback(latestParams);
    });
  } catch (error) {
    console.log(error);
  }
}

function durationToHHMMSS(duration){
  try {
    let s = duration % 60;
    duration = duration - s;
    let m = (duration % 3600) / 60;
    duration = duration - m * 60;
    let h = duration / 3600
    return `${h.toString().padStart(2,0)}:${m.toString().padStart(2,0)}:${s.toString().padStart(2,0)}`;
  } catch (error) {
    console.log(error);
  }
}