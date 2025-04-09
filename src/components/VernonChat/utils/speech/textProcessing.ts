
// Process text to make it sound more natural
export const processTextForNaturalSpeech = (text: string): string => {
  // Remove HTML tags first
  let processedText = text.replace(/<[^>]*>/g, '');
  
  // Remove strong tags and other formatting that might cause issues
  processedText = processedText.replace(/<\/?strong>/g, '');
  processedText = processedText.replace(/\*\*/g, '');
  
  // Replace patterns that might appear in search results
  const categories = ['Live Entertainment', 'Nightlife', 'Food', 'Restaurants', 'Events', 'Attractions'];
  categories.forEach(category => {
    // Remove patterns like "<strong>Category</strong>: " or "Category: "
    const patternWithTags = new RegExp(`<strong>${category}<\/strong>:\\s*`, 'gi');
    const patternWithoutTags = new RegExp(`${category}:\\s*`, 'gi');
    
    processedText = processedText.replace(patternWithTags, '');
    processedText = processedText.replace(patternWithoutTags, '');
  });
  
  // Convert numbers to words for more natural speech
  processedText = processedText.replace(/\b(\d+)\b/g, (match, number) => {
    // Only convert small numbers, leave larger ones as digits
    if (parseInt(number) < 100) {
      return convertNumberToWords(parseInt(number));
    }
    return match;
  });
  
  // Add natural pauses and inflection for better prosody
  processedText = processedText
    .replace(/\./g, '. ')
    .replace(/\,/g, ', ')
    .replace(/\!/g, '! ')
    .replace(/\?/g, '? ')
    // Add breathing pauses for more natural sound
    .replace(/([.!?])\s+/g, '$1 <break time="600ms"/> ')
    .replace(/(,|;)\s+/g, '$1 <break time="400ms"/> ')
    // Add emphasis on certain words for more expressive speech
    .replace(/\b(fantastic|amazing|incredible|excellent|awesome)\b/gi, '<emphasis>$1</emphasis>')
    // Remove the SSML-like tags before actual synthesis since browser speech API doesn't support them
    .replace(/<break time="(\d+)ms"\/>/g, '')
    .replace(/<emphasis>(.*?)<\/emphasis>/g, '$1');
    
  return processedText;
};

// Convert numbers to words for more natural pronunciation
export function convertNumberToWords(num: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (num < 20) return ones[num];
  
  const digit = num % 10;
  if (num < 100) return tens[Math.floor(num / 10)] + (digit ? '-' + ones[digit] : '');
  
  return num.toString();
}
