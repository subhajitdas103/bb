
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import Groups from "./pages/Groups";
import TournamentDetail from "./pages/TournamentDetail";
import Calendar from "./pages/Calendar";
import Transactions from "./pages/Transactions";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import GroupDetail from "./pages/GroupDetail";
import TournamentPredict from "./pages/TournamentPredict";
import JoinTournament from "./pages/JoinTournament";
import TournamentParticipants from "./pages/TournamentParticipants";
import AllEvents from "./pages/AllEvents";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupDetail />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/tournaments/:id/predict" element={<TournamentPredict />} />
          <Route path="/tournaments/:id/participants" element={<TournamentParticipants />} />
          <Route path="/join-tournament" element={<JoinTournament />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
            <Route path="/super-admin" element={<SuperAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
