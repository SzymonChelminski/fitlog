'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { IoLogOut } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';

import { createClient } from '@/lib/supabase/client';
import { deleteAccount } from '@/actions/settingsActions';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function ActionRow({
  icon,
  label,
  description,
  children,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
            danger ? 'bg-red-500/10' : 'bg-black/[0.06] dark:bg-white/[0.06]'
          }`}
        >
          {icon}
        </div>
        <div>
          <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-custom-text-main'}`}>
            {label}
          </p>
          <p className="text-xs text-custom-text-muted/80">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function DangerZone() {
  const router                          = useRouter();
  const [signOutOpen, setSignOutOpen]   = useState(false);
  const [deleteOpen, setDeleteOpen]     = useState(false);
  const [deleteError, setDeleteError]   = useState<string | null>(null);
  const [isPending, startTransition]    = useTransition();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleDelete = () => {
    setDeleteError(null);
    startTransition(async () => {
      const result = await deleteAccount();
      if (result && !result.success) {
        setDeleteError(result.message ?? 'Something went wrong.');
      }
    });
  };

  return (
    <>
      <div className="glass divide-y divide-custom-border rounded-2xl border border-custom-border bg-custom-card-bg px-5 py-2">

        <ActionRow
          icon={<IoLogOut className="size-4 text-custom-text-muted" />}
          label="Sign out"
          description="End your current session on this device"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSignOutOpen(true)}
            className="cursor-pointer border-custom-border bg-black/[0.04] dark:bg-white/[0.04] text-custom-text-muted hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:text-custom-text-main"
          >
            Sign out
          </Button>
        </ActionRow>

        <ActionRow
          icon={<RiDeleteBinLine className="size-4 text-red-400" />}
          label="Delete account"
          description="Permanently remove all your data — this cannot be undone"
          danger
        >
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </ActionRow>
      </div>

      <Dialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <DialogContent className="border-custom-border bg-custom-card-bg text-custom-text-main">
          <DialogHeader>
            <DialogTitle className="text-custom-text-main">Sign out?</DialogTitle>
            <DialogDescription className="text-custom-text-muted">
              You will be returned to the home page and will need to log in again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-t border-custom-border bg-transparent pt-4">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="cursor-pointer px-6 py-2.5 text-custom-text-muted hover:bg-black/[0.06] hover:text-custom-text-main dark:hover:bg-white/[0.06]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSignOut}
              className="cursor-pointer bg-custom-primary px-6 py-2.5 text-white hover:bg-custom-primary/90"
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="border-custom-border bg-custom-card-bg text-custom-text-main">
          <DialogHeader>
            <DialogTitle className="text-red-400">Delete your account?</DialogTitle>
            <DialogDescription className="text-custom-text-muted">
              All your workouts, plans, and stats will be permanently deleted.{' '}
              <span className="font-medium text-custom-text-muted">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>

          {deleteError && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {deleteError}
            </p>
          )}

          <DialogFooter className="border-t border-custom-border bg-transparent pt-4">
            <DialogClose asChild>
              <Button
                variant="ghost"
                disabled={isPending}
                className="cursor-pointer px-6 py-2.5 text-custom-text-muted hover:bg-black/[0.06] hover:text-custom-text-main dark:hover:bg-white/[0.06]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
              className="cursor-pointer bg-red-500/90 px-6 py-2.5 text-white hover:bg-red-600 disabled:opacity-50"
            >
              {isPending ? 'Deleting…' : 'Yes, delete everything'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
