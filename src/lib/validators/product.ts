import z from "zod";
import { TextSchema } from "./auth";

const ImageType = z.object({
  id: z.string().optional(),
  fileId: z.string(),
  name: z.string(),
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  size: z.number().optional(),
  fileType: z.enum(["image", "all", "non-image"]).optional(),
  filePath: z.string().optional(),
  tags: z.array(TextSchema).optional(),
});

export type ImageType = z.infer<typeof ImageType>;

export const ProductFormSchema = z.object({
  name: TextSchema,
  id: z.string().optional(),
  prepTimeMinutes: z.string().optional(),
  cookTimeMinutes: z.string().optional(),
  tags: z.array(TextSchema).min(2, { error: "At least 2 tags are required." }),
  cuisine: TextSchema,
  images: z
    .array(ImageType)
    .min(1, { error: "Add at least 1 image to continue" }),
  difficulty: z.enum(["Easy", "Hard", "Medium"]),
  instructions: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  mealType: z.array(z.string()).optional(),
});
export type ProductFormInput = z.infer<typeof ProductFormSchema>;
