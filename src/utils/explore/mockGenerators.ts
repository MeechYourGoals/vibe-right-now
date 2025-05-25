
import { Location } from "@/types";

export const getCitySpecificContent = (location: Location): string => {
  const contents = [
    `Amazing atmosphere at ${location.name}! The energy here is incredible.`,
    `Perfect spot for a night out! ${location.name} never disappoints.`,
    `Great vibes at ${location.name}. Highly recommend checking it out!`,
    `Had an amazing time at ${location.name}. The crowd was fantastic!`,
    `${location.name} is the place to be! Such a great experience.`
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
};
