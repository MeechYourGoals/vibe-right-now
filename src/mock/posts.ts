import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "Amazing rooftop view! The sunset here is incredible. Perfect spot for evening drinks with friends.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" }
    ],
    timestamp: "2024-01-15T18:30:00Z",
    expiresAt: "2024-01-16T06:00:00Z",
    likes: 42,
    comments: 8,
    shares: 3,
    isPinned: true,
    saved: false,
    vibeTags: ["rooftop", "sunset", "drinks"]
  },
  {
    id: "2",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "Best donuts in the city! Just got here and the line is worth it. The glazed ones are still warm!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1114&q=80" }
    ],
    timestamp: "2024-01-15T09:15:00Z",
    expiresAt: "2024-01-15T21:00:00Z",
    likes: 28,
    comments: 5,
    shares: 2,
    saved: false
  },
  {
    id: "3",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "Incredible concert tonight! The energy is electric. So glad I didn't miss this.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1494935408836-507490c54305?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-14T22:45:00Z",
    likes: 55,
    comments: 12,
    shares: 5,
    saved: false,
    vibeTags: ["concert", "livemusic", "nightlife"]
  },
  {
    id: "4",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "Just tried the new burger at this spot. Seriously the best I've ever had. Juicy and full of flavor!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1568901342037-24c7b2c5188f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=960&q=80" }
    ],
    timestamp: "2024-01-14T13:20:00Z",
    likes: 31,
    comments: 7,
    shares: 1,
    saved: false,
    vibeTags: ["burger", "foodporn", "lunch"]
  },
  {
    id: "5",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Exploring the art museum today. So many amazing pieces. Definitely worth a visit!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1556139804-f4f3520becb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-13T16:55:00Z",
    likes: 19,
    comments: 3,
    shares: 0,
    saved: false,
    vibeTags: ["art", "museum", "culture"]
  },
  {
    id: "6",
    user: mockUsers[5],
    location: mockLocations[5],
    content: "Game day at the stadium! The atmosphere is electric. Let's go team!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1556833460-5ca414ca3449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-13T19:00:00Z",
    likes: 63,
    comments: 15,
    shares: 7,
    saved: false,
    vibeTags: ["sports", "gameday", "stadium"]
  },
  {
    id: "7",
    user: mockUsers[6],
    location: mockLocations[6],
    content: "Dancing the night away at this club. The music is on point and the crowd is amazing!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1514525253161-7a46d1cd28f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" }
    ],
    timestamp: "2024-01-12T01:30:00Z",
    likes: 38,
    comments: 9,
    shares: 4,
    saved: false,
    vibeTags: ["club", "nightlife", "dancing"]
  },
  {
    id: "8",
    user: mockUsers[7],
    location: mockLocations[7],
    content: "Relaxing afternoon at the park. Perfect weather for a picnic and some reading.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1504754524776-8f8f4bf79e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-11T14:00:00Z",
    likes: 22,
    comments: 4,
    shares: 1,
    saved: false,
    vibeTags: ["park", "picnic", "nature"]
  },
  {
    id: "9",
    user: mockUsers[8],
    location: mockLocations[8],
    content: "Enjoying a quiet evening at the library. So many books, so little time!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1507842214779-8d045a092233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" }
    ],
    timestamp: "2024-01-10T20:10:00Z",
    likes: 15,
    comments: 2,
    shares: 0,
    saved: false,
    vibeTags: ["library", "books", "reading"]
  },
  {
    id: "10",
    user: mockUsers[9],
    location: mockLocations[9],
    content: "Watching the game from the VIP box. What a view! Go team!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1560184853-0ca95f923991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-09T17:40:00Z",
    likes: 75,
    comments: 18,
    shares: 8,
    saved: false,
    vibeTags: ["sports", "vip", "stadium"]
  },
  {
    id: "11",
    user: mockUsers[10],
    location: mockLocations[10],
    content: "Just finished a workout at the gym. Feeling great and energized!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1517836357463-dcaaa73c36ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-08T08:25:00Z",
    likes: 27,
    comments: 6,
    shares: 2,
    saved: false,
    vibeTags: ["gym", "workout", "fitness"]
  },
  {
    id: "12",
    user: mockUsers[11],
    location: mockLocations[11],
    content: "Enjoying a cup of coffee at my favorite cafe. Perfect way to start the day!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1495516375742-b9c5abef0734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-07T07:00:00Z",
    likes: 33,
    comments: 7,
    shares: 3,
    saved: false,
    vibeTags: ["coffee", "cafe", "morning"]
  },
  {
    id: "13",
    user: mockUsers[12],
    location: mockLocations[12],
    content: "Rodeo night! The energy here is wild. Yeehaw!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1608501824793-c5e39491d38b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-06T21:50:00Z",
    likes: 48,
    comments: 11,
    shares: 5,
    saved: false,
    vibeTags: ["rodeo", "country", "nightlife"]
  },
  {
    id: "14",
    user: mockUsers[13],
    location: mockLocations[13],
    content: "Exploring the botanical garden. So peaceful and beautiful!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1575424909348-22c39c904579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-05T15:30:00Z",
    likes: 29,
    comments: 6,
    shares: 1,
    saved: false,
    vibeTags: ["garden", "nature", "peaceful"]
  },
  {
    id: "15",
    user: mockUsers[14],
    location: mockLocations[14],
    content: "Just got a new tattoo at this shop. Absolutely love it!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1604162451982-0990a14c1946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-04T16:15:00Z",
    likes: 36,
    comments: 8,
    shares: 3,
    saved: false,
    vibeTags: ["tattoo", "art", "bodyart"]
  },
  {
    id: "16",
    user: mockUsers[15],
    location: mockLocations[15],
    content: "Enjoying a spa day. Feeling relaxed and rejuvenated!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1540555700478-4408e64c279b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-03T14:50:00Z",
    likes: 24,
    comments: 5,
    shares: 1,
    saved: false,
    vibeTags: ["spa", "relax", "selfcare"]
  },
  {
    id: "17",
    user: mockUsers[16],
    location: mockLocations[16],
    content: "Just bought a new guitar at this shop. Time to rock!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1519763446582-a9353902ca9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-02T17:20:00Z",
    likes: 41,
    comments: 9,
    shares: 4,
    saved: false,
    vibeTags: ["guitar", "music", "rock"]
  },
  {
    id: "18",
    user: mockUsers[17],
    location: mockLocations[17],
    content: "Enjoying a hike in the mountains. The view is breathtaking!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-01T10:00:00Z",
    likes: 30,
    comments: 7,
    shares: 2,
    saved: false,
    vibeTags: ["hike", "mountains", "nature"]
  },
  {
    id: "19",
    user: mockUsers[18],
    location: mockLocations[18],
    content: "Just got a new haircut at this salon. Feeling fresh and stylish!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1588731092669-4ff8c4343a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2023-12-31T13:40:00Z",
    likes: 26,
    comments: 5,
    shares: 1,
    saved: false,
    vibeTags: ["haircut", "salon", "style"]
  },
  {
    id: "20",
    user: mockUsers[19],
    location: mockLocations[19],
    content: "Enjoying a movie night at home. Perfect way to end the year!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1485098500506-5d79669805f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2023-12-30T20:20:00Z",
    likes: 32,
    comments: 7,
    shares: 3,
    saved: false,
    vibeTags: ["movie", "home", "relax"]
  },
  {
    id: "21",
    user: mockUsers[0],
    location: mockLocations[20],
    content: "Hilarious comedy show tonight! Laughed so hard my stomach hurts.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1504297050568-9107e4f49e05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-16T22:00:00Z",
    likes: 68,
    comments: 14,
    shares: 6,
    saved: false,
    vibeTags: ["comedy", "show", "nightlife"]
  },
  {
    id: "22",
    user: mockUsers[1],
    location: mockLocations[21],
    content: "Just got a new piercing at this studio. Super professional and clean!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1623440579747-442889f44496?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-17T15:45:00Z",
    likes: 39,
    comments: 9,
    shares: 3,
    saved: false,
    vibeTags: ["piercing", "studio", "bodyart"]
  },
  {
    id: "23",
    user: mockUsers[2],
    location: mockLocations[22],
    content: "Enjoying a wine tasting event. So many delicious wines!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1547592180-85f19999864f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-18T19:30:00Z",
    likes: 45,
    comments: 10,
    shares: 4,
    saved: false,
    vibeTags: ["wine", "tasting", "event"]
  },
  {
    id: "24",
    user: mockUsers[3],
    location: mockLocations[23],
    content: "Just got a new bike at this shop. Time to explore the city!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1543699535-ca9994c897a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-19T14:10:00Z",
    likes: 33,
    comments: 7,
    shares: 2,
    saved: false,
    vibeTags: ["bike", "shop", "city"]
  },
  {
    id: "25",
    user: mockUsers[4],
    location: mockLocations[24],
    content: "Magical light show tonight! The colors are mesmerizing.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1519183071296-a8c39245c124?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-20T21:40:00Z",
    likes: 52,
    comments: 12,
    shares: 5,
    saved: false,
    vibeTags: ["lightshow", "night", "magic"]
  },
  {
    id: "26",
    user: mockUsers[5],
    location: mockLocations[25],
    content: "Visited the Eiffel Tower today. What a view of Paris!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1502605235544-464d8925a3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-21T16:25:00Z",
    likes: 47,
    comments: 11,
    shares: 4,
    saved: false,
    vibeTags: ["eiffeltower", "paris", "travel"]
  },
  {
    id: "27",
    user: mockUsers[6],
    location: mockLocations[26],
    content: "Amazing music festival! So many great bands.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1493225452140-c25d279b9746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-22T22:10:00Z",
    likes: 58,
    comments: 13,
    shares: 6,
    saved: false,
    vibeTags: ["music", "festival", "livemusic"]
  },
  {
    id: "28",
    user: mockUsers[7],
    location: mockLocations[27],
    content: "Visited the new exhibit at the museum. So many interesting artifacts.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1559059694-15c49c999383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ],
    timestamp: "2024-01-23T15:55:00Z",
    likes: 35,
    comments: 8,
    shares: 2,
    saved: false,
    vibeTags: ["museum", "exhibit", "culture"]
  }
];
