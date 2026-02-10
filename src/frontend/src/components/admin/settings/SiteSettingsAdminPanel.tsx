import { useState } from 'react';
import { useLocation, useOpeningHours } from '../../../hooks/useSiteSettings';
import {
  useUpdateLocation,
  useAddOpeningHour,
  useRemoveOpeningHour,
} from '../../../hooks/useAdminSiteSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SiteSettingsAdminPanel() {
  const { data: location } = useLocation();
  const { data: openingHours } = useOpeningHours();
  const updateLocation = useUpdateLocation();
  const addHour = useAddOpeningHour();
  const removeHour = useRemoveOpeningHour();

  const [formData, setFormData] = useState({
    address: location?.address || '',
    phone: location?.phone || '',
    email: location?.email || '',
    coordinates: location?.coordinates || '',
  });

  const [newHour, setNewHour] = useState({
    day: '',
    open: '',
    close: '',
  });

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLocation.mutateAsync(formData);
      toast.success('Location updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update location');
    }
  };

  const handleAddHour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHour.day || !newHour.open || !newHour.close) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await addHour.mutateAsync(newHour);
      setNewHour({ day: '', open: '', close: '' });
      toast.success('Opening hour added');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add opening hour');
    }
  };

  const handleRemoveHour = async (day: string) => {
    try {
      await removeHour.mutateAsync(day);
      toast.success('Opening hour removed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove opening hour');
    }
  };

  return (
    <div className="space-y-6">
      {/* Location & Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Location & Contact Information</CardTitle>
          <CardDescription>
            Update your restaurant's contact details and address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLocationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street, City"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@restaurant.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinates">Coordinates (lat,long)</Label>
              <Input
                id="coordinates"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                placeholder="6.5244,3.3792"
              />
            </div>

            <Button type="submit" disabled={updateLocation.isPending}>
              {updateLocation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Location
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Opening Hours</CardTitle>
          <CardDescription>
            Manage your restaurant's operating hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Hours */}
          {openingHours && openingHours.length > 0 && (
            <div className="space-y-2">
              {openingHours.map((hour) => (
                <div key={hour.day} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{hour.day}</p>
                    <p className="text-sm text-muted-foreground">
                      {hour.open} - {hour.close}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveHour(hour.day)}
                    disabled={removeHour.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Hour */}
          <form onSubmit={handleAddHour} className="space-y-3 rounded-lg border p-4">
            <p className="text-sm font-medium">Add Opening Hour</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Input
                placeholder="Day (e.g., Monday)"
                value={newHour.day}
                onChange={(e) => setNewHour({ ...newHour, day: e.target.value })}
              />
              <Input
                placeholder="Open (e.g., 9:00 AM)"
                value={newHour.open}
                onChange={(e) => setNewHour({ ...newHour, open: e.target.value })}
              />
              <Input
                placeholder="Close (e.g., 10:00 PM)"
                value={newHour.close}
                onChange={(e) => setNewHour({ ...newHour, close: e.target.value })}
              />
            </div>
            <Button type="submit" size="sm" disabled={addHour.isPending}>
              {addHour.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Hour
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
