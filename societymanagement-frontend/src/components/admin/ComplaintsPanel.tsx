import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ComplaintsPanel: React.FC = () => {
  const { complaints, updateComplaintStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filterStatus === 'all' || complaint.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || complaint.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const categories = [...new Set(complaints.map(c => c.category))];
  const openCount = complaints.filter(c => c.status === 'open').length;
  const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl font-medium text-slate-800">
              <MessageSquare className="w-5 h-5 mr-3 text-rose-600" />
              Complaints Management
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">
                {openCount} Open
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                {inProgressCount} In Progress
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 border-slate-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 border-slate-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Complaints List */}
          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">All caught up! ✨</h3>
                <p className="text-slate-600">No complaints match your current filters</p>
              </div>
            ) : (
              filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-slate-50 rounded-xl p-6 space-y-4 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-slate-800">{complaint.category}</h4>
                        <Badge className={getStatusColor(complaint.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(complaint.status)}
                            <span>{complaint.status.replace('-', ' ')}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        <strong>{complaint.residentName}</strong> • Flat {complaint.flatNumber}
                      </p>
                      <p className="text-slate-700 leading-relaxed">{complaint.description}</p>
                      <p className="text-xs text-slate-500">
                        Created: {new Date(complaint.createdAt).toLocaleDateString('en-IN')} •
                        Updated: {new Date(complaint.updatedAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {complaint.status !== 'resolved' && (
                    <div className="flex space-x-2 pt-2">
                      {complaint.status === 'open' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateComplaintStatus(complaint.id, 'in-progress')}
                          className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mark In Progress
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};