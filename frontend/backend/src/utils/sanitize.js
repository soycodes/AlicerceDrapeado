/**
 * utils/sanitize.js
 * Server-side sanitization to prevent XSS and injection attacks.
 * Defense-in-depth: frontend also sanitizes, but we never trust client input.
 */

/**
 * Strips HTML tags and control characters from a string.
 * @param {string} input
 * @returns {string}
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''

  return input
    // Remove HTML/XML tags
    .replace(/<[^>]*>/g, '')
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove dangerous JS event attributes residue
    .replace(/on\w+\s*=/gi, '')
    // Trim whitespace
    .trim()
    // Limit length as extra safeguard
    .slice(0, 2000)
}
