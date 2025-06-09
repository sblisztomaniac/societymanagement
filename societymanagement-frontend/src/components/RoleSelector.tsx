import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const RoleSelector: React.FC = () => {
  const { setCurrentRole } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extralight text-slate-900 tracking-tight leading-tight">
              Welcome to
            </h1>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-800 tracking-tight">
              Kalpataru Paramount
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
            Choose your role to access your personalized dashboard
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4 sm:space-y-6">
          {/* Resident Card */}
          <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-auto p-6 sm:p-8 flex items-center space-x-4 sm:space-x-6 hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-emerald-50 transition-all duration-500 text-left"
                onClick={() => setCurrentRole('resident')}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg flex-shrink-0">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                    I'm a Resident
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    View maintenance dues, raise complaints, and stay updated with community notices
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-teal-500 group-hover:bg-teal-500 transition-all duration-300 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300"></div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-auto p-6 sm:p-8 flex items-center space-x-4 sm:space-x-6 hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-rose-50 group-hover:to-pink-50 transition-all duration-500 text-left"
                onClick={() => setCurrentRole('admin')}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg flex-shrink-0">
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-rose-700 transition-colors duration-300">
                    I'm Committee Member
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    Manage flats, generate invoices, handle complaints, and post community announcements
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-rose-500 group-hover:bg-rose-500 transition-all duration-300 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300"></div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-slate-500 font-light">
            Society Management System
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Built with care for modern communities
          </p>
        </div>
      </div>
    </div>
  );
};