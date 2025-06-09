import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockResidents } from '@/data/mockData';

export const ResidentSelector: React.FC = () => {
  const { setCurrentResident, setCurrentRole } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-sm sm:max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentRole(null)}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Role Selection</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
              Select Your Flat
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xs sm:max-w-md mx-auto px-2">
              Choose your flat to access your resident dashboard
            </p>
          </div>
        </div>

        {/* Resident Cards */}
        <div className="grid gap-4 sm:gap-6">
          {mockResidents.map((resident) => (
            <Card 
              key={resident.id} 
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 sm:p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-emerald-50 transition-all duration-500"
                  onClick={() => setCurrentResident(resident)}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                      {resident.name}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 font-medium">
                      Flat {resident.flatNumber}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{resident.phoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-32 sm:max-w-none">{resident.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-teal-500 group-hover:bg-teal-500 transition-all duration-300 flex items-center justify-center sm:block hidden">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300"></div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-slate-500 font-light">
            Kalpataru Paramount
          </p>
        </div>
      </div>
    </div>
  );
};