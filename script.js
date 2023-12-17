// script.js
document.addEventListener("DOMContentLoaded", function () {
    const timelineDot = document.getElementById("timelineDot");
    const timelineImages = document.getElementById("timelineImages");
    const timelineText = document.getElementById("timelineText");
    const readMoreButton = document.getElementById("readMoreButton");
  
    let currentIndex = 0;
    let isDragging = false;
    let isFullDescription = false;
  
    // Initialize timeline
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement("div");
      dot.className = "timeline-dot";
      timelineDot.appendChild(dot);
    }
  
    // Show timeline item
    function showTimelineItem(index) {
      currentIndex = index;
      updateTimelineItem();
    }
  
    // Update timeline item based on currentIndex
    function updateTimelineItem() {
      // Remove highlighting from all images
      Array.from(timelineImages.children).forEach((child) => {
        child.classList.remove("highlighted");
      });
  
      // Highlight the current image
      timelineImages.children[currentIndex].classList.add("highlighted");
  
      // Update dot position
      const dotPosition = (currentIndex / (timelineImages.children.length - 1)) * 100;
      timelineDot.style.left = `${dotPosition}%`;
  
      // Display the current timeline item
      updateDescription();
    }
  
    // Update description content
    function updateDescription() {
      const shortDescription = `Description for Image ${currentIndex + 1}`;
      const fullDescription = `Extended description for Image ${currentIndex + 1}. This is a longer text providing more details about the image.`;
  
      timelineText.textContent = isFullDescription ? fullDescription : shortDescription;
      readMoreButton.textContent = isFullDescription ? "Read Less" : "Read More...";
    }
  
    // Handle drag events
    timelineDot.addEventListener("mousedown", startDrag);
  
    function startDrag(event) {
      isDragging = true;
      event.preventDefault();
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", stopDrag);
    }
  
    function handleDrag(event) {
      if (isDragging) {
        const timelineRect = timelineImages.getBoundingClientRect();
        const newPosition = (event.clientX - timelineRect.left) / timelineRect.width;
        currentIndex = Math.round(newPosition * (timelineImages.children.length - 1));
        updateTimelineItem();
      }
    }
  
    function stopDrag() {
      isDragging = false;
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    }
  
    // Handle arrow key events
    document.addEventListener("keydown", function (event) {
      if (!isDragging) {
        switch (event.key) {
          case "ArrowLeft":
            currentIndex = Math.max(currentIndex - 1, 0);
            break;
          case "ArrowRight":
            currentIndex = Math.min(currentIndex + 1, timelineImages.children.length - 1);
            break;
        }
        updateTimelineItem();
      }
    });
  
    // Toggle between short and full descriptions
    readMoreButton.addEventListener("click", toggleDescription);
  
    function toggleDescription() {
      isFullDescription = !isFullDescription;
      updateDescription();
    }
  
    // Initialize timeline on load
    updateTimelineItem();
  });
  