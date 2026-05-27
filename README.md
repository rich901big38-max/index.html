# Bulk SMS App

A clean, modular web application for sending bulk SMS messages to imported contacts.

## Features

- 📝 Compose messages with character count
- 📁 Import contacts from .vcf or .txt files
- 📞 Send SMS to multiple contacts sequentially
- ⏱️ Built-in delays between sends
- 📊 Progress tracking with visual indicators
- 🌙 Dark mode support
- 📱 Mobile-optimized responsive design

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling and CSS variables
├── config.js       # Configuration constants
├── parser.js       # Contact file parsing logic
├── ui.js           # UI update functions
├── app.js          # Main application state & logic
└── README.md       # This file
```

## How to Use

1. **Type your message** in the "Message" field
2. **Import contacts** by uploading a .vcf or .txt file
3. **Click "Start sending"** to begin
4. **Review each contact** and click "Send to [Name]"
5. **Skip contacts** if needed with the Skip button
6. **View results** on the completion screen

## Supported File Formats

### VCF (vCard)
Standard vCard format with FN (Full Name) and TEL (Telephone) fields.

### TXT
Two supported formats:
- **CSV/TSV**: `Name,PhoneNumber` or `Name\tPhoneNumber`
- **Phone numbers only**: One phone number per line

## Configuration

Edit `config.js` to customize:

- `TIMER_DURATION` - Milliseconds between sends (default: 4000)
- `TIMER_UPDATE_INTERVAL` - Timer animation update rate (default: 100)
- `MAX_DOTS` - Number of progress dots shown (default: 8)
- `MESSAGES` - UI text labels

## Customization

### Add New File Format

Edit `parser.js` and add a new parsing function:

```javascript
parseCSV(text) {
  // Your parsing logic
  return contacts;
},
```

Update `Parser.parseFile()` to handle the new format.

### Change Colors

Edit `styles.css` `:root` variables:

```css
:root {
  --bg: #f5f4f0;
  --accent: #1a1a1a;
  --green: #22c55e;
  /* etc */
}
```

### Modify UI Elements

Edit `ui.js` functions or update HTML elements in `index.html`.

## Browser Compatibility

- Modern browsers with ES6 support
- Mobile browsers (iOS, Android)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## SMS Protocol

This app uses the `sms:` URL scheme to trigger the device's native SMS app with pre-filled message and recipient.

**Note**: Actual message sending depends on device SMS capabilities.

## License

Open source - Feel free to modify and distribute.
