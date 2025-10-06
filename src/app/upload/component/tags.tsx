"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { ProductFormInput } from "@/lib/validators/product";

interface ProductTagsProps {
  form: UseFormReturn<ProductFormInput>;
}

export function ProductTags({ form }: ProductTagsProps) {
  const [tagInput, setTagInput] = React.useState("");

  const handleAddTag = (tag: string) => {
    if (tag.length < 2) {
      toast.warning("Please add a valid tag name");
      return;
    }

    const newTags = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 2);

    const existingTags = form.getValues("tags") || [];
    form.setValue("tags", [...newTags, ...existingTags]);
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = form.getValues("tags").filter((_, i) => i !== index);
    form.setValue("tags", updatedTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col min-h-12 gap-4 w-full rounded-md border border-input bg-accent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <TagInput
          value={tagInput}
          onChange={setTagInput}
          onAddTag={handleAddTag}
        />
        <TagList tags={form.getValues("tags")} onRemove={handleRemoveTag} />
      </div>
      <TagHint />
    </div>
  );
}

interface TagInputProps {
  value: string;
  onChange: (val: string) => void;
  onAddTag: (tag: string) => void;
}

export function TagInput({ value, onChange, onAddTag }: TagInputProps) {
  return (
    <input
      type="text"
      placeholder="Enter tag"
      value={value}
      className=" border-0 outline-0 focus-visible:outline-0 flex-1"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onAddTag(value);
        }
      }}
    />
  );
}

export function TagHint() {
  return (
    <p className="text-xs pt-1">
      Press <span className="text-primary">Enter</span> to add a tag
    </p>
  );
}

interface TagListProps {
  tags: string[];
  onRemove: (index: number) => void;
}

export function TagList({ tags, onRemove }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 ">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          onClick={() => onRemove(index)}
          className=" flex items-center gap-1 cursor-pointer w-fit"
        >
          {tag}
          <X className="w-4 h-4" />
        </Badge>
      ))}
    </div>
  );
}
