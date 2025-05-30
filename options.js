document.addEventListener("DOMContentLoaded", () => {
    const hideThumbnails = document.getElementById("hideThumbnails");
    const blurThumbnails = document.getElementById("blurThumbnails");
    const solidColor = document.getElementById("solidColor");
    const distractionFree = document.getElementById("distractionFree");
  
    chrome.storage.sync.get(["hideThumbnails", "blurThumbnails", "solidColor", "distractionFree"], (data) => {
      hideThumbnails.checked = data.hideThumbnails || false;
      blurThumbnails.checked = data.blurThumbnails || false;
      solidColor.checked = data.solidColor || false;
      distractionFree.checked = data.distractionFree || false;
    });
  
    function handleThumbnailOption(selectedOption) {
      const options = [hideThumbnails, blurThumbnails, solidColor];
      
      options.forEach(option => {
        if (option !== selectedOption) {
          option.checked = false;
        }
      });
    }
  
    hideThumbnails.addEventListener('change', () => {
      if (hideThumbnails.checked) {
        handleThumbnailOption(hideThumbnails);
      }
    });
  
    blurThumbnails.addEventListener('change', () => {
      if (blurThumbnails.checked) {
        handleThumbnailOption(blurThumbnails);
      }
    });
  
    solidColor.addEventListener('change', () => {
      if (solidColor.checked) {
        handleThumbnailOption(solidColor);
      }
    });
  
    document.getElementById("save").addEventListener("click", () => {
      chrome.storage.sync.set({
        hideThumbnails: hideThumbnails.checked,
        blurThumbnails: blurThumbnails.checked,
        solidColor: solidColor.checked,
        distractionFree: distractionFree.checked
      }, () => {
        const saveButton = document.getElementById("save");
        const originalText = saveButton.textContent;
        saveButton.textContent = "Settings Saved!";
        saveButton.style.background = "var(--success-color)";
        
        setTimeout(() => {
          saveButton.textContent = originalText;
          saveButton.style.background = "var(--primary-color)";
        }, 2000);
      });
    });
  
    document.getElementById("help").addEventListener("click", () => {
      window.location.href = "info.html";
    });
  });
  