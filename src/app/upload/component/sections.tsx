'use client';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductFormInput } from '@/lib/validators/product';
import { Plus, Trash } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface ProductSectionProps {
	form: UseFormReturn<ProductFormInput>;
	type: 'ingredients' | 'instructions';
}

export function ProductSection(props: ProductSectionProps) {
	const { form, type } = props;
	const [section, setSection] = React.useState('');
	return (
		<div className=" min-h-[10rem]">
			<div className=" flex justify-between gap-2">
				<Input
					type="text"
					placeholder={`Enter ${type}`}
					onChange={(e) => setSection(e.target.value)}
					value={section}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							if (section.length < 2) {
								return toast.warning('Please add a detailed description');
							}
							form.setValue(type, [...(form.getValues(type) || []), section]);
							setSection('');
						}
					}}
				/>
				<span
					onClick={() => {
						if (section.length < 2) {
							return toast.warning('Please add a detailed description');
						}
						form.setValue(type, [...(form.getValues(type) || []), section]);
						setSection('');
					}}
					className=" cursor-pointer flex items-center rounded-md p-1.5 px-2 text-primary border border-border">
					<Plus className="w-5 h-5" />
				</span>
			</div>
			<div className="flex flex-col gap-1 py-2">
				{form.getValues(type)?.map((val: string, index: number) => (
					<div key={val} className=" flex justify-between gap-2">
						<Badge
							key={index}
							variant="secondary"
							className="rounded-sm h-10 flex flex-1 items-center gap-1 ">
							{index + 1}. {val}
						</Badge>
						<span
							onClick={() => {
								form.setValue(
									type,
									form.getValues(type)?.filter((_: any, i: any) => i !== index)
								);
							}}
							className=" cursor-pointer rounded-md p-1.5 px-2 text-destructive border border-border">
							<Trash className="w-5 h-5" />
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
