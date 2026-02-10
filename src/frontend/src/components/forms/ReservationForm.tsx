import { useState } from 'react';
import { useSubmitReservation } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useSubmitReservation();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.date) {
      newErrors.date = 'Date and time are required';
    }

    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (parseInt(formData.guests) < 1) {
      newErrors.guests = 'Must be at least 1 guest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await mutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        date: formData.date,
        guests: parseInt(formData.guests),
        specialRequests: formData.specialRequests || undefined,
      });
      setFormData({ name: '', email: '', date: '', guests: '', specialRequests: '' });
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
            Your reservation request has been submitted! We'll confirm shortly.
          </AlertDescription>
        </Alert>
      )}

      {mutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to submit reservation. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="res-name">Name *</Label>
          <Input
            id="res-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your full name"
            disabled={mutation.isPending}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="res-email">Email *</Label>
          <Input
            id="res-email"
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
          <Label htmlFor="res-date">Date & Time *</Label>
          <Input
            id="res-date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            disabled={mutation.isPending}
          />
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="res-guests">Number of Guests *</Label>
          <Input
            id="res-guests"
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            placeholder="2"
            disabled={mutation.isPending}
          />
          {errors.guests && <p className="text-sm text-destructive">{errors.guests}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="res-requests">Special Requests (Optional)</Label>
        <Textarea
          id="res-requests"
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          placeholder="Any dietary restrictions or special requirements?"
          rows={3}
          disabled={mutation.isPending}
        />
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Reservation
      </Button>
    </form>
  );
}
