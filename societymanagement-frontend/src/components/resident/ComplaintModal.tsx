import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Resident } from '@/types';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: Resident;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose, resident }) => {
  const { addComplaint } = useApp();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const categories = [
    'Plumbing',
    'Electrical',
    'Common Area',
    'Security',
    'Maintenance',
    'Noise Complaint',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim()) return;

    addComplaint({
      residentId: resident.id,
      residentName: resident.name,
      flatNumber: resident.flatNumber,
      category,
      description: description.trim(),
      status: 'open', // Adding required status field with default value 'open'
    });

    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setCategory('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-slate-800">
            {step === 1 && 'What type of issue are you facing?'}
            {step === 2 && 'Tell us more about the issue'}
            {step === 3 && 'Complaint Submitted Successfully'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={`justify-start h-auto p-4 ${
                    category === cat 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    setStep(2);
                  }}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                Issue Category
              </Label>
              <Input
                id="category"
                value={category}
                readOnly
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 resize-none border-slate-200 focus:border-teal-300 focus:ring-teal-200"
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                disabled={!description.trim()}
              >
                Submit Complaint
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-slate-800">Got it. We've logged your issue.</h3>
              <p className="text-slate-600 leading-relaxed">
                Your complaint has been submitted successfully. Our team will review it and get back to you soon.
              </p>
            </div>
            <Button
              onClick={resetAndClose}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};