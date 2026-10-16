import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-gap-sm rounded-full text-small whitespace-nowrap outline-none select-none transition-colors duration-(--duration-fast) ease-token disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-on-accent hover:bg-pop hover:text-on-pop",
        outline:
          "border border-text bg-bg text-text hover:bg-surface hover:text-pop",
        ghost: "text-text hover:bg-surface hover:text-pop",
        link: "text-accent underline underline-offset-4 hover:text-pop",
      },
      size: {
        default: "h-10 px-gap",
        sm: "h-8 px-gap-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
