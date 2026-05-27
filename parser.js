/**
 * Contact Parser Module
 * Handles VCF and TXT file parsing
 */

const Parser = {
  /**
   * Parse VCF (vCard) format
   * @param {string} text - VCF file content
   * @returns {array} Array of contact objects
   */
  parseVCF(text) {
    const contacts = [];
    text.split('BEGIN:VCARD').forEach(card => {
      const nameMatch = card.match(/FN:(.*)/);
      const telMatch = card.match(/TEL[^:]*:([\d\s\+\-\(\)]+)/);

      if (nameMatch && telMatch) {
        contacts.push({
          name: nameMatch[1].trim(),
          number: telMatch[1].replace(/\s/g, '').trim(),
        });
      }
    });
    return contacts;
  },

  /**
   * Parse TXT format (CSV/TSV with name,number or just numbers)
   * @param {string} text - TXT file content
   * @returns {array} Array of contact objects
   */
  parseTXT(text) {
    const contacts = [];
    text.split('\n')
      .filter(line => line.trim())
      .forEach(line => {
        const parts = line.split(/,|\t/);

        if (parts.length >= 2) {
          // Has both name and number
          contacts.push({
            name: parts[0].trim(),
            number: parts[1].trim(),
          });
        } else {
          // Try to extract phone number only
          const phoneMatch = line.match(/[\d\+][\d\s\-\(\)]{6,}/);
          if (phoneMatch) {
            contacts.push({
              name: 'Contact',
              number: phoneMatch[0].replace(/\s/g, ''),
            });
          }
        }
      });
    return contacts;
  },

  /**
   * Detect file type and parse accordingly
   * @param {string} fileName - Name of the file
   * @param {string} fileContent - Content of the file
   * @returns {array} Array of contact objects
   */
  parseFile(fileName, fileContent) {
    if (fileName.endsWith('.vcf')) {
      return this.parseVCF(fileContent);
    } else if (fileName.endsWith('.txt')) {
      return this.parseTXT(fileContent);
    }
    return [];
  },
};
