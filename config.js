/**
 * Configuration Constants
 * Modify these values to customize app behavior
 */

const CONFIG = {
  // Timer between sends (milliseconds)
  TIMER_DURATION: 4000,

  // Timer update interval (milliseconds)
  TIMER_UPDATE_INTERVAL: 100,

  // Max progress dots to show
  MAX_DOTS: 8,

  // File input accepted formats
  ACCEPTED_FILES: '.vcf,.txt',

  // Default placeholder text
  PLACEHOLDERS: {
    name: '—',
    number: '—',
  },

  // Messages
  MESSAGES: {
    noContacts: 'No contacts found',
    oneContact: '1 contact loaded',
    multipleContacts: 'contacts loaded',
  },
};
