import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Loader2 } from 'lucide-react';
import { storeSessionParameter, getSessionParameter } from '@/utils/urlParams';

export default function AdminAccessCodePanel() {
  const [accessCode, setAccessCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);

  // Check if there was a previous failed attempt
  const attemptedToken = getSessionParameter('caffeineAdminTokenAttempted');
  const showPreviousAttemptError = attemptedToken === 'true' && !showInvalidMessage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      return;
    }

    setIsSubmitting(true);
    setShowInvalidMessage(false);

    // Store the access code in sessionStorage
    storeSessionParameter('caffeineAdminToken', accessCode.trim());
    // Mark that an attempt was made
    storeSessionParameter('caffeineAdminTokenAttempted', 'true');

    // Trigger a full page reload to re-initialize the actor
    // This will cause useActor to call _initializeAccessControlWithSecret with the new token
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Key className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-center font-serif text-xl">Enter Access Code</CardTitle>
        <CardDescription className="text-center">
          Enter your administrator access code to gain access to the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {showPreviousAttemptError && (
            <Alert variant="destructive">
              <AlertDescription>
                The access code you entered was invalid. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              type="password"
              placeholder="Enter access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              disabled={isSubmitting}
              autoComplete="off"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !accessCode.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Submit Access Code'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
