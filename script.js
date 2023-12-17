// script.js
document.addEventListener("DOMContentLoaded", function () {
  const timelineDot = document.getElementById("timelineDot");
  const timelineMedia = document.getElementById("timelineMedia");
  const timelineText = document.getElementById("timelineText");
  const readMoreButton = document.getElementById("readMoreButton");

  let currentIndex = 0;
  let isDragging = false;
  let isFullDescription = false;

  // Initialize timeline
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("div");
    dot.className = "timeline-dot";
    dot.addEventListener("mousedown", (event) => startDrag(event, i));
    timelineDot.appendChild(dot);
  }

  // Show timeline item
  function showTimelineItem(index) {
    currentIndex = index;
    updateTimelineItem();
  }

  // Update timeline item based on currentIndex
  function updateTimelineItem() {
    // Remove highlighting from all media items
    Array.from(timelineMedia.children).forEach((child) => {
      child.classList.remove("highlighted");
    });

    // Highlight the current media item
    timelineMedia.children[currentIndex].classList.add("highlighted");

    // Update dot position
    const dotPosition = (currentIndex / (timelineMedia.children.length - 1)) * 100;
    timelineDot.style.left = `${dotPosition}%`;

    // Display the current timeline item
    updateDescription();
  }

  // Update description content
  function updateDescription() {
    const shortDescription = `Description for Media ${currentIndex + 1}`;
    const fullDescription = `Extended description for Media ${currentIndex + 1}. This is a longer text providing more details about the media item.`;

    timelineText.textContent = isFullDescription ? fullDescription : shortDescription;
    readMoreButton.textContent = isFullDescription ? "Read Less" : "Read More...";
  }

  // Handle drag events
  function startDrag(event, index) {
    isDragging = true;
    event.preventDefault();
    showTimelineItem(index);

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  }

  function handleDrag(event) {
    if (isDragging) {
      const timelineRect = timelineMedia.getBoundingClientRect();
      const newPosition = (event.clientX - timelineRect.left) / timelineRect.width;
      currentIndex = Math.round(newPosition * (timelineMedia.children.length - 1));
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
          currentIndex = Math.min(currentIndex + 1, timelineMedia.children.length - 1);
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
