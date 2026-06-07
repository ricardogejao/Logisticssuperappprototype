import React, { useState, useEffect } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  useParams, 
  useLocation, 
  useNavigate,
  Outlet
} from 'react-router';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Verification } from './pages/Verification';
import { ProfileSelection } from './pages/ProfileSelection';
import { DriverLicense } from './pages/DriverLicense';
import { BaseAddress } from './pages/BaseAddress';
import { FinancialInfo } from './pages/FinancialInfo';
import { VehicleRegistration } from './pages/VehicleRegistration';
import { Vehicles } from './pages/Vehicles';
import { Notifications } from './pages/Notifications';
import { AccountStatus } from './pages/AccountStatus';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { CargoDetails } from './pages/CargoDetails';
import { LoadingInstructions } from './pages/LoadingInstructions';
import { ContractAcceptance } from './pages/ContractAcceptance';
import { HiringSuccess } from './pages/HiringSuccess';
import { TripDetails } from './pages/TripDetails';
import { FreightOfferDetails } from './pages/FreightOfferDetails';
import { TripMode } from './pages/TripMode';
import { UpdateTripStatus } from './pages/UpdateTripStatus';
import { Trips } from './pages/Trips';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { VehicleEdit } from './pages/VehicleEdit';
import { Subscriptions } from './pages/Subscriptions';
import { Contracts } from './pages/Contracts';
import { Documents } from './pages/Documents';
import { Security } from './pages/Security';
import { Settings } from './pages/Settings';
import { NotificationSettings } from './pages/NotificationSettings';
import { Help } from './pages/Help';
import { TermsOfUse } from './pages/TermsOfUse';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { DigitalAccount } from './pages/DigitalAccount';
import { Pix } from './pages/Pix';
import { PixTransfer } from './pages/PixTransfer';
import { PixCopyPaste } from './pages/PixCopyPaste';
import { PixScan } from './pages/PixScan';
import { PixKeys } from './pages/PixKeys';
import { Payments } from './pages/Payments';
import { Receipts } from './pages/Receipts';
import { TransactionDetails } from './pages/TransactionDetails';
import { ArticleDetails } from './pages/ArticleDetails';
import { ReportProblemType } from './pages/ReportProblemType';
import { ReportProblemDetails } from './pages/ReportProblemDetails';
import { ReportProblemSuccess } from './pages/ReportProblemSuccess';
import { OccurrenceDetails } from './pages/OccurrenceDetails';
import { CancellationReason } from './pages/CancellationReason';
import { CancellationConfirm } from './pages/CancellationConfirm';
import { CancellationDetails } from './pages/CancellationDetails';
import { CancellationSuccess } from './pages/CancellationSuccess';
import { DesignTokens } from './pages/DesignTokens';
import { CheckList } from './pages/CheckList';
import { Toaster } from './components/ui/sonner';
import { useBannerMode } from './hooks/useBannerMode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

// Redirect Helper Component
const RedirectToContractAcceptance = () => {
  const { id } = useParams();
  return <Navigate to={`/offer/${id}/contract-acceptance`} replace />;
};

function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { bannerMode, setBannerMode } = useBannerMode();

  // Define all hooks at the very top, before any logic or early returns
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/login', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, []); // roda só uma vez no mount

  const showPresentationToggle = [
    '/home', '/marketplace', '/offers', '/digital-account'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-900 font-sans flex items-center justify-center">
      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: '100dvh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#f8fafc',
          transform: 'translateZ(0)',
          isolation: 'isolate',
        }}
      >

        {/* Scrollable app content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          {showSplash && <SplashScreen />}
          <Toaster />
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>

      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verification", element: <Verification /> },
      { path: "profile-selection", element: <ProfileSelection /> },
      { path: "driver-license", element: <DriverLicense /> },
      { path: "base-address", element: <BaseAddress /> },
      { path: "financial-info", element: <FinancialInfo /> },
      { path: "vehicle-registration", element: <VehicleRegistration /> },
      { path: "vehicles", element: <Vehicles /> },
      { path: "vehicles/:id/edit", element: <VehicleEdit /> },
      { path: "notifications", element: <Notifications /> },
      { path: "account-status", element: <AccountStatus /> },
      { path: "home", element: <Home /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "offers", element: <Marketplace /> },
      { path: "offer/:id", element: <CargoDetails /> },
      { path: "offer/:id/loading-instructions", element: <LoadingInstructions /> },
      { path: "offer/:id/contract-acceptance", element: <ContractAcceptance /> },
      { path: "offer/:id/hiring/success", element: <HiringSuccess /> },
      { path: "offer/:id/sent", element: <RedirectToContractAcceptance /> },
      { path: "offer/:id/hiring/review", element: <RedirectToContractAcceptance /> },
      { path: "offer/:id/hiring/confirmation", element: <RedirectToContractAcceptance /> },
      { path: "offer/:id/hiring/acceptance", element: <RedirectToContractAcceptance /> },
      { path: "trip/details", element: <TripDetails /> },
      { path: "freight-offer/:id", element: <FreightOfferDetails /> },
      { path: "trip/mode", element: <TripMode /> },
      { path: "trip/status", element: <UpdateTripStatus /> },
      { path: "trip/report-problem", element: <ReportProblemType /> },
      { path: "trip/report-problem/details", element: <ReportProblemDetails /> },
      { path: "trip/report-problem/success", element: <ReportProblemSuccess /> },
      { path: "trip/occurrence", element: <OccurrenceDetails /> },
      { path: "trip/cancel/reason", element: <CancellationReason /> },
      { path: "trip/cancel/details", element: <CancellationDetails /> },
      { path: "trip/cancel/confirm", element: <CancellationConfirm /> },
      { path: "trip/cancel/success", element: <CancellationSuccess /> },
      { path: "trips", element: <Trips /> },
      { path: "my-applications", element: <Navigate to="/trips" replace /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <ProfileEdit /> },
      { path: "profile/financial-info", element: <FinancialInfo isProfileView={true} /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "documents", element: <Documents /> },
      { path: "security", element: <Security /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/notifications", element: <NotificationSettings /> },
      { path: "help", element: <Help /> },
      { path: "contracts", element: <Contracts /> },
      { path: "contracts/terms", element: <TermsOfUse /> },
      { path: "contracts/privacy", element: <PrivacyPolicy /> },
      { 
        path: "digital-account",
        children: [
            { index: true, element: <DigitalAccount /> },
            { path: "pix", element: <Pix /> },
            { path: "pix/transfer", element: <PixTransfer /> },
            { path: "pix/copy-paste", element: <PixCopyPaste /> },
            { path: "pix/scan", element: <PixScan /> },
            { path: "pix/keys", element: <PixKeys /> },
            { path: "transfer", element: <PixTransfer /> },
            { path: "statement", element: <Receipts /> },
            { path: "payments", element: <Payments /> },
            { path: "receipts", element: <Receipts /> },
            { path: "transaction/:id", element: <TransactionDetails /> },
        ]
      },
      { path: "checklist", element: <CheckList /> },
      { path: "design-tokens", element: <DesignTokens /> },
      { path: "help/article/:id", element: <ArticleDetails /> },
      { path: "*", element: <Navigate to="/home" replace /> }
    ]
  },
]);

export default function App() {
  return (
    <React.Suspense fallback={null}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Suspense>
  );
}
