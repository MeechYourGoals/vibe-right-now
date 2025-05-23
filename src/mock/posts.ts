import { Post, Media } from "@/types";
import { regularUsers, celebrityUsers } from "./users";
import { mockLocations } from "./locations";
import { getRecentTime, getExpiryTime } from "./time-utils";

const allUsers = [...regularUsers, ...celebrityUsers];

export const mockPosts: Post[] = [
  {
    id: "1",
    author: allUsers[0],
    location: mockLocations[0],
    content: "The sunset view here is incredible tonight! DJ is playing the best vibes 🎵",
    media: [
      {
        id: "1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop",
      },
      {
        id: "2",
        type: "image",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(1),
    likes: 42,
    comments: [],
    vibedHere: true,
    isPinned: true,
    isVenueOwned: false
  },
  {
    id: "2",
    author: allUsers[1],
    location: mockLocations[1],
    content: "They just put out fresh pastries! Get here quick, there's no line right now.",
    media: [
      {
        id: "3",
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(2),
    likes: 18,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "3",
    author: allUsers[2],
    location: mockLocations[2],
    content: "The headline act is about to start! Crowd is energetic but not too packed yet.",
    media: [
      {
        id: "4",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "5",
        type: "image",
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.5),
    likes: 104,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "4",
    author: allUsers[3],
    location: mockLocations[3],
    content: "New exhibit just opened! Only a small crowd so far, perfect time to check it out.",
    media: [
      {
        id: "6",
        type: "image",
        url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(3),
    likes: 29,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "5",
    author: allUsers[4],
    location: mockLocations[4],
    content: "Line is around the block tonight! But the view is worth the wait.",
    media: [
      {
        id: "7",
        type: "image",
        url: "https://images.unsplash.com/photo-1519214605650-76a613ee3245?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(1.5),
    likes: 56,
    comments: [],
    vibedHere: true,
    isPinned: true,
    isVenueOwned: false
  },
  {
    id: "6",
    author: allUsers[5],
    location: mockLocations[5],
    content: "Knicks vs Lakers game is 🔥! Court side seats are insane, can see all the action up close.",
    media: [
      {
        id: "8",
        type: "image",
        url: "https://images.unsplash.com/photo-1504450758481-7efbbe195018?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 87,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "7",
    author: allUsers[6],
    location: mockLocations[6],
    content: "Pool party is going crazy right now! DJs just switched and the energy is insane 🎉",
    media: [
      {
        id: "9",
        type: "image",
        url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.2),
    likes: 112,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "8",
    author: allUsers[7],
    location: mockLocations[7],
    content: "The view from Christ the Redeemer is breathtaking! Clear skies today, you can see all of Rio!",
    media: [
      {
        id: "10",
        type: "image",
        url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(1.1),
    likes: 203,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "9",
    author: allUsers[8],
    location: mockLocations[8],
    content: "Top of the mountain at Aspen Highlands! Fresh powder and no lines for the lift right now.",
    media: [
      {
        id: "11",
        type: "image",
        url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.4),
    likes: 91,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "10",
    author: allUsers[9],
    location: mockLocations[9],
    content: "Super Bowl from a field suite! The energy is electric and halftime show setup looks epic.",
    media: [
      {
        id: "12",
        type: "image",
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.1),
    likes: 256,
    comments: [],
    vibedHere: true,
    isPinned: true,
    isVenueOwned: false
  },
  {
    id: "11",
    author: allUsers[10],
    location: mockLocations[10],
    content: "Dinner at Mama's Fish House with the sunset view is perfection. Got the last oceanfront table!",
    media: [
      {
        id: "13",
        type: "image",
        url: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.6),
    likes: 78,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "12",
    author: allUsers[11],
    location: mockLocations[11],
    content: "Outdoor workout at Barry's today! Special beach class is killing it - spots still open for the 10am.",
    media: [
      {
        id: "14",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 64,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "13",
    author: allUsers[12],
    location: mockLocations[12],
    content: "Houston Rodeo is wild tonight! Bull riding competition just started and the crowd is going crazy!",
    media: [
      {
        id: "15",
        type: "image",
        url: "https://images.unsplash.com/photo-1560147307-7fef1854cd4a?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.2),
    likes: 118,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "14",
    author: allUsers[13],
    location: mockLocations[1],
    content: "New seasonal latte just dropped and it's incredible! Lavender honey flavor is perfect.",
    media: [
      {
        id: "16",
        type: "image",
        url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.4),
    likes: 42,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "15",
    author: allUsers[14],
    location: mockLocations[1],
    content: "The back corner by the bookshelf is empty and it's the best spot to work from! Great wifi today.",
    media: [
      {
        id: "17",
        type: "image",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.7),
    likes: 35,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "16",
    author: allUsers[0],
    location: mockLocations[7],
    content: "Made it to the top! The climb was worth it - barely any crowds this early in the morning.",
    media: [
      {
        id: "18",
        type: "image",
        url: "https://images.unsplash.com/photo-1572358337087-ab2addf09aa1?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.9),
    likes: 89,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "17",
    author: allUsers[1],
    location: mockLocations[21], // Bitcoin Conference location
    content: "Bitcoin Conference is packed today! Great keynotes happening on the main stage with minimal wait times for entry.",
    media: [
      {
        id: "19",
        type: "image",
        url: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.15),
    likes: 125,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "18",
    author: allUsers[2],
    location: mockLocations[22], // InvestFest location
    content: "InvestFest workshops are incredible! The west wing has shorter lines for the top speakers right now.",
    media: [
      {
        id: "20",
        type: "image",
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.2),
    likes: 72,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "19",
    author: allUsers[3],
    location: mockLocations[9], // Keep one Allegiant Stadium post
    content: "VIP entrance on south side has no wait right now! Regular entrances are packed.",
    media: [
      {
        id: "21",
        type: "image",
        url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 54,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "20",
    author: allUsers[4],
    location: {
      id: "29",
      name: "CES Las Vegas",
      address: "3150 Paradise Rd",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      zip: "89101", // Added zip code
      lat: 36.1318,
      lng: -115.1516,
      type: "event",
      verified: true,
    },
    content: "Just spotted the newest tech innovations at CES! North hall is less crowded if you want to see the automotive displays.",
    media: [
      {
        id: "22",
        type: "image",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.25),
    likes: 198,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "21",
    author: allUsers[15],
    location: mockLocations[13],
    content: "Thanks for the free tix VRN! Can't believe I'm getting to see a comedy legend right now. The opening act just finished and everyone is crying laughing already!",
    media: [
      {
        id: "23",
        type: "image",
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.1),
    likes: 78,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "22",
    author: allUsers[16],
    location: mockLocations[14],
    content: "Day 2 on the Disney Wonder and it's magical! Character breakfast just ended and the kids are loving it. Almost no wait for the water slide right now!",
    media: [
      {
        id: "24",
        type: "image",
        url: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 91,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "23",
    author: allUsers[17],
    location: mockLocations[15],
    content: "This new bakery in Des Moines is incredible! They just took out fresh croissants and they smell amazing. Get here before they sell out!",
    media: [
      {
        id: "25",
        type: "image",
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.4),
    likes: 54,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "24",
    author: allUsers[18],
    location: mockLocations[16],
    content: "Sunset cocktails at the Waldorf Rooftop Bar are unmatched! Just got seated with no wait - seems like a hidden gem tonight. View of downtown LA is spectacular!",
    media: [
      {
        id: "26",
        type: "image",
        url: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.2),
    likes: 112,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "25",
    author: allUsers[19],
    location: mockLocations[17],
    content: "Sydney Opera House is absolutely stunning tonight! Special light show happening right now with barely any crowds.",
    media: [
      {
        id: "27",
        type: "image",
        url: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.5),
    likes: 143,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "26",
    author: allUsers[20],
    location: mockLocations[18],
    content: "Perfect evening at the Eiffel Tower! The lights just turned on and it's magical. Pro tip: south side entrance has almost no line right now.",
    media: [
      {
        id: "28",
        type: "image",
        url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 278,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "27",
    author: allUsers[22],
    location: mockLocations[19],
    content: "Coachella day 2 is UNREAL! Just caught the surprise guest performance - mind blown! Main stage area still has room if you hurry.",
    media: [
      {
        id: "29",
        type: "image",
        url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.1),
    likes: 345,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "28",
    author: allUsers[21],
    location: mockLocations[20],
    content: "Gucci pop-up on Rodeo Drive is a must-see! They're giving out free champagne and the limited collection just dropped. Still some pieces left!",
    media: [
      {
        id: "30",
        type: "image",
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.2),
    likes: 167,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "29",
    author: allUsers[8],
    location: mockLocations[24],  // The Comedy Cellar (id: "25")
    content: "Comedy Cellar is offering FREE TICKETS tonight! Just mention 'VRN' at the door. The 9pm show has plenty of seats but they're going fast!",
    media: [
      {
        id: "31",
        type: "image",
        url: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.05),
    likes: 88,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "30",
    author: allUsers[12],
    location: mockLocations[25],  // Skyline Nightclub (id: "26")
    content: "Skyline is offering FREE COVER until midnight! Just show this post at the door. DJ started at 10 and the dance floor is filling up!",
    media: [
      {
        id: "32",
        type: "image",
        url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.1),
    likes: 132,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "31",
    author: allUsers[15],
    location: mockLocations[26],  // Sunrise Bakery (id: "27")
    content: "New bakery alert! Sunrise is offering a FREE pastry with any large coffee purchase until noon. The chocolate croissants are incredible and still warm from the oven!",
    media: [
      {
        id: "33",
        type: "image",
        url: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.3),
    likes: 67,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
  {
    id: "32",
    author: allUsers[19],
    location: mockLocations[27],  // Coachella VIP Experience (id: "28")
    content: "American Express Tent access included with VIP ticket purchase! Just picked up my credentials and the lounge has free drinks, charging stations and AC. Perfect escape from the heat!",
    media: [
      {
        id: "34",
        type: "image",
        url: "https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.15),
    likes: 215,
    comments: [],
    vibedHere: false,
    isPinned: false,
    isVenueOwned: false
  },
];
