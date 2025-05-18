import { Post, Media } from "@/types";
import { regularUsers, celebrityUsers } from "./users";
import { mockLocations } from "./locations";
import { getRecentTime, getExpiryTime } from "./time-utils";

const allUsers = [...regularUsers, ...celebrityUsers];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: allUsers[0],
    location: mockLocations[0],
    content: "The sunset view here is incredible tonight! DJ is playing the best vibes 🎵",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(1),
    expiresAt: getExpiryTime(getRecentTime(1), true), // Pinned post (90 days)
    likes: 42,
    comments: 7,
    isPinned: true,
    saved: false,
    vibeTags: ["Lively", "Upscale", "NightOwl"]
  },
  {
    id: "2",
    user: allUsers[1],
    location: mockLocations[1],
    content: "They just put out fresh pastries! Get here quick, there's no line right now.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(2),
    expiresAt: getExpiryTime(getRecentTime(2)),
    likes: 18,
    comments: 3,
    saved: false
  },
  {
    id: "3",
    user: allUsers[2],
    location: mockLocations[2],
    content: "The headline act is about to start! Crowd is energetic but not too packed yet.",
    media: [
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.5),
    expiresAt: getExpiryTime(getRecentTime(0.5)),
    likes: 104,
    comments: 22,
    saved: false
  },
  {
    id: "4",
    user: allUsers[3],
    location: mockLocations[3],
    content: "New exhibit just opened! Only a small crowd so far, perfect time to check it out.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(3),
    expiresAt: getExpiryTime(getRecentTime(3)),
    likes: 29,
    comments: 5,
    saved: false
  },
  {
    id: "5",
    user: allUsers[4],
    location: mockLocations[4],
    content: "Line is around the block tonight! But the view is worth the wait.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(1.5),
    expiresAt: getExpiryTime(getRecentTime(1.5)),
    likes: 56,
    comments: 11,
    isPinned: true,
    saved: false,
    vibeTags: ["Lively", "Upscale", "NightOwl"]
  },
  {
    id: "6",
    user: allUsers[5],
    location: mockLocations[5],
    content: "Knicks vs Lakers game is 🔥! Court side seats are insane, can see all the action up close.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/3582640/pexels-photo-3582640.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 87,
    comments: 14,
    saved: false
  },
  {
    id: "7",
    user: allUsers[6],
    location: mockLocations[6],
    content: "Pool party is going crazy right now! DJs just switched and the energy is insane 🎉",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 112,
    comments: 19,
    saved: false
  },
  {
    id: "8",
    user: allUsers[7],
    location: mockLocations[7],
    content: "The view from Christ the Redeemer is breathtaking! Clear skies today, you can see all of Rio!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(1.1),
    expiresAt: getExpiryTime(getRecentTime(1.1)),
    likes: 203,
    comments: 31,
    saved: false
  },
  {
    id: "9",
    user: allUsers[8],
    location: mockLocations[8],
    content: "Top of the mountain at Aspen Highlands! Fresh powder and no lines for the lift right now.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.4),
    expiresAt: getExpiryTime(getRecentTime(0.4)),
    likes: 91,
    comments: 12,
    saved: false
  },
  {
    id: "10",
    user: allUsers[9],
    location: mockLocations[9],
    content: "Super Bowl from a field suite! The energy is electric and halftime show setup looks epic.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/2531904/pexels-photo-2531904.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.1),
    expiresAt: getExpiryTime(getRecentTime(0.1)),
    likes: 256,
    comments: 42,
    isPinned: true,
    saved: false,
    vibeTags: ["Lively", "Upscale", "NightOwl"]
  },
  {
    id: "11",
    user: allUsers[10],
    location: mockLocations[10],
    content: "Dinner at Mama's Fish House with the sunset view is perfection. Got the last oceanfront table!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/6287210/pexels-photo-6287210.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.6),
    expiresAt: getExpiryTime(getRecentTime(0.6)),
    likes: 78,
    comments: 9,
    saved: false
  },
  {
    id: "12",
    user: allUsers[11],
    location: mockLocations[11],
    content: "Outdoor workout at Barry's today! Special beach class is killing it - spots still open for the 10am.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 64,
    comments: 8,
    saved: false
  },
  {
    id: "13",
    user: allUsers[12],
    location: mockLocations[12],
    content: "Houston Rodeo is wild tonight! Bull riding competition just started and the crowd is going crazy!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/33825/cowboy-the-horse-horse-jumps.jpg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 118,
    comments: 21,
    saved: false
  },
  {
    id: "14",
    user: allUsers[13],
    location: mockLocations[1],
    content: "New seasonal latte just dropped and it's incredible! Lavender honey flavor is perfect.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.4),
    expiresAt: getExpiryTime(getRecentTime(0.4)),
    likes: 42,
    comments: 7,
    saved: false
  },
  {
    id: "15",
    user: allUsers[14],
    location: mockLocations[1],
    content: "The back corner by the bookshelf is empty and it's the best spot to work from! Great wifi today.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.7),
    expiresAt: getExpiryTime(getRecentTime(0.7)),
    likes: 35,
    comments: 5,
    saved: false
  },
  {
    id: "16",
    user: allUsers[0],
    location: mockLocations[7],
    content: "Made it to the top! The climb was worth it - barely any crowds this early in the morning.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/2754200/pexels-photo-2754200.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.9),
    expiresAt: getExpiryTime(getRecentTime(0.9)),
    likes: 89,
    comments: 12,
    saved: false
  },
  {
    id: "17",
    user: allUsers[1],
    location: mockLocations[21], // Bitcoin Conference location
    content: "Bitcoin Conference is packed today! Great keynotes happening on the main stage with minimal wait times for entry.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.15),
    expiresAt: getExpiryTime(getRecentTime(0.15)),
    likes: 125,
    comments: 18,
    saved: false
  },
  {
    id: "18",
    user: allUsers[2],
    location: mockLocations[22], // InvestFest location
    content: "InvestFest workshops are incredible! The west wing has shorter lines for the top speakers right now.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 72,
    comments: 10,
    saved: false
  },
  {
    id: "19",
    user: allUsers[3],
    location: mockLocations[9], // Keep one Allegiant Stadium post
    content: "VIP entrance on south side has no wait right now! Regular entrances are packed.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 54,
    comments: 8,
    saved: false
  },
  {
    id: "20",
    user: allUsers[4],
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
        type: "image",
        url: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.25),
    expiresAt: getExpiryTime(getRecentTime(0.25)),
    likes: 198,
    comments: 34,
    saved: false
  },
  {
    id: "21",
    user: allUsers[15],
    location: mockLocations[13],
    content: "Thanks for the free tix VRN! Can't believe I'm getting to see a comedy legend right now. The opening act just finished and everyone is crying laughing already!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.1),
    expiresAt: getExpiryTime(getRecentTime(0.1)),
    likes: 78,
    comments: 12,
    saved: false
  },
  {
    id: "22",
    user: allUsers[16],
    location: mockLocations[14],
    content: "Day 2 on the Disney Wonder and it's magical! Character breakfast just ended and the kids are loving it. Almost no wait for the water slide right now!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/144640/pexels-photo-144640.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 91,
    comments: 15,
    saved: false
  },
  {
    id: "23",
    user: allUsers[17],
    location: mockLocations[15],
    content: "This new bakery in Des Moines is incredible! They just took out fresh croissants and they smell amazing. Get here before they sell out!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.4),
    expiresAt: getExpiryTime(getRecentTime(0.4)),
    likes: 54,
    comments: 7,
    saved: false
  },
  {
    id: "24",
    user: allUsers[18],
    location: mockLocations[16],
    content: "Sunset cocktails at the Waldorf Rooftop Bar are unmatched! Just got seated with no wait - seems like a hidden gem tonight. View of downtown LA is spectacular!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 112,
    comments: 15,
    saved: false
  },
  {
    id: "25",
    user: allUsers[19],
    location: mockLocations[17],
    content: "Sydney Opera House is absolutely stunning tonight! Special light show happening right now with barely any crowds.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.5),
    expiresAt: getExpiryTime(getRecentTime(0.5)),
    likes: 143,
    comments: 23,
    saved: false
  },
  {
    id: "26",
    user: allUsers[20],
    location: mockLocations[18],
    content: "Perfect evening at the Eiffel Tower! The lights just turned on and it's magical. Pro tip: south side entrance has almost no line right now.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 278,
    comments: 42,
    saved: false
  },
  {
    id: "27",
    user: allUsers[22],
    location: mockLocations[19],
    content: "Coachella day 2 is UNREAL! Just caught the surprise guest performance - mind blown! Main stage area still has room if you hurry.",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.1),
    expiresAt: getExpiryTime(getRecentTime(0.1)),
    likes: 345,
    comments: 67,
    saved: false
  },
  {
    id: "28",
    user: allUsers[21],
    location: mockLocations[20],
    content: "Gucci pop-up on Rodeo Drive is a must-see! They're giving out free champagne and the limited collection just dropped. Still some pieces left!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 167,
    comments: 29,
    saved: false
  },
  {
    id: "29",
    user: allUsers[8],
    location: mockLocations[24],  // The Comedy Cellar (id: "25")
    content: "Comedy Cellar is offering FREE TICKETS tonight! Just mention 'VRN' at the door. The 9pm show has plenty of seats but they're going fast!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.05),
    expiresAt: getExpiryTime(getRecentTime(0.05)),
    likes: 88,
    comments: 15,
    saved: false
  },
  {
    id: "30",
    user: allUsers[12],
    location: mockLocations[25],  // Skyline Nightclub (id: "26")
    content: "Skyline is offering FREE COVER until midnight! Just show this post at the door. DJ started at 10 and the dance floor is filling up!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.1),
    expiresAt: getExpiryTime(getRecentTime(0.1)),
    likes: 132,
    comments: 24,
    saved: false
  },
  {
    id: "31",
    user: allUsers[15],
    location: mockLocations[26],  // Sunrise Bakery (id: "27")
    content: "New bakery alert! Sunrise is offering a FREE pastry with any large coffee purchase until noon. The chocolate croissants are incredible and still warm from the oven!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 67,
    comments: 9,
    saved: false
  },
  {
    id: "32",
    user: allUsers[19],
    location: mockLocations[27],  // Coachella VIP Experience (id: "28")
    content: "American Express Tent access included with VIP ticket purchase! Just picked up my credentials and the lounge has free drinks, charging stations and AC. Perfect escape from the heat!",
    media: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/1540341/pexels-photo-1540341.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    timestamp: getRecentTime(0.15),
    expiresAt: getExpiryTime(getRecentTime(0.15)),
    likes: 215,
    comments: 39,
    saved: false
  },
];
