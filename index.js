let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    console.log("Button clicked!")
}

themeButton.addEventListener("click", toggleDarkMode);

const addParticipant = (person) => {
  const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${person.name} (${person.email}) with ${person.skinType} skin type has RSVP'd.`;

    const participantsList = document.querySelector('.rsvp-participants');
    participantsList.appendChild(newParticipant);
};

let rotateFactor = 0;
let modalImage = document.getElementById('modal-image');
let intervalId;

const animateImage = () => {
  if (rotateFactor === 0) {
      rotateFactor = -10;
  } else {
      rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

document.addEventListener("DOMContentLoaded", function () {
  const successModal = document.getElementById("success-modal");
  successModal.style.display = "none";
  const closeModalButton = document.querySelector(".close-modal");

  closeModalButton.addEventListener("click", function () {
      successModal.style.display = "none";
      clearInterval(intervalId); 
  });
});

const toggleModal = (person) => {
  let modal = document.getElementById('success-modal');
  let modalText = document.getElementById('modal-text');

  modal.style.display = 'flex';
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;

  intervalId = setInterval(animateImage, 500);

  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 5000);
};

const validateForm = (event) => {
    event.preventDefault();
    let containsErrors = false;
  
    const rsvpInputs = document.getElementById("rsvp-form").elements;
    const person = {
      name: rsvpInputs['name'].value.trim(),
      email: rsvpInputs['email'].value.trim(),
      skinType: rsvpInputs['skin-type'].value.trim()
    };
    
    for (let i = 0; i < rsvpInputs.length; i++) {
        let input = rsvpInputs[i];
    
        if (input.tagName === "INPUT") {
          if (person.name.length < 2) {
            containsErrors = true;
            document.getElementById('name').classList.add("error");
          } else {
            document.getElementById('name').classList.remove("error");
          }
          
          if (person.email.length < 2) {
            containsErrors = true;
            document.getElementById('email').classList.add("error");
          } else {
            document.getElementById('email').classList.remove("error");
          }
          
          if (person.skinType.length < 2) {
            containsErrors = true;
            document.getElementById('skin-type').classList.add("error");
          } else {
            document.getElementById('skin-type').classList.remove("error");
          }
        }
    }

    if (!containsErrors) {
      addParticipant(person);
      toggleModal(person);
      for (let i = 0; i < rsvpInputs.length; i++) {
          rsvpInputs[i].value = "";
      }
    }
};

document.getElementById('rsvp-form').addEventListener('submit', validateForm);
