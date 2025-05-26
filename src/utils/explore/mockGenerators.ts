
export const getCitySpecificContent = (location: any) => {
  const contents = [
    `Amazing vibes at ${location.name}! Perfect spot for ${location.type === 'restaurant' ? 'dinner' : 'drinks'}.`,
    `Just discovered this gem in ${location.city}. The atmosphere is incredible!`,
    `Love the energy here at ${location.name}. Definitely coming back!`,
    `${location.name} never disappoints. Great ${location.type === 'bar' ? 'cocktails' : 'food'} and amazing crowd.`
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
};
