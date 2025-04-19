
export interface BusinessHours {
  [day: string]: string; // Changed from { open: string; close: string }
}

export interface BusinessInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  hours: BusinessHours;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  tags: string[];
}
