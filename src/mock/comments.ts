import { Comment } from "@/types";
import { mockUsers } from "@/mock/users";
import { getRecentTime } from "./time-utils";

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    user: mockUsers[5],
    content: "The view is amazing! What DJ is playing?",
    text: "The view is amazing! What DJ is playing?",
    timestamp: getRecentTime(0.5),
    vibedHere: false,
    likes: 0
  },
  {
    id: "2",
    postId: "1",
    user: mockUsers[10],
    content: "Just arrived! Where are you sitting?",
    text: "Just arrived! Where are you sitting?",
    timestamp: getRecentTime(0.2),
    vibedHere: true,
    likes: 0
  },
  {
    id: "3",
    postId: "2",
    user: mockUsers[3],
    content: "Heading there now! Save me a chocolate one!",
    text: "Heading there now! Save me a chocolate one!",
    timestamp: getRecentTime(1.8),
    vibedHere: true,
    likes: 0
  },
  {
    id: "4",
    postId: "3",
    user: mockUsers[7],
    content: "Can't wait to see them! Looking for parking now.",
    text: "Can't wait to see them! Looking for parking now.",
    timestamp: getRecentTime(0.3),
    vibedHere: false,
    likes: 0
  },
  {
    id: "5",
    postId: "3",
    user: mockUsers[11],
    content: "I'm near the front! It's not too crowded yet!",
    text: "I'm near the front! It's not too crowded yet!",
    timestamp: getRecentTime(0.1),
    vibedHere: true,
    likes: 0
  },
  {
    id: "6",
    postId: "6",
    user: mockUsers[2],
    content: "Who's winning right now? Stuck in traffic!",
    text: "Who's winning right now? Stuck in traffic!",
    timestamp: getRecentTime(0.2),
    vibedHere: false,
    likes: 0
  },
  {
    id: "7",
    postId: "6",
    user: mockUsers[14],
    content: "Just got here! The atmosphere is incredible!",
    text: "Just got here! The atmosphere is incredible!",
    timestamp: getRecentTime(0.1),
    vibedHere: true,
    likes: 0
  },
  {
    id: "8",
    postId: "7",
    user: mockUsers[12],
    content: "Which DJ is on right now? Coming over!",
    text: "Which DJ is on right now? Coming over!",
    timestamp: getRecentTime(0.1),
    vibedHere: true,
    likes: 0
  },
  {
    id: "9",
    postId: "10",
    user: mockUsers[8],
    content: "Best seats in the house! Jealous!",
    text: "Best seats in the house! Jealous!",
    timestamp: getRecentTime(0.05),
    vibedHere: false,
    likes: 0
  },
  {
    id: "10",
    postId: "10",
    user: mockUsers[13],
    content: "I'm in section 115! Let's meet up!",
    text: "I'm in section 115! Let's meet up!",
    timestamp: getRecentTime(0.02),
    vibedHere: true,
    likes: 0
  },
  {
    id: "11",
    postId: "13",
    user: mockUsers[9],
    content: "Which event is on right now? The barrel racing?",
    text: "Which event is on right now? The barrel racing?",
    timestamp: getRecentTime(0.1),
    vibedHere: false,
    likes: 0
  },
  {
    id: "12",
    postId: "13",
    user: mockUsers[20],
    content: "Just arrived! The bull riding is WILD!",
    text: "Just arrived! The bull riding is WILD!",
    timestamp: getRecentTime(0.05),
    vibedHere: true,
    likes: 0
  },
  {
    id: "13",
    postId: "21",
    user: mockUsers[17],
    content: "Who's the headliner tonight? Worth coming?",
    text: "Who's the headliner tonight? Worth coming?",
    timestamp: getRecentTime(0.05),
    vibedHere: false,
    likes: 0
  },
  {
    id: "14",
    postId: "21",
    user: mockUsers[19],
    content: "I'm here too! Best comedy show I've seen all year!",
    text: "I'm here too! Best comedy show I've seen all year!",
    timestamp: getRecentTime(0.02),
    vibedHere: true,
    likes: 0
  },
  {
    id: "15",
    postId: "25",
    user: mockUsers[21],
    content: "Is the light show worth it? Thinking of heading over now!",
    text: "Is the light show worth it? Thinking of heading over now!",
    timestamp: getRecentTime(0.3),
    vibedHere: false,
    likes: 0
  },
  {
    id: "16",
    postId: "25",
    user: mockUsers[22],
    content: "Just arrived! The colors are magical tonight!",
    text: "Just arrived! The colors are magical tonight!",
    timestamp: getRecentTime(0.2),
    vibedHere: true,
    likes: 0
  },
  {
    id: "17",
    postId: "26",
    user: mockUsers[14],
    content: "Did you go to the top? How long is the wait?",
    text: "Did you go to the top? How long is the wait?",
    timestamp: getRecentTime(0.2),
    vibedHere: false,
    likes: 0
  },
  {
    id: "18",
    postId: "26",
    user: mockUsers[16],
    content: "Here now too! The view of Paris at night is unbeatable!",
    text: "Here now too! The view of Paris at night is unbeatable!",
    timestamp: getRecentTime(0.1),
    vibedHere: true,
    likes: 0
  },
  {
    id: "19",
    postId: "27",
    user: mockUsers[15],
    content: "Who was the surprise guest?? Stuck in traffic!",
    text: "Who was the surprise guest?? Stuck in traffic!",
    timestamp: getRecentTime(0.05),
    vibedHere: false,
    likes: 0
  },
  {
    id: "20",
    postId: "27",
    user: mockUsers[18],
    content: "Second stage is better right now! No crowds and amazing performance!",
    text: "Second stage is better right now! No crowds and amazing performance!",
    timestamp: getRecentTime(0.01),
    vibedHere: true,
    likes: 0
  },
  {
    id: "21",
    postId: "28",
    user: mockUsers[0],
    content: "Any exclusive items only available there?",
    text: "Any exclusive items only available there?",
    timestamp: getRecentTime(0.1),
    vibedHere: false,
    likes: 0
  },
  {
    id: "22",
    postId: "28",
    user: mockUsers[1],
    content: "Just arrived! The limited edition bags are stunning!",
    text: "Just arrived! The limited edition bags are stunning!",
    timestamp: getRecentTime(0.05),
    vibedHere: true,
    likes: 0
  },
];
