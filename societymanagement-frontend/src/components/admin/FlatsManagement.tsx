import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, User, Plus, Edit } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FlatModal } from './FlatModal';

export const FlatsManagement: React.FC = () => {
  const { flats } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlat, setEditingFlat] = useState<string | null>(null);

  const handleEdit = (flatId: string) => {
    setEditingFlat(flatId);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingFlat(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFlat(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl font-medium text-slate-800">
              <Home className="w-5 h-5 mr-3 text-teal-600" />
              Flats & Residents Management
            </CardTitle>
            <Button
              onClick={handleAdd}
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Flat
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {flats.map((flat) => (
              <div
                key={flat.id}
                className="bg-slate-50 rounded-xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-slate-800">Flat {flat.number}</h3>
                    {flat.resident ? (
                      <div className="flex items-center space-x-3">
                        <p className="text-slate-600">{flat.resident.name}</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Occupied
                        </Badge>
                      </div>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        Vacant
                      </Badge>
                    )}
                    {flat.resident && (
                      <div className="text-sm text-slate-500 space-y-1">
                        <p>📞 {flat.resident.phoneNumber}</p>
                        <p>✉️ {flat.resident.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-medium text-slate-800">₹{flat.maintenanceAmount.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">
                      Due: {new Date(flat.dueDate).toLocaleDateString('en-IN')}
                    </p>
                    <Badge className={flat.isPaid ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                      {flat.isPaid ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(flat.id)}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <FlatModal
        isOpen={isModalOpen}
        onClose={closeModal}
        flatId={editingFlat}
      />
    </div>
  );
};