"use client";

import { Button } from "@blips/ui/components/button";
import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@blips/ui/components/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";
import { Switch } from "@blips/ui/components/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const plans = [
  { label: "Selecione um plano", value: null },
  { label: "Básico", value: "basico" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

const formSchema = z.object({
  plan: z.string({ message: "Escolha um plano." }).min(1, "Escolha um plano."),
  notifications: z.boolean(),
  terms: z.boolean().refine((value) => value, {
    message: "Você precisa aceitar os termos.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormControls() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { plan: "", notifications: true, terms: false },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plano</FormLabel>
              <Select
                items={plans}
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? "")}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {plans.map((plan) => (
                      <SelectItem key={plan.label} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>Você pode trocar depois.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <FormLabel>Notificações por e-mail</FormLabel>
                <FormDescription>Avisos sobre a sua conta.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Aceito os termos de uso
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
