/**
 * Main Application Module
 * Orchestrates the bulk SMS sending workflow
 */

const App = {
  // State
  contacts: [],
  current: 0,
  sentCount: 0,
  message: '',
  timerInterval: null,

  /**
   * Initialize the application
   */
  init() {
    console.log('Bulk SMS app initialized');
  },

  /**
   * Handle file import
   * @param {event} event - File input change event
   */
  importFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.contacts = Parser.parseFile(file.name, e.target.result);
      UI.updateContactCount(this.contacts.length);
      this.checkReadiness();
    };
    reader.readAsText(file);
  },

  /**
   * Check if app is ready to send
   */
  checkReadiness() {
    const hasMessage = document.getElementById('msg').value.trim();
    const hasContacts = this.contacts.length > 0;
    UI.updateStartButton(hasMessage && hasContacts);
  },

  /**
   * Start the sending process
   */
  startSending() {
    if (document.getElementById('start-btn').classList.contains('disabled')) return;

    this.message = document.getElementById('msg').value.trim();
    this.current = 0;
    this.sentCount = 0;

    UI.showStep('step-send');
    this.showNextContact();
  },

  /**
   * Display next contact or end if all sent
   */
  showNextContact() {
    if (this.current >= this.contacts.length) {
      UI.showDoneScreen(this.sentCount);
      return;
    }

    const contact = this.contacts[this.current];
    UI.showContact(contact, this.current, this.contacts.length);
    UI.resetTimer();
  },

  /**
   * Handle send tap
   */
  handleSendTap() {
    this.sentCount++;
    this.current++;
    this.startTimer();
  },

  /**
   * Start timer between sends
   */
  startTimer() {
    UI.showTimer();

    if (this.timerInterval) clearInterval(this.timerInterval);

    let elapsed = 0;
    this.timerInterval = setInterval(() => {
      elapsed += CONFIG.TIMER_UPDATE_INTERVAL;
      const progress = (elapsed / CONFIG.TIMER_DURATION) * 100;
      UI.updateTimerFill(progress);

      if (elapsed >= CONFIG.TIMER_DURATION) {
        clearInterval(this.timerInterval);
        this.showNextContact();
      }
    }, CONFIG.TIMER_UPDATE_INTERVAL);
  },

  /**
   * Skip current contact
   */
  skipContact() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.current++;
    this.showNextContact();
  },

  /**
   * Reset app to initial state
   */
  resetApp() {
    this.contacts = [];
    this.current = 0;
    this.sentCount = 0;
    this.message = '';

    if (this.timerInterval) clearInterval(this.timerInterval);

    UI.resetForm();
    UI.showStep('step-setup');
  },
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// ===================================
// GLOBAL FUNCTIONS (for HTML onclick)
// ===================================

function countChars() {
  UI.countChars();
  App.checkReadiness();
}

function importFile(event) {
  App.importFile(event);
}

function startSending() {
  App.startSending();
}

function onSendTap() {
  App.handleSendTap();
}

function skipContact() {
  App.skipContact();
}

function resetApp() {
  App.resetApp();
}
