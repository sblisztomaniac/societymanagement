import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, MessageSquare, Bell, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ComplaintModal } from './ComplaintModal';

export const ResidentDashboard: React.FC = () => {
  const { currentResident, setCurrentResident, flats, complaints, notices } = useApp();
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  if (!currentResident) return null;

  const currentFlat = flats.find(flat => flat.resident?.id === currentResident.id);
  const residentComplaints = complaints.filter(complaint => complaint.residentId === currentResident.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-sm sm:max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <Button
            variant="ghost"
            onClick={() => setCurrentResident(null)}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Switch Resident</span>
            <span className="sm:hidden">Switch</span>
          </Button>
          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-xl sm:text-3xl font-light text-slate-900 tracking-tight">
              Welcome, {currentResident.name}
            </h1>
            <p className="text-slate-600 mt-1">Flat {currentResident.flatNumber}</p>
          </div>
          <div className="w-full sm:w-32"></div>
        </div>

        {/* Maintenance Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center text-lg sm:text-2xl font-medium text-slate-800">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-teal-600" />
              Your Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentFlat ? (
              <div className="space-y-4 sm:space-y-6">
                {currentFlat.isPaid ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-slate-800 mb-2 sm:mb-3">All paid up! ✨</h3>
                    <p className="text-base sm:text-lg text-slate-600">No dues right now — breathe easy</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-red-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                      <h3 className="text-lg sm:text-xl font-medium text-slate-800">Amount Due</h3>
                      <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1">
                        Pending
                      </Badge>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-3xl sm:text-4xl font-light text-slate-900">₹{currentFlat.maintenanceAmount.toLocaleString()}</p>
                      <p className="text-sm sm:text-base text-slate-600">
                        Due Date: {new Date(currentFlat.dueDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-base sm:text-lg text-slate-600">No maintenance information available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Complaints Section */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg sm:text-xl font-medium text-slate-800">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-rose-600" />
                  Your Complaints
                </CardTitle>
                <Button
                  onClick={() => setIsComplaintModalOpen(true)}
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Raise Issue</span>
                  <span className="sm:hidden">Issue</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {residentComplaints.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">All's quiet today ✨</h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">No active complaints</p>
                    <Button
                      onClick={() => setIsComplaintModalOpen(true)}
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50 transition-all duration-300 text-sm"
                    >
                      Report an Issue
                    </Button>
                  </div>
                ) : (
                  residentComplaints.map((complaint) => (
                    <div key={complaint.id} className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 hover:bg-slate-100 transition-colors duration-300">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <h4 className="font-medium text-slate-800 text-sm sm:text-base">{complaint.category}</h4>
                        <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                          {complaint.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{complaint.description}</p>
                      <p className="text-xs text-slate-500">
                        Created: {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notices Section */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center text-lg sm:text-xl font-medium text-slate-800">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600" />
                Community Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {notices.map((notice) => (
                  <div key={notice.id} className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 hover:bg-slate-100 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                      <h4 className="font-medium text-slate-800 text-sm sm:text-base">{notice.title}</h4>
                      <Badge className={`${getPriorityColor(notice.priority)} text-xs`}>
                        {notice.priority}
                      </Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{notice.content}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(notice.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        resident={currentResident}
      />
    </div>
  );
};