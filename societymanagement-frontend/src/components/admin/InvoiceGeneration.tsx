import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, FileText, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const InvoiceGeneration: React.FC = () => {
  const { flats, generateInvoice } = useApp();
  const [step, setStep] = useState(1);
  const [selectedFlat, setSelectedFlat] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceType, setInvoiceType] = useState('maintenance');
  const [description, setDescription] = useState('');

  const handleGenerateInvoice = () => {
    if (selectedFlat && amount && dueDate) {
      generateInvoice(selectedFlat, parseInt(amount), dueDate);
      setStep(4);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedFlat('');
    setAmount('');
    setDueDate('');
    setInvoiceType('maintenance');
    setDescription('');
  };

  const selectedFlatData = flats.find(f => f.id === selectedFlat);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-medium text-slate-800">
            <Receipt className="w-5 h-5 mr-3 text-emerald-600" />
            Generate Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Select Invoice Type</h3>
                <p className="text-slate-600 mb-6">Choose what type of invoice you'd like to generate</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 border-2 hover:border-emerald-300 hover:bg-emerald-50"
                  onClick={() => {
                    setInvoiceType('maintenance');
                    setStep(2);
                  }}
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-slate-800">Monthly Maintenance</h4>
                    <p className="text-sm text-slate-600">Regular monthly charges</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 border-2 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => {
                    setInvoiceType('special');
                    setStep(2);
                  }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-slate-800">Special Assessment</h4>
                    <p className="text-sm text-slate-600">One-time charges</p>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-slate-800">Select Flat</h3>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  {invoiceType === 'maintenance' ? 'Monthly Maintenance' : 'Special Assessment'}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flat" className="text-sm font-medium text-slate-700">
                  Choose Flat
                </Label>
                <Select value={selectedFlat} onValueChange={setSelectedFlat}>
                  <SelectTrigger className="border-slate-200 focus:border-emerald-300 focus:ring-emerald-200">
                    <SelectValue placeholder="Select a flat..." />
                  </SelectTrigger>
                  <SelectContent>
                    {flats.map((flat) => (
                      <SelectItem key={flat.id} value={flat.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>Flat {flat.number}</span>
                          <div className="flex items-center space-x-2 ml-4">
                            {flat.resident ? (
                              <span className="text-sm text-slate-500">({flat.resident.name})</span>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                                Vacant
                              </Badge>
                            )}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedFlat}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && selectedFlatData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-slate-800">Invoice Details</h3>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  Flat {selectedFlatData.number}
                </Badge>
              </div>

              {selectedFlatData.resident && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-medium text-slate-800 mb-2">Billing To:</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>{selectedFlatData.resident.name}</p>
                    <p>Flat {selectedFlatData.number}</p>
                    <p>{selectedFlatData.resident.email}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                    Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={invoiceType === 'maintenance' ? '2500' : '5000'}
                    className="border-slate-200 focus:border-emerald-300 focus:ring-emerald-200"
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border-slate-200 focus:border-emerald-300 focus:ring-emerald-200"
                    required
                  />
                </div>
              </div>

              {invoiceType === 'special' && (
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Swimming pool maintenance, Garden renovation"
                    className="border-slate-200 focus:border-emerald-300 focus:ring-emerald-200"
                  />
                </div>
              )}

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">Invoice Preview</h4>
                    <p className="text-sm text-slate-600">
                      ₹{amount && parseInt(amount).toLocaleString()} • Due: {dueDate && new Date(dueDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </Button>
                <Button
                  onClick={handleGenerateInvoice}
                  disabled={!amount || !dueDate}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Generate Invoice
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-800">Invoice Generated Successfully!</h3>
                <p className="text-slate-600 leading-relaxed">
                  The invoice has been generated and the resident will see it in their dashboard.
                </p>
              </div>
              <Button
                onClick={resetForm}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Generate Another Invoice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};