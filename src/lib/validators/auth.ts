import { z } from "zod";
export const TextSchema = z
  .string()
  .min(2, { error: "Must be at least 2 characters." });
const EmailSchema = z.email({ error: "Please enter a valid email." });
const PhoneSchema = z
  .string()
  .min(10, { error: "Please enter a valid phone number." });
const PasswordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters." })
  .max(255);
const AddressSchema = z.object({
  state: TextSchema,
  city: TextSchema,
  street: z.string().min(4, { error: "Please enter a valid address." }),
});
const ResetPasswordSchema = z.object({
  password: PasswordSchema,
});
export const resetPasswordSchema = ResetPasswordSchema.extend({
  token: z.string().min(1, "Invalid token"),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const manualResetPasswordSchema = ResetPasswordSchema.extend({
  currentPassword: PasswordSchema,
  newPassword: PasswordSchema,
  confirmPassword: PasswordSchema,
});
export type ManualResetPasswordInput = z.infer<
  typeof manualResetPasswordSchema
>;

export const AuthLoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;

export const AuthSignupFormSchema = AuthLoginSchema.extend({
  firstName: TextSchema,
  lastName: TextSchema,
  phone: PhoneSchema,
});
export type AuthSignupFormInput = z.infer<typeof AuthSignupFormSchema>;

export const AddressFormSchema = AddressSchema.extend({
  id: z.string().optional(),
  default: z.boolean(),
});
export type AddressFormInput = z.infer<typeof AddressFormSchema>;

export const BasicUpdate = AuthSignupFormSchema.omit({ password: true }).extend(
  {
    gender: z.string().optional(),
  }
);
export type BasicUpdateInput = z.infer<typeof BasicUpdate>;

export const AdminUserFormSchema = AuthSignupFormSchema.merge(
  AddressFormSchema
).extend({
  id: z.string().optional(),
  gender: z.string().optional(),
});
