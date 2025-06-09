import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/context/AppContext';
import { Resident } from '@/types';

interface FlatModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatId: string | null;
}

export const FlatModal: React.FC<FlatModalProps> = ({ isOpen, onClose, flatId }) => {
  const { flats, addFlat, updateFlat } = useApp();
  const [formData, setFormData] = useState({
    number: '',
    maintenanceAmount: '',
    dueDate: '',
    isPaid: false,
    residentName: '',
    residentPhone: '',
    residentEmail: '',
    hasResident: false,
  });

  const isEditing = !!flatId;
  const currentFlat = isEditing ? flats.find(f => f.id === flatId) : null;

  useEffect(() => {
    if (currentFlat) {
      setFormData({
        number: currentFlat.number,
        maintenanceAmount: currentFlat.maintenanceAmount.toString(),
        dueDate: currentFlat.dueDate,
        isPaid: currentFlat.isPaid,
        residentName: currentFlat.resident?.name || '',
        residentPhone: currentFlat.resident?.phoneNumber || '',
        residentEmail: currentFlat.resident?.email || '',
        hasResident: !!currentFlat.resident,
      });
    } else {
      setFormData({
        number: '',
        maintenanceAmount: '',
        dueDate: '',
        isPaid: false,
        residentName: '',
        residentPhone: '',
        residentEmail: '',
        hasResident: false,
      });
    }
  }, [currentFlat, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resident: Resident | null = formData.hasResident ? {
      id: currentFlat?.resident?.id || Date.now().toString(),
      name: formData.residentName,
      flatNumber: formData.number,
      phoneNumber: formData.residentPhone,
      email: formData.residentEmail,
    } : null;

    const flatData = {
      number: formData.number,
      resident,
      maintenanceAmount: parseInt(formData.maintenanceAmount),
      dueDate: formData.dueDate,
      isPaid: formData.isPaid,
    };

    if (isEditing && flatId) {
      updateFlat(flatId, flatData);
    } else {
      addFlat(flatData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-slate-800">
            {isEditing ? 'Edit Flat' : 'Add New Flat'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number" className="text-sm font-medium text-slate-700">
                Flat Number
              </Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                placeholder="e.g., A-101"
                className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceAmount" className="text-sm font-medium text-slate-700">
                  Maintenance Amount
                </Label>
                <Input
                  id="maintenanceAmount"
                  type="number"
                  value={formData.maintenanceAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, maintenanceAmount: e.target.value }))}
                  placeholder="2500"
                  className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-sm font-medium text-slate-700">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPaid"
                checked={formData.isPaid}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPaid: !!checked }))}
              />
              <Label htmlFor="isPaid" className="text-sm text-slate-700">
                Maintenance is paid
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasResident"
                checked={formData.hasResident}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasResident: !!checked }))}
              />
              <Label htmlFor="hasResident" className="text-sm text-slate-700">
                Assign resident to this flat
              </Label>
            </div>

            {formData.hasResident && (
              <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-800">Resident Information</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="residentName" className="text-sm font-medium text-slate-700">
                    Full Name
                  </Label>
                  <Input
                    id="residentName"
                    value={formData.residentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, residentName: e.target.value }))}
                    placeholder="John Doe"
                    className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                    required={formData.hasResident}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residentPhone" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </Label>
                  <Input
                    id="residentPhone"
                    value={formData.residentPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, residentPhone: e.target.value }))}
                    placeholder="+91-9876543210"
                    className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                    required={formData.hasResident}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residentEmail" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    id="residentEmail"
                    type="email"
                    value={formData.residentEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, residentEmail: e.target.value }))}
                    placeholder="john@example.com"
                    className="border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                    required={formData.hasResident}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isEditing ? 'Update Flat' : 'Add Flat'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};