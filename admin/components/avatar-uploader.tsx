'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';

interface AvatarUploaderProps {
  uid: string;
  url: string;
  onUpload: (url: string) => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  uid,
  url,
  onUpload,
}) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
        });

        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(filePath, compressedFile);

        if (uploadError) {
          throw uploadError;
        }

        const imageUrl = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/avatars/${
          data?.path
        }`;

        setAvatarUrl(imageUrl);
        onUpload(imageUrl);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  console.log(avatarUrl);

  return (
    <div className="space-y-2 flex flex-col">
      {avatarUrl ? (
        <div className="relative size-[150px] overflow-hidden border rounded">
          <Image
            src={avatarUrl}
            alt="avatar"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      ) : (
        <div className="relative size-[150px] overflow-hidden border rounded">
          <Image
            src="/placeholder.svg"
            alt="placeholder"
            fill
            className="object-cover scale-[2.5]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
      <div className="w-[150px]">
        <Label
          htmlFor="upload"
          className="w-full px-4 py-2 bg-primary text-primary-foreground h-10 rounded-md cursor-pointer hover:bg-primary/90 flex items-center justify-center"
        >
          {uploading ? 'UPLOADING ...' : 'UPLOAD'}
        </Label>
        <Input
          type="file"
          id="upload"
          onChange={uploadAvatar}
          className="hidden"
          disabled={uploading}
          accept="image/*"
        />
      </div>
    </div>
  );
};
