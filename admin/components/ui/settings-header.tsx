'use client';

interface SettingsHeaderProps {
  title: string;
  description: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
