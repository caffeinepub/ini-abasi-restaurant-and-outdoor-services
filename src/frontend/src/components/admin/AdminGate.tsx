import { ReactNode, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus, useGetCallerUserProfile } from '../../hooks/useAdminStatus';
import AdminLoginPanel from './AdminLoginPanel';
import AdminAccessDenied from './AdminAccessDenied';
import ProfileSetupDialog from './ProfileSetupDialog';
import { Loader2 } from 'lucide-react';

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const { isAdmin, isLoading: adminLoading, refetch, isRefetching } = useAdminStatus();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  
  // Track if we've done the post-auth refresh
  const hasRefreshedAfterAuth = useRef(false);
  const previousAuthState = useRef(false);

  const isAuthenticated = !!identity;

  // Trigger a one-time admin status refresh when user becomes authenticated
  useEffect(() => {
    const justAuthenticated = isAuthenticated && !previousAuthState.current;
    
    if (justAuthenticated && !hasRefreshedAfterAuth.current && !adminLoading) {
      // User just logged in - force a fresh admin check
      hasRefreshedAfterAuth.current = true;
      refetch();
    }
    
    previousAuthState.current = isAuthenticated;
    
    // Reset the flag when user logs out
    if (!isAuthenticated) {
      hasRefreshedAfterAuth.current = false;
    }
  }, [isAuthenticated, adminLoading, refetch]);

  // Show loading while initializing or during the post-auth refresh
  if (isInitializing || (isAuthenticated && (adminLoading || isRefetching))) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLoginPanel />;
  }

  // Handle sign out
  const handleSignOut = async () => {
    await clear();
    queryClient.clear();
  };

  // Handle retry access check
  const handleRetry = async () => {
    await refetch();
  };

  // Show access denied if authenticated but not admin
  if (!isAdmin) {
    return (
      <AdminAccessDenied
        onSignOut={handleSignOut}
        onRetry={handleRetry}
        isRetrying={isRefetching}
      />
    );
  }

  // Show profile setup if admin but no profile
  const showProfileSetup = isAuthenticated && isAdmin && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      {showProfileSetup && <ProfileSetupDialog open={true} />}
      {children}
    </>
  );
}
