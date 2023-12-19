// script.js
document.addEventListener("DOMContentLoaded", function () {
  const timelineDot = document.getElementById("timelineDot");
  const timelineMedia = document.getElementById("timelineMedia");
  const timelineText = document.getElementById("timelineText");
  const readMoreButton = document.getElementById("readMoreButton");

  let currentIndex = 0;
  let isDragging = false;
  let isFullDescription = false;
  let fullDescriptions = ["Sailing has been an integral part of my life for the last 4 years. My sailing journey began in a small dinghies at Shoreline Lake during a summer camp. However, I instantly fell in love with it: now, I’m on a high school sailing club in Redwood Shores with sailors from many different schools (including a Nueva sophomore, Max) where I get to sail Olympic-class International FJ’s. What’s not to love?","Coding has shaped me in so many ways during the last 5 years. I began  learning to code Python, and since then I’ve come a long way. I now do competitive programming in Python (USACO) and Web Development using HTML, CSS, and JavaScript, the very coding languages that were put to work to make this website.","I joined MVLA Service League of Boys (SLOBS) where I made and packed NN sandwiches for the XX event. It was hours of work, but a fulfilling experience, knowing that I am able to help those less fortunate around me. It’s easy to forget the privileges we enjoy here, so it’s important that we maintain a sense of gratitude and giving in our lives.","Music is how I de-stresses. It’s creative and uses different parts of the mind and body than the rest of my day. It is also a very social activity - I get to play with my friends during our chamber ensemble at school. My favorite instrument, by far, is the piano, but I can also play the Alto Saxophone. I’ve been playing the piano for years, including at the Stanford jazz summer workshop.","One thing few people know about me, and almost nobody expects from me, is that I can speak Mandarin.  I chose to learn Mandarin because it allows me tap into one of the world's fastest-growing economies, opening up vast opportunities for business and career advancement. Additionally, mastering Mandarin enhances my cultural competence, fostering stronger connections with a global community and providing a valuable skill in an increasingly interconnected world."]
  let shortDescriptions = ["Unfortunately, we don't get a lot of pictures out on the water... Here's me rigging up my boat for launch (I haven't changed yet).","This is the beginning part of Bach's Invention #13 in A Minor, one of my favorite songs."]

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
    const shortDescription = `Description for Media ${currentIndex + 1}:\n${shortDescriptions[currentIndex]}`;
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
