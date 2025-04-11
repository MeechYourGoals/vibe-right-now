import { Post, Media, Comment } from '@/types';
import { users } from './users';
import { venues } from './venues';
import { comments } from './comments';

// Generate unique IDs for media
const generateMediaId = () => `media_${Math.random().toString(36).substring(2, 9)}`;

// Fixed posts data to have proper types for Media and Comments
export const posts: Post[] = [
  {
    id: "p1",
    user: users[0],
    location: venues[0],
    text: "Just found the coolest new coffee spot in town! The latte art is incredible and the pastries are to die for. Definitely my new morning go-to.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1500353391678-d7b57979d6d2",
      }
    ],
    timestamp: "2023-05-18T12:30:00Z",
    likes: 342,
    comments: comments.filter(c => c.postId === "p1"),
    saved: false
  },
  {
    id: "p2",
    user: users[1],
    location: venues[1],
    text: "Amazing rooftop bar with stunning city views. Perfect for a night out with friends!",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1532543959559-455159a78992",
      }
    ],
    timestamp: "2023-05-17T18:45:00Z",
    likes: 287,
    comments: comments.filter(c => c.postId === "p2"),
    saved: true
  },
  {
    id: "p3",
    user: users[2],
    location: venues[2],
    text: "This museum is a hidden gem! So much history and art to explore. A must-visit for culture lovers.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1543968535-098a5a813418",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1559163438-e68094461342",
      }
    ],
    timestamp: "2023-05-16T21:00:00Z",
    likes: 412,
    comments: comments.filter(c => c.postId === "p3"),
    saved: false
  },
  {
    id: "p4",
    user: users[3],
    location: venues[3],
    text: "Great workout at this gym! The trainers are super helpful and the equipment is top-notch.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-67f8788a54ca",
      }
    ],
    timestamp: "2023-05-15T09:20:00Z",
    likes: 198,
    comments: comments.filter(c => c.postId === "p4"),
    saved: false
  },
  {
    id: "p5",
    user: users[4],
    location: venues[4],
    text: "This park is perfect for a relaxing afternoon. Beautiful scenery and plenty of space to unwind.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1496038973133-104998ca62d9",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1504703369786-3ba62bc90799",
      }
    ],
    timestamp: "2023-05-14T16:55:00Z",
    likes: 256,
    comments: comments.filter(c => c.postId === "p5"),
    saved: true
  },
  {
    id: "p6",
    user: users[0],
    location: venues[5],
    text: "Just had the most amazing sushi at this restaurant! The fish was so fresh and the presentation was beautiful.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1577078022449-679f9694aa7f",
      }
    ],
    timestamp: "2023-05-13T20:10:00Z",
    likes: 311,
    comments: comments.filter(c => c.postId === "p6"),
    saved: false
  },
  {
    id: "p7",
    user: users[1],
    location: venues[6],
    text: "This shopping mall has everything you could ever need! So many great stores and restaurants.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1519415943482-4518163963a8",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1506126613408-ca249f79a989",
      }
    ],
    timestamp: "2023-05-12T14:05:00Z",
    likes: 245,
    comments: comments.filter(c => c.postId === "p7"),
    saved: false
  },
  {
    id: "p8",
    user: users[2],
    location: venues[7],
    text: "Had a blast at this concert! The music was amazing and the crowd was so energetic.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1459749411175-04bf52392358",
      }
    ],
    timestamp: "2023-05-11T22:30:00Z",
    likes: 389,
    comments: comments.filter(c => c.postId === "p8"),
    saved: true
  },
  {
    id: "p9",
    user: users[3],
    location: venues[8],
    text: "This hotel is so luxurious! The rooms are beautiful and the service is impeccable.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1566073771259-6a6900329e18",
      },
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1596436889103-3d3349451415",
      }
    ],
    timestamp: "2023-05-10T11:15:00Z",
    likes: 299,
    comments: comments.filter(c => c.postId === "p9"),
    saved: false
  },
  {
    id: "p10",
    user: users[4],
    location: venues[9],
    text: "This beach is the perfect place to relax and soak up the sun. The sand is so soft and the water is crystal clear.",
    media: [
      {
        id: generateMediaId(),
        type: "image",
        url: "https://images.unsplash.com/photo-1519046904884-53e3c7069eba",
      }
    ],
    timestamp: "2023-05-09T15:40:00Z",
    likes: 367,
    comments: comments.filter(c => c.postId === "p10"),
    saved: false
  }
];

export default posts;
