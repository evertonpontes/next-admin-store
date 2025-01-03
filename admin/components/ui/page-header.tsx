'use client';

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-0.5">
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
