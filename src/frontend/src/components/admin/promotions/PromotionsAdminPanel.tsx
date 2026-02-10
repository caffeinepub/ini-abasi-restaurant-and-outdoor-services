import { useState } from 'react';
import { useAllPromotions, useAddPromotion, useUpdatePromotion, useDeletePromotion } from '../../../hooks/useAdminPromotions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Promotion } from '../../../backend';
import { Principal } from '@dfinity/principal';

export default function PromotionsAdminPanel() {
  const { data: promotions, isLoading } = useAllPromotions();
  const addPromotion = useAddPromotion();
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<Principal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    active: true,
    order: 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      active: true,
      order: 0,
    });
    setEditingId(null);
  };

  const handleEdit = (promotion: Promotion, id: Principal) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      imageUrl: promotion.imageUrl,
      link: promotion.link || '',
      active: promotion.active,
      order: Number(promotion.order),
    });
    setEditingId(id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    try {
      if (editingId) {
        await updatePromotion.mutateAsync({
          id: editingId,
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          link: formData.link || undefined,
          active: formData.active,
          order: BigInt(formData.order),
        });
        toast.success('Promotion updated');
      } else {
        await addPromotion.mutateAsync({
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          link: formData.link || undefined,
          order: BigInt(formData.order),
        });
        toast.success('Promotion added');
      }
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save promotion');
    }
  };

  const handleDelete = async (id: Principal) => {
    try {
      await deletePromotion.mutateAsync(id);
      toast.success('Promotion deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete promotion');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Promotions & Banners</h2>
          <p className="text-sm text-muted-foreground">
            Manage promotional banners displayed on your website
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Add'} Promotion</DialogTitle>
              <DialogDescription>
                Create or update a promotional banner
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Special Offer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Get 20% off on all orders this weekend!"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/assets/promo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link (optional)</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              {editingId && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Active</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={addPromotion.isPending || updatePromotion.isPending}>
                  {(addPromotion.isPending || updatePromotion.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingId ? 'Update' : 'Add'} Promotion
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {promotions && promotions.length > 0 ? (
          promotions.map((promo, idx) => {
            // Convert Principal to string for key
            const promoId = Principal.fromUint8Array(new Uint8Array(Object.values(promo as any)));
            return (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{promo.title}</CardTitle>
                      <CardDescription>{promo.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(promo, promoId)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this promotion? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(promoId)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Order: {promo.order.toString()}</span>
                    <span className={promo.active ? 'text-green-600' : 'text-red-600'}>
                      {promo.active ? 'Active' : 'Inactive'}
                    </span>
                    {promo.link && <span>Has link</span>}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No promotions yet. Click "Add Promotion" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
