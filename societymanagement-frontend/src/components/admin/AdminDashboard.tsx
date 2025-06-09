import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Receipt, MessageSquare, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FlatsManagement } from './FlatsManagement';
import { InvoiceGeneration } from './InvoiceGeneration';
import { ComplaintsPanel } from './ComplaintsPanel';
import { NoticesPanel } from './NoticesPanel';

export const AdminDashboard: React.FC = () => {
  const { setCurrentRole } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-sm sm:max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <Button
            variant="ghost"
            onClick={() => setCurrentRole(null)}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Role Selection</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-xl sm:text-3xl font-light text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Kalpataru Paramount Management</p>
          </div>
          <div className="w-full sm:w-32"></div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="flats" className="space-y-6 sm:space-y-8">
          <div className="flex justify-center overflow-x-auto">
            <TabsList className="grid w-full max-w-xs sm:max-w-2xl grid-cols-2 sm:grid-cols-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl sm:rounded-2xl p-1 sm:p-2">
              <TabsTrigger 
                value="flats" 
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Flats & Residents</span>
                <span className="sm:hidden">Flats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="invoices"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Receipt className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Generate Invoices</span>
                <span className="sm:hidden">Invoices</span>
              </TabsTrigger>
              <TabsTrigger 
                value="complaints"
                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2 sm:py-3"
              >
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Complaints</span>
                <span className="sm:hidden">Issues</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notices"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Notices</span>
                <span className="sm:hidden">News</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="flats" className="mt-6 sm:mt-8">
            <FlatsManagement />
          </TabsContent>

          <TabsContent value="invoices" className="mt-6 sm:mt-8">
            <InvoiceGeneration />
          </TabsContent>

          <TabsContent value="complaints" className="mt-6 sm:mt-8">
            <ComplaintsPanel />
          </TabsContent>

          <TabsContent value="notices" className="mt-6 sm:mt-8">
            <NoticesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};