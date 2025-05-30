const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.storage.sync.get(null, (options) => {
  applyOptions(options);

  const observer = new MutationObserver(() => {
    applyOptions(options);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function applyOptions(options) {
    const thumbnails = document.querySelectorAll("ytd-thumbnail");
    const videos = document.querySelectorAll("ytd-video-renderer, ytd-grid-video-renderer");

    thumbnails.forEach((thumbnail) => {
      const img = thumbnail.querySelector("img");
      if (!img) return;

      // Thumbnail options
      if (options.hideThumbnails) {
        img.style.visibility = "hidden";
      } else if (options.blurThumbnails) {
        img.style.filter = "blur(10px)";
      } else if (options.solidColor) {
        img.style.visibility = "hidden";
        thumbnail.style.backgroundColor = "#cccccc";
      } else {
        img.style.visibility = "visible";
        img.style.filter = "none";
        thumbnail.style.backgroundColor = "";
      }
    });

    // Distraction-free mode
    if (options.distractionFree) {
      const elementsToHide = [
        "#related", "#comments", "#secondary", "ytd-watch-next-secondary-results-renderer"
      ];
      elementsToHide.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) element.style.display = "none";
      });
    }
  }
});
