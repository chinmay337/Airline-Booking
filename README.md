# ÉMINENCE — The Art of Rising Above
## Luxury Airline & Private Jet Booking Single-Page Application (SPA)

> **College Course:** Frontend Engineering / Full Stack Web Development (FSJP)  
> **Assignment 1 — Task 2:** Single-Page Application (SPA) Using React.js  
> **Student Name:** Chinmay Vinayak Thukaru  
> **Institution:** Atharva College of Engineering, Mumbai  
> **Degree Program:** B.E. Information Technology  

---

## 🦅 1. Project Overview & Brand Concept
**ÉMINENCE** is a high-luxury aviation digital platform designed for high-net-worth individuals, royal protocols, business executives, and private aviation clients. 

Unlike conventional airline booking forms or generic student templates, **ÉMINENCE** combines three distinct tiers of luxury air travel into one cohesive experience:
1. **Commercial First Class Suites:** Sample products inspired by Emirates Game Changer, Singapore Airlines A380 Suites, Etihad The Residence, and Lufthansa Allegris.
2. **Private Aviation & Jet Charter:** On-demand private aircraft charters (Very Light Jets to Ultra-Long-Range flagships) and **Empty-Leg repositioning flight discovery** with instant preferential pricing.
3. **Private Aircraft Brokerage Marketplace:** Explore business aircraft for acquisition (Gulfstream G700, Bombardier Challenger 3500, Phenom 300E, Falcon 8X) with specifications, avionics, and an ownership enquiry dossier.

---

## ⚛️ 2. College Evaluation & React Concepts

This project satisfies all requirements for college evaluation:

### A. Functional Components & Component Hierarchy
- Clean separation of UI into reusable components:
  - `Navbar.jsx`: Glassmorphic navigation header with live currency switcher (USD, EUR, GBP, AED, INR), mobile drawer, and active view indicators.
  - `FlightSearch.jsx`: Concierge flight search with date validation, origin/dest swap, and cabin selection.
  - `FlightCard.jsx`: Interactive card displaying airline, flight number, duration, suite amenities, and dynamic pricing.
  - `FlightDetailsModal.jsx`: In-depth journey breakdown, photo gallery, Michelin tasting menu, and baggage allowances.
  - `BookingFlowModal.jsx`: Full 5-step commercial flight booking flow.
  - `BoardingPassModal.jsx`: Gold-trimmed, printable luxury boarding pass ticket (`window.print()`).
  - `CharterRequestModal.jsx`: Private jet request flow with instant indicative quote calculations.
  - `EmptyLegCard.jsx`: Discounted repositioning private jet flight deals.
  - `AircraftCard.jsx` & `AircraftDetailsModal.jsx`: Aircraft sales listings with avionics, range, speed, and airframe hours.
  - `OwnershipEnquiryModal.jsx`: Turnkey aircraft brokerage enquiry form.
  - `DestinationCard.jsx`: Destination cards with FBO terminal information and "Fly Here" direct action links.
  - `ConciergeModal.jsx` & `MembershipModal.jsx`: Bespoke service and membership application workflows.
  - `Toast.jsx`: Real-time luxury notification popups.
  - `Footer.jsx`: Brand narrative, demonstration disclaimers, and student accreditation.

### B. Props
- Props are cleanly passed across parent views and reusable child components:
  - Passing flight objects, aircraft specs, destinations, active currency, and event callbacks (`onSelectFlight`, `onViewDetails`, `onBookEmptyLeg`, `onEnquireOwnership`).

### C. State Management (`useState` & `useReducer`)
- **`useReducer` State Machine:**
  Implemented in `src/reducers/bookingReducer.js` and utilized in `BookingFlowModal.jsx` to govern the 5-step booking flow:
  - `Step 1: REVIEW` — Itinerary review & suite privileges
  - `Step 2: SEAT_MAP` — Interactive First Class suite selection (Suites 1A, 1E, 1K, 2A, 2F with window and center options)
  - `Step 3: PASSENGERS` — Passenger passport manifest with input validation
  - `Step 4: ADDONS` — Concierge perks (Rolls-Royce Chauffeur, Imperial Beluga Caviar, Vintage Dom Pérignon, Diplomatic Fast-Track)
  - `Step 5: CONFIRMATION` — Summary calculation, unique PNR generation (`EM-XXXX-XXX`), and local storage persistence.
- **`useState`:**
  - Active SPA view switching (`home`, `first-class`, `private-charter`, `marketplace`, `destinations`, `concierge`, `membership`, `my-voyages`).
  - Real-time currency selector (USD, EUR, GBP, AED, INR).
  - Search criteria and multi-category filters (airline, origin, destination, max price, aircraft category, condition).
  - Modals and toast alert lifecycles.

### D. Dynamic Rendering & Search/Filter
- Dynamic `.map()` renders flights, jet categories, aircraft listings, destinations, and suite configurations.
- Dynamic `.filter()` and `.sort()` enable real-time flight search and sorting by price, duration, and departure time.

### E. Persistence (`localStorage`)
- All demonstration bookings, charter requests, aircraft ownership enquiries, and concierge requests are persisted using `localStorage` (`src/utils/storage.js`).
- Data remains intact across page refreshes.

---

## 🛠️ 3. Technology Stack

- **Framework:** React 19 (Functional Components, Hooks)
- **Bundler:** Vite 8
- **Language:** JavaScript (ES6+ / JSX)
- **Icons:** Lucide React (`lucide-react`)
- **Typography:** Google Fonts (`Cinzel` & `Plus Jakarta Sans` & `Space Mono`)
- **Styling:** Pure CSS3 (Glassmorphism, Brushed Champagne Gold Gradients, Dark Luxury Theme, Print Styles)
- **Persistence:** Browser `localStorage` API

---

## 🚀 4. How to Run the Project

1. Open PowerShell or Command Prompt.
2. Navigate to the project directory:
   ```bash
   cd "c:\Users\Chinmay\Desktop\Atharva\Experiments\FSJP\Assignment 1\Private Jet Booking"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   ```
   http://localhost:5173
   ```
6. To run a production build:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧪 5. Testing & Verification Checklist

- [x] Application compiles cleanly with 0 errors via `npm run build`.
- [x] Every navigation link (`Discover`, `First Class`, `Private Aviation`, `Aircraft Collection`, `Destinations`, `Concierge`, `Membership`, `My Voyages`) works smoothly.
- [x] Flight search validates dates, passenger counts, and prevents identical departure/destination selections.
- [x] Completed full 5-step commercial flight booking workflow with suite selection and concierge add-ons.
- [x] Unique demonstration PNR generated and stored in `localStorage`.
- [x] Boarding pass modal displays complete ticket with functional print styling.
- [x] On-demand private jet charter request calculates indicative pricing and generates dispatch reference.
- [x] Aircraft marketplace displays comprehensive specs and processes ownership dossiers.
- [x] Currency switcher dynamically converts prices throughout the entire application.
