import { useState } from 'react';
import { useSubmitCateringEvent } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CateringEventForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    organizer: '',
    email: '',
    date: '',
    guests: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useSubmitCateringEvent();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = 'Organizer name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (parseInt(formData.guests) < 1) {
      newErrors.guests = 'Must be at least 1 guest';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Event details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await mutation.mutateAsync({
        eventName: formData.eventName,
        organizer: formData.organizer,
        email: formData.email,
        date: formData.date,
        guests: parseInt(formData.guests),
        details: formData.details,
      });
      setFormData({ eventName: '', organizer: '', email: '', date: '', guests: '', details: '' });
      setErrors({});
    } catch (error) {
      // Error is handled by mutation state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mutation.isSuccess && (
        <Alert className="border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your catering request has been submitted! We'll contact you soon to discuss details.
          </AlertDescription>
        </Alert>
      )}

      {mutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to submit request. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="cat-event-name">Event Name *</Label>
        <Input
          id="cat-event-name"
          value={formData.eventName}
          onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
          placeholder="e.g., Wedding Reception, Corporate Lunch"
          disabled={mutation.isPending}
        />
        {errors.eventName && <p className="text-sm text-destructive">{errors.eventName}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cat-organizer">Organizer Name *</Label>
          <Input
            id="cat-organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            placeholder="Your full name"
            disabled={mutation.isPending}
          />
          {errors.organizer && <p className="text-sm text-destructive">{errors.organizer}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cat-email">Email *</Label>
          <Input
            id="cat-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@example.com"
            disabled={mutation.isPending}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cat-date">Event Date *</Label>
          <Input
            id="cat-date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            disabled={mutation.isPending}
          />
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cat-guests">Expected Guests *</Label>
          <Input
            id="cat-guests"
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            placeholder="50"
            disabled={mutation.isPending}
          />
          {errors.guests && <p className="text-sm text-destructive">{errors.guests}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cat-details">Event Details *</Label>
        <Textarea
          id="cat-details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          placeholder="Tell us about your event, preferred menu, location, and any special requirements..."
          rows={5}
          disabled={mutation.isPending}
        />
        {errors.details && <p className="text-sm text-destructive">{errors.details}</p>}
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Catering Request
      </Button>
    </form>
  );
}
