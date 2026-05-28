'use client';

import { useRef, useState, useActionState, useTransition } from 'react';
import { FaCamera, FaPencil } from 'react-icons/fa6';
import { FaCircleUser } from 'react-icons/fa6';
import { updateAvatar } from '@/actions/profileActions';

interface Props {
  currentImage: string | null;
  name: string;
}

async function compressImage(file: File, maxPx = 400, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width  * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function AvatarUpload({ currentImage, name }: Props) {
  const fileRef  = useRef<HTMLInputElement>(null);
  const [preview, setPreview]       = useState<string | null>(currentImage);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [state, formAction]         = useActionState(updateAvatar, { success: false });

  const hasPhoto = Boolean(preview);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file);
      setPreview(dataUrl);
      setCompressed(dataUrl);
    } catch {
      console.error('Image compression failed');
    }
    e.target.value = '';
  };

  const handleSubmit = () => {
    if (!compressed) return;
    const fd = new FormData();
    fd.append('image', compressed);
    startTransition(() => formAction(fd));
  };

  return (
    <div className="flex flex-col items-center gap-4">

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="group relative size-28 cursor-pointer rounded-full outline-4 outline-offset-2 outline-custom-primary"
        aria-label="Change profile photo"
      >
        {preview ? (
          <img src={preview} alt={name} className="size-full rounded-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center rounded-full bg-custom-primary/10 text-3xl font-medium text-custom-primary">
            {initials || <FaCircleUser className="size-16 text-custom-text-muted/40" />}
          </span>
        )}

        {!hasPhoto && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <FaCamera className="size-6 text-white" />
          </span>
        )}
        {hasPhoto && (
          <span className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-150 group-hover:bg-black/25" />
        )}

        {hasPhoto && (
          <span className="absolute bottom-0.5 right-0.5 flex size-7 items-center justify-center rounded-full border-2 border-custom-card-bg bg-custom-primary shadow-md transition-transform duration-150 group-hover:scale-110">
            <FaPencil className="size-3 text-white" />
          </span>
        )}

        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <span className="size-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </span>
        )}
      </button>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {compressed && !state.success && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="rounded-full bg-custom-primary px-5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Save photo'}
        </button>
      )}
      {state.success && (
        <p className="text-xs text-emerald-500">Photo saved!</p>
      )}
      {state.message && !state.success && (
        <p className="text-xs text-red-400">{state.message}</p>
      )}
    </div>
  );
}
