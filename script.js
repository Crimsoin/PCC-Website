// --- Consultation Modal ---
function openConsultationModal() {
  const modal = document.getElementById('consultationModal');
  modal.style.display = 'flex';
}

function closeConsultationModal() {
  const modal = document.getElementById('consultationModal');
  modal.style.display = 'none';
}

// Optional: Close modal if outside clicked
window.onclick = function(event) {
  const modal = document.getElementById('consultationModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// --- Carousel Looping Animation ---
const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  const firstCard = carousel.querySelector(".course-card");
  const cardWidth = firstCard.offsetWidth + 20; // includes margin

  // Shrink the first card before sliding
  firstCard.classList.add("shrink-out");
  carousel.style.transition = "transform 0.5s ease";
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    // Move card to end
    firstCard.classList.remove("shrink-out");
    carousel.appendChild(firstCard);
    carousel.style.transition = "none";
    carousel.style.transform = "translateX(0)";

    // Add grow animation to newly added card
    firstCard.classList.add("pop-in");
    setTimeout(() => {
      firstCard.classList.remove("pop-in");
    }, 300);
  }, 500);
});

// --- Chatbot Toggle ---
function toggleRobotPopup() {
  const popup = document.getElementById('robotPopup');
  popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
}

// --- Chatbot Messaging Logic ---
// --- Chatbot Messaging Logic ---
let faqList = [];

// Load FAQ data from local JSON
fetch('faq.json')
  .then(response => response.json())
  .then(data => {
    faqList = data;
    console.log("FAQ data loaded:", faqList); // ✅ Debug
  })
  .catch(err => console.error("Failed to load FAQ data", err));

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  // Show typing indicator
  const chatBody = document.getElementById('chatBody');
  const typingEl = document.createElement('div');
  typingEl.className = 'typing-indicator';
  typingEl.id = 'typing';
  typingEl.innerText = 'Support Bot is typing...';
  chatBody.appendChild(typingEl);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate typing delay then respond
  setTimeout(() => {
    typingEl.remove();
    const reply = getBotResponse(text);
    appendMessage("bot", reply);
  }, 1000);
}

function appendMessage(sender, text) {
  const chatBody = document.getElementById('chatBody');
  const message = document.createElement('div');
  message.className = sender === 'user' ? 'user-message' : 'bot-message';
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
  const msg = input.toLowerCase().replace(/[^\w\s]/g, '');

  const match = faqList.find(faq => {
    const q = faq.question.toLowerCase().replace(/[^\w\s]/g, '');
    return msg.includes(q) || q.includes(msg);
  });

  return match
    ? match.answer
    : "Sorry, I couldn't find an answer for that. Try asking about enrollment, pricing, or contact info.";
}
