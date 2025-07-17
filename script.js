// Modal functionality
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

function toggleRobotPopup() {
  const popup = document.getElementById('robotPopup');
  popup.classList.toggle('show');
}
