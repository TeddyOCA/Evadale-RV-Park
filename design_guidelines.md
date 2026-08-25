# Evadale RV Park - Design Guidelines

## Design Approach

**Reference-Based**: Drawing from Airbnb's reservation excellence, Hipcamp's outdoor aesthetic, and REI's warm outdoor storytelling. The design emphasizes rustic charm, natural imagery, and intuitive booking flows while maintaining the park's authentic character.

**Core Principle**: Create an inviting digital campfire - warm, welcoming, and naturally guiding visitors toward their next adventure.

---

## Typography System

**Primary Font**: Montserrat (Google Fonts) - Clean, friendly, modern
- Headings: 700 weight for impact
- Subheadings: 600 weight for structure
- Body: 400 weight for readability

**Secondary Font**: Merriweather (Google Fonts) - Warm, readable serif for storytelling
- Featured quotes/testimonials: 400 weight
- Descriptive copy: 300 weight

**Scale**:
- Hero Headlines: text-5xl to text-7xl
- Section Headers: text-3xl to text-4xl
- Card Titles: text-xl to text-2xl
- Body Copy: text-base to text-lg
- Captions: text-sm

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Element margins: mb-4, mb-6, mb-8

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl px-6
- Content sections: max-w-6xl mx-auto
- Forms/narrow content: max-w-2xl mx-auto

**Grid Patterns**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Site listings: grid-cols-1 lg:grid-cols-2 gap-8
- Amenities: grid-cols-2 md:grid-cols-4 gap-4

---

## Page Structure & Components

### Homepage Layout

**Hero Section (90vh)**:
- Large hero image showing RV park at golden hour with trees, campers, sunset
- Centered content overlay with blurred background container
- Headline: "Your Home Under the Pines" + subheading about peaceful camping
- Search widget: Date range picker + Guest count + "Check Availability" button (all within blurred glass container)
- Trust indicator below: "★★★★★ Rated 4.9 by 200+ Happy Campers"

**Featured Sites Grid**:
- 2-column layout showing 4 premium site cards
- Each card: Large image, site type badge, nightly rate, key features (3-4 icons), "View Details" button
- Staggered card heights for visual interest

**Amenities Showcase**:
- 4-column grid (2 on mobile) with icon + title + short description
- Include: Full Hookups, WiFi, Laundry, Bathhouse, Pool, Fire Pits, Pet Friendly, Playground
- Icons use Heroicons outline style

**Experience Gallery**:
- Masonry grid layout (Pinterest-style) with 8-12 guest photos
- Mix of RV setups, campfires, families, pets, sunsets
- Overlay "Share Your Experience" CTA on hover

**Testimonials Section**:
- 3-column cards with guest photo, quote, name, visit date
- Rotating display showing different reviews

**Location & Contact Split**:
- Two-column: Left = embedded map, Right = contact info, hours, directions button
- Include quick stats: "30 Sites • Pet Friendly • Year-Round"

**Newsletter Footer Component**:
- "Join the Evadale Family" heading
- Email input + subscribe button
- Include: Full navigation links, social media, contact details, operating hours

### Reservation/Booking Page

**Availability Calendar**:
- Large month view with available/booked indicators
- Filter sidebar: Site type, hookup needs, party size, pet-friendly
- Real-time availability updates

**Site Cards Listing**:
- Detailed cards with image carousel, full amenities list, site map location
- Pricing breakdown, instant book option
- 2-column grid with sticky filter sidebar

**Booking Summary Panel** (sticky on scroll):
- Selected dates, site type, guest count
- Price breakdown with fees
- "Reserve Now" CTA

### Individual Site Detail Page

**Image Gallery Hero**:
- Full-width image carousel (4-6 photos per site)
- Thumbnail navigation below

**Two-Column Layout**:
- Left: Site description, amenities, dimensions, nearby attractions
- Right: Sticky booking card with calendar, pricing, instant reserve

**Similar Sites Section**:
- 3-card horizontal scroll showing alternative options

### About/Park Info Page

**Storytelling Hero**:
- Large image of park owners/family with personal welcome message
- Overlaid quote about hospitality

**Timeline/History Section**:
- Visual timeline showing park evolution
- Photos paired with milestone descriptions

**Meet the Team**:
- Photo grid with staff introductions

**Park Map Section**:
- Interactive/downloadable park layout
- Site numbering, amenity locations, walking paths

---

## Component Library

**Navigation Bar**:
- Sticky header with logo left, menu center (Home, Sites, Amenities, About, Contact), "Book Now" button right
- Mobile: Hamburger menu with slide-out panel

**Buttons**:
- Primary: Rounded-lg, px-8 py-4, semibold text
- Secondary: Outlined style with border
- Glass/Blur treatment on image overlays

**Cards**:
- Rounded-xl corners
- Generous padding (p-6)
- Subtle shadow (shadow-lg)
- Hover: Slight lift with shadow-xl transition

**Form Inputs**:
- Rounded borders, px-4 py-3
- Date pickers with calendar icon
- Dropdown selectors for guest count, site type
- Clear labels above inputs

**Icons**: Heroicons (outline for amenities, solid for navigation)

---

## Images Section

**Required Photography**:
1. **Hero Image**: Panoramic golden hour shot of RV park with multiple campers, pine trees silhouetted against sunset sky - warm, inviting, professional quality
2. **Site Photos**: Individual RV sites showing hookups, parking pads, picnic tables, fire rings (4-6 per site type)
3. **Amenity Photos**: Pool area, bathhouse exterior, laundry facilities, playground
4. **Lifestyle Images**: Families around campfires, kids playing, pets, RV setups, outdoor activities
5. **Gallery Content**: User-generated camping moments, sunsets, wildlife, happy campers
6. **About Page**: Owners/staff portraits, historical park photos, aerial park view
7. **Background Textures**: Subtle wood grain or canvas patterns for section dividers

**Image Treatment**: All images should feel warm, professionally shot but approachable, emphasizing natural lighting and authentic camping experiences.

---

## Accessibility & Interactions

- Focus states with visible outlines on all interactive elements
- Sufficient contrast ratios maintained throughout
- Form labels clearly associated with inputs
- Skip navigation link for keyboard users
- Calendar navigation fully keyboard accessible
- Loading states for booking interactions
- Success/error messaging with icons + text
- Smooth scroll-to-section navigation