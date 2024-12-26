'use client';

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AvatarUploaderProps {
  uid: string | undefined;
  url: string;
  onUpload: (path: string) => void;
}

export const AvatarUploader = ({ uid, url, onUpload }: AvatarUploaderProps) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string>(url);
  const [uploading, setUploading] = React.useState<boolean>(false);

  useEffect(() => {
    setAvatarUrl(url);
  }, [url]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return toast.error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        toast.error(uploadError.message);
      }

      const imageUrl = `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/avatars/${
        data?.path
      }`;

      setAvatarUrl(imageUrl);

      onUpload(imageUrl);
    } catch (error) {
      console.error(error);
      toast.error('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-[150px] flex flex-col gap-2.5">
      <div className="relative overflow-hidden w-[150px] h-[150px] shrink-0 rounded-md">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            fill
            className="object-cover absolute aspect-square"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <Image
            src={'/placeholder.svg'}
            alt="avatar"
            fill
            className="object-cover absolute scale-[2.5] aspect-square"
            priority
          />
        )}
      </div>
      <div>
        <Button asChild className="w-full">
          <Label htmlFor="single">
            {uploading ? 'UPLOADING...' : 'UPLOAD'}
          </Label>
        </Button>
        <Input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};
