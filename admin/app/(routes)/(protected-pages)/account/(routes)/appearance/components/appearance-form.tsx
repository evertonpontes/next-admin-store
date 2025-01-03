'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  ThemeRadioGroup,
  ThemeRadioGroupBgDark,
  ThemeRadioGroupBgLight,
  ThemeRadioGroupItem,
} from '@account/(routes)/appearance/components/theme-radio-group';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  theme: z.enum(['light', 'dark']),
});

export const AppearanceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: 'light',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-1">
          <Label>Theme</Label>
          <p className="text-[0.8rem] text-muted-foreground">
            Select the theme for the dashboard.
          </p>
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ThemeRadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="grid text-center">
                      <FormControl>
                        <ThemeRadioGroupItem value="light">
                          <ThemeRadioGroupBgLight />
                        </ThemeRadioGroupItem>
                      </FormControl>
                      <FormLabel>Light</FormLabel>
                    </FormItem>
                    <FormItem className="grid text-center">
                      <FormControl>
                        <ThemeRadioGroupItem value="dark">
                          <ThemeRadioGroupBgDark />
                        </ThemeRadioGroupItem>
                      </FormControl>
                      <FormLabel>Dark</FormLabel>
                    </FormItem>
                  </ThemeRadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button>Update preferences</Button>
      </form>
    </Form>
  );
};
