import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

const plans = [
  {
    value: "plus",
    title: "Plus",
    description: "Para autônomos e times pequenos",
  },
  { value: "pro", title: "Pro", description: "Para empresas em crescimento" },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "Para grandes operações",
  },
];

export default function RadioGroupDescription() {
  return (
    <RadioGroup defaultValue="plus" className="max-w-sm">
      {plans.map((plan) => (
        <FieldLabel key={plan.value} htmlFor={`${plan.value}-plan`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={plan.value} id={`${plan.value}-plan`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
