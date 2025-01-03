import { Separator } from '@/components/ui/separator';
import { SettingsHeader } from '@/components/ui/settings-header';
import { ProfileForm } from '@account/components/profile-form';

export const AccountSettings = () => {
  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <SettingsHeader
          title="Profile"
          description="This is how others will see you on the site."
        />
        <Separator />
        <ProfileForm />
      </div>
    </div>
  );
};
