
import { Comment } from "@/types";
import { mockUsers } from "./users";

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    postId: "1",
    user: mockUsers[0],
    content: "This place has amazing vibes! The crowd is always energetic and the music is perfect.",
    text: "This place has amazing vibes! The crowd is always energetic and the music is perfect.",
    timestamp: "2024-01-15T14:30:00Z",
    vibedHere: true,
    likes: 12
  },
  {
    id: "comment-2",
    postId: "1",
    user: mockUsers[1],
    content: "Been here multiple times and it never disappoints. The atmosphere is unmatched!",
    text: "Been here multiple times and it never disappoints. The atmosphere is unmatched!",
    timestamp: "2024-01-15T15:45:00Z",
    vibedHere: false,
    likes: 8
  },
  {
    id: "comment-3",
    postId: "2",
    user: mockUsers[2],
    content: "Perfect spot for a night out with friends. The service is top-notch too.",
    text: "Perfect spot for a night out with friends. The service is top-notch too.",
    timestamp: "2024-01-14T20:15:00Z",
    vibedHere: true,
    likes: 15
  },
  {
    id: "comment-4",
    postId: "2",
    user: mockUsers[3],
    content: "Love the aesthetic here! Great for photos and the drinks are creative.",
    text: "Love the aesthetic here! Great for photos and the drinks are creative.",
    timestamp: "2024-01-14T21:30:00Z",
    vibedHere: false,
    likes: 6
  },
  {
    id: "comment-5",
    postId: "3",
    user: mockUsers[4],
    content: "Hidden gem! Not too crowded and has this cozy, intimate feeling.",
    text: "Hidden gem! Not too crowded and has this cozy, intimate feeling.",
    timestamp: "2024-01-13T19:20:00Z",
    vibedHere: true,
    likes: 9
  },
  {
    id: "comment-6",
    postId: "3",
    user: mockUsers[5],
    content: "The live music here is incredible. Definitely coming back next weekend!",
    text: "The live music here is incredible. Definitely coming back next weekend!",
    timestamp: "2024-01-13T20:45:00Z",
    vibedHere: false,
    likes: 11
  },
  {
    id: "comment-7",
    postId: "4",
    user: mockUsers[6],
    content: "Best brunch spot in the city! The avocado toast is a must-try.",
    text: "Best brunch spot in the city! The avocado toast is a must-try.",
    timestamp: "2024-01-12T11:30:00Z",
    vibedHere: true,
    likes: 7
  },
  {
    id: "comment-8",
    postId: "4",
    user: mockUsers[7],
    content: "Great coffee and the staff is super friendly. Perfect work spot too!",
    text: "Great coffee and the staff is super friendly. Perfect work spot too!",
    timestamp: "2024-01-12T12:15:00Z",
    vibedHere: false,
    likes: 4
  },
  {
    id: "comment-9",
    postId: "5",
    user: mockUsers[8],
    content: "This rooftop view is insane! Sunset vibes hit different here.",
    text: "This rooftop view is insane! Sunset vibes hit different here.",
    timestamp: "2024-01-11T18:45:00Z",
    vibedHere: true,
    likes: 18
  },
  {
    id: "comment-10",
    postId: "5",
    user: mockUsers[9],
    content: "Came here for a date and it was perfect. Romantic and not too loud.",
    text: "Came here for a date and it was perfect. Romantic and not too loud.",
    timestamp: "2024-01-11T19:30:00Z",
    vibedHere: false,
    likes: 13
  },
  {
    id: "comment-11",
    postId: "6",
    user: mockUsers[10],
    content: "Dance floor was packed! The DJ really knows how to read the crowd.",
    text: "Dance floor was packed! The DJ really knows how to read the crowd.",
    timestamp: "2024-01-10T23:15:00Z",
    vibedHere: true,
    likes: 16
  },
  {
    id: "comment-12",
    postId: "6",
    user: mockUsers[11],
    content: "Energy was through the roof! Best night I've had in ages.",
    text: "Energy was through the roof! Best night I've had in ages.",
    timestamp: "2024-01-10T23:45:00Z",
    vibedHere: false,
    likes: 10
  },
  {
    id: "comment-13",
    postId: "7",
    user: mockUsers[12],
    content: "Quiet spot with amazing books and even better coffee. My new study haven!",
    text: "Quiet spot with amazing books and even better coffee. My new study haven!",
    timestamp: "2024-01-09T14:20:00Z",
    vibedHere: true,
    likes: 5
  },
  {
    id: "comment-14",
    postId: "7",
    user: mockUsers[13],
    content: "Love the book selection here. Staff gave great recommendations too!",
    text: "Love the book selection here. Staff gave great recommendations too!",
    timestamp: "2024-01-09T15:30:00Z",
    vibedHere: false,
    likes: 3
  },
  {
    id: "comment-15",
    postId: "8",
    user: mockUsers[14],
    content: "The workout classes here are intense but so worth it. Great community!",
    text: "The workout classes here are intense but so worth it. Great community!",
    timestamp: "2024-01-08T07:45:00Z",
    vibedHere: true,
    likes: 8
  },
  {
    id: "comment-16",
    postId: "8",
    user: mockUsers[15],
    content: "Equipment is top quality and the trainers are super knowledgeable.",
    text: "Equipment is top quality and the trainers are super knowledgeable.",
    timestamp: "2024-01-08T08:30:00Z",
    vibedHere: false,
    likes: 6
  },
  {
    id: "comment-17",
    postId: "9",
    user: mockUsers[16],
    content: "Beach vibes in the city! Love the sand volleyball courts.",
    text: "Beach vibes in the city! Love the sand volleyball courts.",
    timestamp: "2024-01-07T16:20:00Z",
    vibedHere: true,
    likes: 12
  },
  {
    id: "comment-18",
    postId: "9",
    user: mockUsers[17],
    content: "Perfect spot for a casual game with friends. Great atmosphere!",
    text: "Perfect spot for a casual game with friends. Great atmosphere!",
    timestamp: "2024-01-07T17:00:00Z",
    vibedHere: false,
    likes: 9
  },
  {
    id: "comment-19",
    postId: "10",
    user: mockUsers[18],
    content: "Art exhibition was mind-blowing! The interactive pieces were my favorite.",
    text: "Art exhibition was mind-blowing! The interactive pieces were my favorite.",
    timestamp: "2024-01-06T13:15:00Z",
    vibedHere: true,
    likes: 14
  },
  {
    id: "comment-20",
    postId: "10",
    user: mockUsers[19],
    content: "Such a unique experience. The artists really pushed boundaries here.",
    text: "Such a unique experience. The artists really pushed boundaries here.",
    timestamp: "2024-01-06T14:30:00Z",
    vibedHere: false,
    likes: 11
  },
  {
    id: "comment-21",
    postId: "11",
    user: mockUsers[20],
    content: "Arcade games brought back so many childhood memories! Plus great pizza.",
    text: "Arcade games brought back so many childhood memories! Plus great pizza.",
    timestamp: "2024-01-05T20:45:00Z",
    vibedHere: true,
    likes: 7
  },
  {
    id: "comment-22",
    postId: "11",
    user: mockUsers[21],
    content: "Perfect date spot! Competitive but fun, and the retro atmosphere is amazing.",
    text: "Perfect date spot! Competitive but fun, and the retro atmosphere is amazing.",
    timestamp: "2024-01-05T21:20:00Z",
    vibedHere: false,
    likes: 8
  }
];
