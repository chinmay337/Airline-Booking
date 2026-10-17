import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Views
import HomeView from './views/HomeView';
import FirstClassView from './views/FirstClassView';
import PrivateCharterView from './views/PrivateCharterView';
import MarketplaceView from './views/MarketplaceView';
import DestinationsView from './views/DestinationsView';
import ConciergeView from './views/ConciergeView';
import MembershipView from './views/MembershipView';
import MyVoyagesView from './views/MyVoyagesView';

// Modals
import FlightDetailsModal from './components/FlightDetailsModal';
import BookingFlowModal from './components/BookingFlowModal';
import BoardingPassModal from './components/BoardingPassModal';
import CharterRequestModal from './components/CharterRequestModal';
import AircraftDetailsModal from './components/AircraftDetailsModal';
import OwnershipEnquiryModal from './components/OwnershipEnquiryModal';
import ConciergeModal from './components/ConciergeModal';
import MembershipModal from './components/MembershipModal';

// Storage & Data
import {
  getBookings,
  cancelBooking,
  getCharterRequests,
  getAircraftEnquiries,
  getConciergeRequests
} from './utils/storage';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [toast, setToast] = useState(null);

  // Persisted Datasets in State
  const [bookings, setBookings] = useState([]);
  const [charterRequests, setCharterRequests] = useState([]);
  const [aircraftEnquiries, setAircraftEnquiries] = useState([]);
  const [conciergeRequests, setConciergeRequests] = useState([]);

  // Modal States
  const [flightForDetails, setFlightForDetails] = useState(null);
  const [flightForBooking, setFlightForBooking] = useState(null);
  const [bookingForPass, setBookingForPass] = useState(null);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [charterInitCategory, setCharterInitCategory] = useState('super-midsize');
  const [charterInitRoute, setCharterInitRoute] = useState(null);
  const [aircraftForSpecs, setAircraftForSpecs] = useState(null);
  const [aircraftForEnquiry, setAircraftForEnquiry] = useState(null);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [conciergeInitService, setConciergeInitService] = useState(null);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipInitTier, setMembershipInitTier] = useState('elite');

  // Search parameters forwarded between views
  const [flightSearchParams, setFlightSearchParams] = useState({});

  // Load persisted data on mount
  useEffect(() => {
    setBookings(getBookings());
    setCharterRequests(getCharterRequests());
    setAircraftEnquiries(getAircraftEnquiries());
    setConciergeRequests(getConciergeRequests());
  }, []);

  const showToast = (title, message) => {
    setToast({ title, message });
  };

  // Flight search handler from Home or FirstClass view
  const handleSearchFlights = (params) => {
    setFlightSearchParams(params);
    setActiveView('first-class');
    window.scrollTo({ top: 400, behavior: 'smooth' });
    showToast('Search Manifest Updated', `Searching flights from ${params.origin} to ${params.destination}`);
  };

  // Select flight to reserve
  const handleSelectFlightForBooking = (flight) => {
    setFlightForBooking(flight);
  };

  // Booking completion callback
  const handleBookingCompleted = (newBooking) => {
    setBookings(getBookings());
    showToast('Reservation Secured', `Booking reference ${newBooking.id} has been saved.`);
  };

  // Booking cancellation callback
  const handleCancelBooking = (bookingId) => {
    const updated = cancelBooking(bookingId);
    setBookings(updated);
    showToast('Reservation Cancelled', `Booking reference ${bookingId} has been removed.`);
  };

  // Charter Modal triggers
  const handleOpenCharter = (category = 'super-midsize', route = null) => {
    setCharterInitCategory(category);
    setCharterInitRoute(route);
    setIsCharterModalOpen(true);
  };

  // Empty Leg Booking trigger
  const handleBookEmptyLeg = (emptyLeg) => {
    handleOpenCharter('heavy', {
      origin: `${emptyLeg.origin.city} (${emptyLeg.origin.code})`,
      destination: `${emptyLeg.destination.city} (${emptyLeg.destination.code})`
    });
  };

  // Destination selection trigger: "Fly to [City]"
  const handleSelectDestination = (dest) => {
    setFlightSearchParams({
      origin: 'Dubai',
      destination: dest.city,
      departureDate: new Date().toISOString().split('T')[0],
      passengerCount: 1
    });
    setActiveView('first-class');
    window.scrollTo({ top: 350, behavior: 'smooth' });
    showToast('Destination Selected', `Route set to ${dest.city} (${dest.code}).`);
  };

  // Concierge Modal triggers
  const handleOpenConcierge = (service = null) => {
    setConciergeInitService(service);
    setIsConciergeModalOpen(true);
  };

  // Membership Modal triggers
  const handleOpenMembership = (tier = 'elite') => {
    setMembershipInitTier(tier);
    setIsMembershipModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currency={currency}
        setCurrency={(c) => {
          setCurrency(c);
          showToast('Currency Switched', `Display currency updated to ${c}`);
        }}
        bookingsCount={bookings.length}
        onOpenCharterModal={() => handleOpenCharter()}
      />

      {/* Main Views Container */}
      <main style={{ flex: 1 }}>
        {activeView === 'home' && (
          <HomeView
            setActiveView={setActiveView}
            currency={currency}
            onSearchFlights={handleSearchFlights}
            onOpenCharterModal={() => handleOpenCharter()}
            onBookEmptyLeg={handleBookEmptyLeg}
            onSelectDestination={handleSelectDestination}
            onViewAircraftSpecs={(ac) => setAircraftForSpecs(ac)}
            onEnquireOwnership={(ac) => setAircraftForEnquiry(ac)}
            onOpenMembershipModal={() => handleOpenMembership()}
          />
        )}

        {activeView === 'first-class' && (
          <FirstClassView
            currency={currency}
            onSelectFlight={handleSelectFlightForBooking}
            onViewFlightDetails={(f) => setFlightForDetails(f)}
            initialSearchParams={flightSearchParams}
          />
        )}

        {activeView === 'private-charter' && (
          <PrivateCharterView
            currency={currency}
            onOpenCharterModal={handleOpenCharter}
            onBookEmptyLeg={handleBookEmptyLeg}
          />
        )}

        {activeView === 'marketplace' && (
          <MarketplaceView
            currency={currency}
            onViewAircraftSpecs={(ac) => setAircraftForSpecs(ac)}
            onEnquireOwnership={(ac) => setAircraftForEnquiry(ac)}
          />
        )}

        {activeView === 'destinations' && (
          <DestinationsView
            onSelectDestination={handleSelectDestination}
          />
        )}

        {activeView === 'concierge' && (
          <ConciergeView
            onOpenConciergeModal={handleOpenConcierge}
          />
        )}

        {activeView === 'membership' && (
          <MembershipView
            currency={currency}
            onApplyMembership={handleOpenMembership}
          />
        )}

        {activeView === 'my-voyages' && (
          <MyVoyagesView
            bookings={bookings}
            charterRequests={charterRequests}
            aircraftEnquiries={aircraftEnquiries}
            conciergeRequests={conciergeRequests}
            currency={currency}
            onCancelBooking={handleCancelBooking}
            onViewBoardingPass={(b) => setBookingForPass(b)}
            onExploreFlights={() => setActiveView('first-class')}
            onOpenCharterModal={() => handleOpenCharter()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveView={setActiveView} />

      {/* MODALS */}

      {/* Flight Details Modal */}
      {flightForDetails && (
        <FlightDetailsModal
          flight={flightForDetails}
          currency={currency}
          onClose={() => setFlightForDetails(null)}
          onReserve={(f) => {
            setFlightForDetails(null);
            setFlightForBooking(f);
          }}
        />
      )}

      {/* Full 5-Step Commercial Flight Booking Workflow Modal (useReducer) */}
      {flightForBooking && (
        <BookingFlowModal
          flight={flightForBooking}
          travelDate={flightSearchParams.departureDate || new Date().toISOString().split('T')[0]}
          passengerCount={flightSearchParams.passengerCount || 1}
          currency={currency}
          onClose={() => setFlightForBooking(null)}
          onBookingCompleted={handleBookingCompleted}
        />
      )}

      {/* Boarding Pass Modal */}
      {bookingForPass && (
        <BoardingPassModal
          booking={bookingForPass}
          currency={currency}
          onClose={() => setBookingForPass(null)}
        />
      )}

      {/* Private Jet Charter Request Modal */}
      {isCharterModalOpen && (
        <CharterRequestModal
          initialCategory={charterInitCategory}
          initialRoute={charterInitRoute}
          currency={currency}
          onClose={() => setIsCharterModalOpen(false)}
          onRequestSubmitted={(req) => {
            setCharterRequests(getCharterRequests());
            showToast('Charter Requisition Filed', `Dispatch reference ${req.id} created.`);
          }}
        />
      )}

      {/* Aircraft Details Modal */}
      {aircraftForSpecs && (
        <AircraftDetailsModal
          aircraft={aircraftForSpecs}
          currency={currency}
          onClose={() => setAircraftForSpecs(null)}
          onEnquire={(ac) => {
            setAircraftForSpecs(null);
            setAircraftForEnquiry(ac);
          }}
        />
      )}

      {/* Aircraft Ownership Enquiry Modal */}
      {aircraftForEnquiry && (
        <OwnershipEnquiryModal
          aircraft={aircraftForEnquiry}
          currency={currency}
          onClose={() => setAircraftForEnquiry(null)}
          onEnquirySubmitted={(enq) => {
            setAircraftEnquiries(getAircraftEnquiries());
            showToast('Ownership Dossier Logged', `Brokerage code ${enq.id} created.`);
          }}
        />
      )}

      {/* Concierge Modal */}
      {isConciergeModalOpen && (
        <ConciergeModal
          initialService={conciergeInitService}
          onClose={() => setIsConciergeModalOpen(false)}
        />
      )}

      {/* Membership Modal */}
      {isMembershipModalOpen && (
        <MembershipModal
          initialTier={membershipInitTier}
          onClose={() => setIsMembershipModalOpen(false)}
        />
      )}

      {/* Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
