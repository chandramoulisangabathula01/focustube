chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      hideThumbnails: false,
      blurThumbnails: false,
      solidColor: false,
      distractionFree: false,
      schedule: { enabled: false, start: "09:00", end: "17:00" },
      focusTimer: false,
      keywords: [],
      darkMode: false,
      durationFilter: { min: 0, max: Infinity },
      highlightKeywords: []
    });
  });
  