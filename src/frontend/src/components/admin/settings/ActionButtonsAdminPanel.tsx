import { useState, useEffect } from 'react';
import { useButtonConfigs } from '../../../hooks/useSiteSettings';
import { useUpdateButtonConfig } from '../../../hooks/useAdminSiteSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { ButtonConfig } from '../../../backend';

export default function ActionButtonsAdminPanel() {
  const { whatsapp, call, order } = useButtonConfigs();
  const updateConfig = useUpdateButtonConfig();

  const [whatsappConfig, setWhatsappConfig] = useState<ButtonConfig>({
    enabled: true,
    buttonLabel: 'WhatsApp',
    link: '',
  });

  const [callConfig, setCallConfig] = useState<ButtonConfig>({
    enabled: true,
    buttonLabel: 'Call',
    link: '',
  });

  const [orderConfig, setOrderConfig] = useState<ButtonConfig>({
    enabled: true,
    buttonLabel: 'Order',
    link: '',
  });

  useEffect(() => {
    if (whatsapp.data) setWhatsappConfig(whatsapp.data);
  }, [whatsapp.data]);

  useEffect(() => {
    if (call.data) setCallConfig(call.data);
  }, [call.data]);

  useEffect(() => {
    if (order.data) setOrderConfig(order.data);
  }, [order.data]);

  const handleSave = async (type: 'whatsapp' | 'call' | 'order', config: ButtonConfig) => {
    try {
      await updateConfig.mutateAsync({ type, config });
      toast.success(`${type} button updated successfully`);
    } catch (error: any) {
      toast.error(error.message || `Failed to update ${type} button`);
    }
  };

  return (
    <div className="space-y-6">
      {/* WhatsApp Button */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Button</CardTitle>
          <CardDescription>
            Configure the WhatsApp contact button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="whatsapp-enabled">Enable WhatsApp Button</Label>
            <Switch
              id="whatsapp-enabled"
              checked={whatsappConfig.enabled}
              onCheckedChange={(checked) =>
                setWhatsappConfig({ ...whatsappConfig, enabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp-label">Button Label</Label>
            <Input
              id="whatsapp-label"
              value={whatsappConfig.buttonLabel}
              onChange={(e) =>
                setWhatsappConfig({ ...whatsappConfig, buttonLabel: e.target.value })
              }
              placeholder="WhatsApp"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp-link">WhatsApp Link</Label>
            <Input
              id="whatsapp-link"
              value={whatsappConfig.link}
              onChange={(e) =>
                setWhatsappConfig({ ...whatsappConfig, link: e.target.value })
              }
              placeholder="https://wa.me/1234567890"
            />
          </div>

          <Button
            onClick={() => handleSave('whatsapp', whatsappConfig)}
            disabled={updateConfig.isPending}
          >
            {updateConfig.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save WhatsApp Config
          </Button>
        </CardContent>
      </Card>

      {/* Call Button */}
      <Card>
        <CardHeader>
          <CardTitle>Call Button</CardTitle>
          <CardDescription>
            Configure the phone call button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="call-enabled">Enable Call Button</Label>
            <Switch
              id="call-enabled"
              checked={callConfig.enabled}
              onCheckedChange={(checked) =>
                setCallConfig({ ...callConfig, enabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="call-label">Button Label</Label>
            <Input
              id="call-label"
              value={callConfig.buttonLabel}
              onChange={(e) =>
                setCallConfig({ ...callConfig, buttonLabel: e.target.value })
              }
              placeholder="Call"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="call-link">Phone Number</Label>
            <Input
              id="call-link"
              value={callConfig.link}
              onChange={(e) =>
                setCallConfig({ ...callConfig, link: e.target.value })
              }
              placeholder="+234 XXX XXX XXXX"
            />
          </div>

          <Button
            onClick={() => handleSave('call', callConfig)}
            disabled={updateConfig.isPending}
          >
            {updateConfig.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Call Config
          </Button>
        </CardContent>
      </Card>

      {/* Order Button */}
      <Card>
        <CardHeader>
          <CardTitle>Order Button</CardTitle>
          <CardDescription>
            Configure the online order button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="order-enabled">Enable Order Button</Label>
            <Switch
              id="order-enabled"
              checked={orderConfig.enabled}
              onCheckedChange={(checked) =>
                setOrderConfig({ ...orderConfig, enabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-label">Button Label</Label>
            <Input
              id="order-label"
              value={orderConfig.buttonLabel}
              onChange={(e) =>
                setOrderConfig({ ...orderConfig, buttonLabel: e.target.value })
              }
              placeholder="Order"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-link">Order Link</Label>
            <Input
              id="order-link"
              value={orderConfig.link}
              onChange={(e) =>
                setOrderConfig({ ...orderConfig, link: e.target.value })
              }
              placeholder="https://order.example.com"
            />
          </div>

          <Button
            onClick={() => handleSave('order', orderConfig)}
            disabled={updateConfig.isPending}
          >
            {updateConfig.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Order Config
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
