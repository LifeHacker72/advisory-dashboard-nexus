
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import AllClients from "./pages/AllClients";
import Advisors from "./pages/Advisors";
import Activation from "./pages/Activation";
import Meetings from "./pages/Meetings";
import Bookings from "./pages/Bookings";
import PendingTasks from "./pages/PendingTasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/all-clients" element={<AllClients />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/pending-tasks" element={<PendingTasks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
