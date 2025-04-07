
import { Location } from "@/types";

export const getVenueContent = (venue: Location, isFirstPost: boolean) => {
  let content = "";
  let mediaUrl = "";
  
  if (venue.type === "restaurant") {
    if (isFirstPost) {
      content = `Today's special: ${venue.name.includes("Bakery") ? "Fresh baked sourdough and pastries!" : "Chef's tasting menu featuring seasonal ingredients from local farms!"}`;
      mediaUrl = "https://images.unsplash.com/photo-1621871349328-f970545757e4?q=80&w=1000&auto=format&fit=crop";
    } else {
      content = `Join us for Happy Hour! Half off appetizers from 4-6pm today.`;
      mediaUrl = "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1000&auto=format&fit=crop";
    }
  } else if (venue.type === "bar") {
    if (isFirstPost) {
      content = `Tonight: Live DJ set from 9PM! ${venue.name.includes("Rooftop") ? "Enjoy amazing views with your cocktails." : "No cover charge before 10PM."}`;
      mediaUrl = "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1000&auto=format&fit=crop";
    } else {
      content = `New signature cocktail menu launching today! Come try our seasonal specials.`;
      mediaUrl = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop";
    }
  } else if (venue.type === "event") {
    if (isFirstPost) {
      content = `Tickets for ${venue.name} are going fast! Use code VIBECITY for 15% off your purchase.`;
      mediaUrl = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop";
    } else {
      content = `VIP packages still available! Includes exclusive merch and early entry.`;
      mediaUrl = "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000&auto=format&fit=crop";
    }
  } else if (venue.type === "sports") {
    if (isFirstPost) {
      if (venue.name.includes("Lakers")) {
        content = "Game day! Gates open 90 minutes before tipoff. Arrive early to watch warmups and get player autographs!";
        mediaUrl = "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop";
      } else if (venue.name.includes("Golf")) {
        content = "Perfect conditions today for the WM Phoenix Open! The 16th hole stadium is already filling up.";
        mediaUrl = "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop";
      } else {
        content = "Game day is here! Come early for special fan activities and giveaways at the main entrance.";
        mediaUrl = "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop";
      }
    } else {
      content = "Tickets are still available for today's game! Buy online to skip the box office lines.";
      mediaUrl = venue.name.includes("Soccer") || venue.name.includes("Galaxy") 
        ? "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop";
    }
  } else if (venue.type === "attraction") {
    if (isFirstPost) {
      content = `Beat the crowds! Current wait time is only 15 minutes for ${venue.name}.`;
      mediaUrl = "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop";
    } else {
      content = `Special photo opportunity available today at ${venue.name}! Tag us in your pics for a chance to be featured.`;
      mediaUrl = "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop";
    }
  } else {
    if (isFirstPost) {
      content = `Today at ${venue.name}: Special event for our members! Check in at the front desk for details.`;
      mediaUrl = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop";
    } else {
      content = `Don't miss our limited time offer! Valid only through this weekend.`;
      mediaUrl = "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop";
    }
  }
  
  return { content, mediaUrl };
};

export const getOfficialTicketUrl = (venueId: string) => {
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena",
    "31": "https://www.therams.com/tickets/",
    "32": "https://www.mlb.com/dodgers/tickets",
    "33": "https://www.lagalaxy.com/tickets/",
    "34": "https://www.vbusa.org/tickets",
    "35": "https://wmphoenixopen.com/tickets/",
  };
  
  return ticketUrls[venueId] || "";
};
