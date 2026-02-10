import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import AdminGate from '../../components/admin/AdminGate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Image, FileText, Megaphone, Database, Wrench } from 'lucide-react';
import SiteSettingsAdminPanel from '../../components/admin/settings/SiteSettingsAdminPanel';
import ActionButtonsAdminPanel from '../../components/admin/settings/ActionButtonsAdminPanel';
import PromotionsAdminPanel from '../../components/admin/promotions/PromotionsAdminPanel';
import PagesAdminPanel from '../../components/admin/pages/PagesAdminPanel';
import BackupRestorePanel from '../../components/admin/backup/BackupRestorePanel';

export default function AdminPage() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <AdminGate>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/ini-abasi-logo.dim_512x512.png"
                alt="Logo"
                className="h-8 w-8"
              />
              <div>
                <h1 className="font-serif text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Ini-Abasi Restaurant</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container px-4 py-8 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="mb-2 text-2xl font-bold">Welcome to Your Dashboard</h2>
                <p className="text-muted-foreground">
                  Manage all aspects of your restaurant website from here
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setActiveTab('settings')}>
                  <CardHeader>
                    <Settings className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>Site Settings</CardTitle>
                    <CardDescription>
                      Update location, contact info, and opening hours
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setActiveTab('buttons')}>
                  <CardHeader>
                    <Wrench className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>Action Buttons</CardTitle>
                    <CardDescription>
                      Configure WhatsApp, call, and order buttons
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setActiveTab('promotions')}>
                  <CardHeader>
                    <Megaphone className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>Promotions</CardTitle>
                    <CardDescription>
                      Manage promotional banners and offers
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setActiveTab('pages')}>
                  <CardHeader>
                    <FileText className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>Custom Pages</CardTitle>
                    <CardDescription>
                      Create and manage additional pages
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setActiveTab('backup')}>
                  <CardHeader>
                    <Database className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>Backup & Restore</CardTitle>
                    <CardDescription>
                      Export and import your website data
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <Image className="mb-2 h-8 w-8 text-muted-foreground" />
                    <CardTitle className="text-muted-foreground">Menu & Gallery</CardTitle>
                    <CardDescription>
                      Coming soon: Full menu and gallery management
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Always export a backup before making major changes</p>
                  <p>• Test custom pages before sharing links publicly</p>
                  <p>• Keep your contact information up to date</p>
                  <p>• Use promotions to highlight special offers</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <SiteSettingsAdminPanel />
            </TabsContent>

            {/* Buttons Tab */}
            <TabsContent value="buttons">
              <ActionButtonsAdminPanel />
            </TabsContent>

            {/* Promotions Tab */}
            <TabsContent value="promotions">
              <PromotionsAdminPanel />
            </TabsContent>

            {/* Pages Tab */}
            <TabsContent value="pages">
              <PagesAdminPanel />
            </TabsContent>

            {/* Backup Tab */}
            <TabsContent value="backup">
              <BackupRestorePanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGate>
  );
}
