import React from 'react';
import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from '@account/(routes)/appearance/components/appearance-form';
import { SettingsHeader } from '@/components/ui/settings-header';

export const AppearanceSettings = () => {
  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <SettingsHeader
          title="Appearance"
          description="Customize the appearance of the app. Automatically switch between day and night themes."
        />
        <Separator />
        <div className="space-y-8">
          <div className="space-y-1">
            <AppearanceForm />
          </div>
        </div>
      </div>
    </div>
  );
};
