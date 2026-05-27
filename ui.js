/**
 * UI Module
 * Handles all UI updates and interactions
 */

const UI = {
  /**
   * Count and display characters in message
   */
  countChars() {
    const msgInput = document.getElementById('msg');
    const charsDisplay = document.getElementById('chars');
    charsDisplay.textContent = msgInput.value.length;
  },

  /**
   * Update contact count display
   * @param {number} count - Number of contacts loaded
   */
  updateContactCount(count) {
    const display = document.getElementById('contact-count');
    if (!count) {
      display.textContent = CONFIG.MESSAGES.noContacts;
    } else if (count === 1) {
      display.textContent = CONFIG.MESSAGES.oneContact;
    } else {
      display.textContent = count + ' ' + CONFIG.MESSAGES.multipleContacts;
    }
  },

  /**
   * Show/hide primary button based on readiness
   * @param {boolean} isReady - Whether form is ready to submit
   */
  updateStartButton(isReady) {
    const btn = document.getElementById('start-btn');
    btn.classList.toggle('disabled', !isReady);
  },

  /**
   * Switch between steps
   * @param {string} stepId - ID of step to show
   */
  showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
      step.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
  },

  /**
   * Display current contact information
   * @param {object} contact - Contact object {name, number}
   * @param {number} current - Current index
   * @param {number} total - Total contacts
   */
  showContact(contact, current, total) {
    document.getElementById('contact-name').textContent = contact.name;
    document.getElementById('contact-number').textContent = contact.number;
    document.getElementById('progress-text').textContent = `${current + 1} of ${total}`;
    document.getElementById('btn-name').textContent = contact.name;

    const link = document.getElementById('send-link');
    link.href = `sms:${contact.number}&body=${encodeURIComponent(App.message)}`;
    link.classList.remove('disabled');
    link.style.pointerEvents = 'auto';

    document.querySelector('.btn-ghost').style.opacity = '1';
    document.querySelector('.btn-ghost').style.pointerEvents = 'auto';

    this.buildProgressDots(current, total);
  },

  /**
   * Build progress dot indicators
   * @param {number} current - Current index
   * @param {number} total - Total contacts
   */
  buildProgressDots(current, total) {
    const container = document.getElementById('progress-dots');
    const maxDots = Math.min(total, CONFIG.MAX_DOTS);
    container.innerHTML = '';

    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      let className = 'dot';
      if (i < current) className += ' done';
      else if (i === current) className += ' current';
      dot.className = className;
      container.appendChild(dot);
    }
  },

  /**
   * Hide timer and reset fill
   */
  resetTimer() {
    const track = document.getElementById('timer-track');
    const fill = document.getElementById('timer-fill');
    track.style.display = 'none';
    fill.style.width = '0%';
  },

  /**
   * Show timer track and disable send button
   */
  showTimer() {
    const track = document.getElementById('timer-track');
    const link = document.getElementById('send-link');
    const skip = document.querySelector('.btn-ghost');

    track.style.display = 'block';
    link.classList.add('disabled');
    link.style.pointerEvents = 'none';
    skip.style.opacity = '0.3';
    skip.style.pointerEvents = 'none';
  },

  /**
   * Animate timer fill bar
   * @param {number} progress - Progress percentage (0-100)
   */
  updateTimerFill(progress) {
    const fill = document.getElementById('timer-fill');
    fill.style.width = Math.min(progress, 100) + '%';
  },

  /**
   * Display final sent count
   * @param {number} count - Number of contacts sent to
   */
  showDoneScreen(count) {
    document.getElementById('sent-count').textContent = count;
    this.showStep('step-done');
  },

  /**
   * Clear setup form
   */
  resetForm() {
    document.getElementById('msg').value = '';
    document.getElementById('chars').textContent = '0';
    document.getElementById('contact-count').textContent = '';
    document.getElementById('start-btn').classList.add('disabled');
  },
};
