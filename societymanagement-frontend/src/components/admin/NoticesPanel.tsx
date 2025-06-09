import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, Plus, Megaphone, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const NoticesPanel: React.FC = () => {
  const { notices, addNotice } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    addNotice({
      title: formData.title.trim(),
      content: formData.content.trim(),
      priority: formData.priority,
    });

    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
    });
    setIsModalOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl font-medium text-slate-800">
              <Bell className="w-5 h-5 mr-3 text-blue-600" />
              Community Notices
            </CardTitle>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Notice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notices.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No notices yet</h3>
                <p className="text-slate-600 mb-4">Start by posting your first community notice</p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Post First Notice
                </Button>
              </div>
            ) : (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-slate-50 rounded-xl p-6 space-y-3 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800 flex items-center">
                      <span className="mr-2">{getPriorityIcon(notice.priority)}</span>
                      {notice.title}
                    </h4>
                    <Badge className={getPriorityColor(notice.priority)}>
                      {notice.priority} priority
                    </Badge>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{notice.content}</p>
                  <p className="text-xs text-slate-500">
                    Posted: {new Date(notice.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notice Modal */}
      <Dialog open={isModalOpen} onOpenChange={resetAndClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-slate-800">
              {step === 1 && 'Post Community Notice'}
              {step === 2 && 'Review Your Notice'}
              {step === 3 && 'Notice Posted Successfully'}
            </DialogTitle>
          </DialogHeader>

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Notice Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Monthly Maintenance Due"
                  className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-slate-700">
                  Priority Level
                </Label>
                <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-300 focus:ring-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🔵 Low Priority</SelectItem>
                    <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                    <SelectItem value="high">🔴 High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-slate-700">
                  Notice Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your notice here..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-32 resize-none border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetAndClose}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!formData.title.trim() || !formData.content.trim()}
                >
                  Review Notice
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800 flex items-center">
                    <span className="mr-2">{getPriorityIcon(formData.priority)}</span>
                    {formData.title}
                  </h4>
                  <Badge className={getPriorityColor(formData.priority)}>
                    {formData.priority} priority
                  </Badge>
                </div>
                <p className="text-slate-700 leading-relaxed">{formData.content}</p>
                <p className="text-xs text-slate-500">
                  Will be posted: {new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Back to Edit
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Post Notice
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-800">Notice posted successfully!</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your notice is now visible to all residents in their dashboard.
                </p>
              </div>
              <Button
                onClick={resetAndClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};