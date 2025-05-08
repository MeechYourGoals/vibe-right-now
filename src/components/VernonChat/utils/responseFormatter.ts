
/**
 * This utility formats AI responses for better display in the chat interface
 */
export const formatResponse = (text: string): string => {
  // Convert plain text URLs to clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>');
  
  // Convert asterisk bullet points to proper HTML lists
  const bulletRegex = /\n\s*\*\s(.*)/g;
  if (bulletRegex.test(formattedText)) {
    let listItems = '';
    formattedText = formattedText.replace(bulletRegex, (match, item) => {
      listItems += `<li>${item}</li>`;
      return '';
    });
    
    if (listItems) {
      formattedText += `<ul class="list-disc pl-5 my-2">${listItems}</ul>`;
    }
  }
  
  // Convert numbered lists to proper HTML ordered lists
  const numberedRegex = /\n\s*(\d+)\.\s(.*)/g;
  if (numberedRegex.test(formattedText)) {
    let listItems = '';
    formattedText = formattedText.replace(numberedRegex, (match, number, item) => {
      listItems += `<li>${item}</li>`;
      return '';
    });
    
    if (listItems) {
      formattedText += `<ol class="list-decimal pl-5 my-2">${listItems}</ol>`;
    }
  }
  
  // Replace newlines with HTML line breaks
  formattedText = formattedText.replace(/\n/g, '<br>');
  
  return formattedText;
};

/**
 * Formats long text to add "read more" functionality
 */
export const truncateWithReadMore = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  return `${truncated}... <span class="text-blue-500 cursor-pointer read-more">Read more</span>`;
};

/**
 * Formats location data for chat response
 */
export const formatLocationResponse = (location: any): string => {
  return `
    <div class="venue-result">
      <h3>${location.name}</h3>
      <p>${location.address}, ${location.city}, ${location.state}</p>
      ${location.rating ? `<p>Rating: ${location.rating}/5</p>` : ''}
      ${location.type ? `<p>Type: ${location.type}</p>` : ''}
      <a href="/venue/${location.id}" class="view-link">View Details</a>
    </div>
  `;
};

export const cleanResponseText = (text: string): string => {
  return text
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .trim();
};

export default {
  formatResponse,
  truncateWithReadMore,
  formatLocationResponse,
  cleanResponseText
};
