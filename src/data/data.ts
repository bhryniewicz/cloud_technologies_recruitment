import { Advertisment } from "../types/advertisment";

export const advertisments: Advertisment[] = [
  {
    id: crypto.randomUUID(),
    name: "Spring Sale Bonanza",
    description: "Get up to 50% off on all spring collections!",
    start_date: new Date("2025-03-01"),
    end_date: new Date("2025-03-31"),
  },
  {
    id: crypto.randomUUID(),
    name: "Tech Gadget Fest",
    description: "Exclusive discounts on the latest tech gadgets.",
    start_date: new Date("2025-04-05"),
    end_date: new Date("2025-04-20"),
  },
  {
    id: crypto.randomUUID(),
    name: "Summer Vacation Deals",
    description: "Book early and save big on summer travel packages.",
    start_date: new Date("2025-05-01"),
    end_date: new Date("2025-06-30"),
  },
  {
    id: crypto.randomUUID(),
    name: "Home Makeover Event",
    description: "Upgrade your home with exclusive furniture discounts.",
    start_date: new Date("2025-04-15"),
    end_date: new Date("2025-05-15"),
  },
  {
    id: crypto.randomUUID(),
    name: "Back to School Specials",
    description: "Special offers on school supplies and electronics.",
    start_date: new Date("2025-07-15"),
    end_date: new Date("2025-08-30"),
  },
  {
    id: crypto.randomUUID(),
    name: "Black Friday Early Access",
    description: "Sign up now to get exclusive early Black Friday deals.",
    start_date: new Date("2025-11-01"),
    end_date: new Date("2025-11-29"),
  },
  {
    id: crypto.randomUUID(),
    name: "Holiday Gift Guide",
    description:
      "Find the perfect gifts for your loved ones this holiday season.",
    start_date: new Date("2025-12-01"),
    end_date: new Date("2025-12-24"),
  },
  {
    id: crypto.randomUUID(),
    name: "New Year, New You",
    description: "Kickstart 2026 with amazing fitness and wellness deals!",
    start_date: new Date("2026-01-01"),
    end_date: new Date("2026-01-31"),
  },
];
