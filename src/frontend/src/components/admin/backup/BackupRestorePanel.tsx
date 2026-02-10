import { useState } from 'react';
import { useExportData, useImportData } from '../../../hooks/useBackupRestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Download, Upload, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import type { ExportData } from '../../../backend';

export default function BackupRestorePanel() {
  const exportData = useExportData();
  const importData = useImportData();
  const [importJson, setImportJson] = useState('');
  const [previewData, setPreviewData] = useState<ExportData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExport = async () => {
    try {
      const data = await exportData.mutateAsync();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iniabasi-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Backup exported successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to export data');
    }
  };

  const handlePreview = () => {
    try {
      const data = JSON.parse(importJson) as ExportData;
      setPreviewData(data);
    } catch (error) {
      toast.error('Invalid JSON format');
    }
  };

  const handleImport = async () => {
    if (!previewData) {
      toast.error('Please preview the data first');
      return;
    }

    try {
      await importData.mutateAsync(previewData);
      toast.success('Data imported successfully');
      setDialogOpen(false);
      setImportJson('');
      setPreviewData(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to import data');
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Backup and restore operations affect all your website data. Always keep a recent backup before making major changes.
        </AlertDescription>
      </Alert>

      {/* Export */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>
            Download all your website data as a JSON file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExport} disabled={exportData.isPending}>
            {exportData.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Backup
          </Button>
        </CardContent>
      </Card>

      {/* Import */}
      <Card>
        <CardHeader>
          <CardTitle>Import Data</CardTitle>
          <CardDescription>
            Restore your website from a backup file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Backup
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Import Backup</DialogTitle>
                <DialogDescription>
                  Paste your backup JSON and preview before importing
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder="Paste your backup JSON here..."
                    rows={10}
                    className="font-mono text-xs"
                  />
                </div>

                <Button onClick={handlePreview} variant="outline" className="w-full">
                  Preview Data
                </Button>

                {previewData && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <h4 className="font-semibold">Preview:</h4>
                    <div className="space-y-1 text-sm">
                      <p>Location: {previewData.location.address}</p>
                      <p>Opening Hours: {previewData.openingHours.length} entries</p>
                      <p>Custom Pages: {previewData.pages.length}</p>
                      <p>Promotions: {previewData.promotions.length}</p>
                      <p>Button Configs: WhatsApp, Call, Order</p>
                    </div>
                  </div>
                )}

                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Importing will replace all current data. This action cannot be undone.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button
                    onClick={handleImport}
                    disabled={!previewData || importData.isPending}
                    variant="destructive"
                  >
                    {importData.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Import
                  </Button>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
