import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, LogOut, RefreshCw, Home } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import AdminAccessCodePanel from './AdminAccessCodePanel';
import { Separator } from '@/components/ui/separator';

interface AdminAccessDeniedProps {
  onSignOut?: () => void;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export default function AdminAccessDenied({ onSignOut, onRetry, isRetrying = false }: AdminAccessDeniedProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="font-serif text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Administrator Access Required</AlertTitle>
              <AlertDescription>
                This area is restricted to authorized restaurant owners and administrators only.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  disabled={isRetrying}
                  variant="default"
                  className="w-full"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry access check
                    </>
                  )}
                </Button>
              )}

              {onSignOut && (
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              )}

              <Link to="/">
                <Button variant="ghost" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <AdminAccessCodePanel />
      </div>
    </div>
  );
}
