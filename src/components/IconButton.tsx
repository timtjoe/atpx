import styled from "styled-components";

type Size = "small" | "medium" | "large";
type Variant = "trans" | "primary";

interface IButton {
  size?: Size;
  variant?: Variant;
  children: React.ReactNode;
  [key: string]: any;
}

export const IconButton = ({
  size = "medium",
  variant = "trans",
  children,
  ...props
}: IButton) => (
  <Button size={size} variant={variant} {...props}>
    {children}
  </Button>
);

// Style definitions
const sizeMap: Record<
  Size,
  { width: string; height: string; borderRadius: string }
> = {
  small: { width: "24px", height: "24px", borderRadius: "12px" },
  medium: { width: "28px", height: "28px", borderRadius: "14px" },
  large: { width: "32px", height: "32px", borderRadius: "16px" },
};

const variantMap: Record<
  Variant,
  { background: string; hoverBackground: string }
> = {
  trans: {
    background: "rgba(0, 0, 0, 0.06)",
    hoverBackground: "rgba(0, 0, 0, 0.12)",
  },
  primary: {
    background: "rgba(59, 130, 246, 0.2)",
    hoverBackground: "rgba(59, 130, 246, 0.3)",
  },
};

const Button = styled.button<{ size: Size; variant: Variant }>`
  background: ${({ variant }) => variantMap[variant].background};
  border: none;
  width: ${({ size }) => sizeMap[size].width};
  height: ${({ size }) => sizeMap[size].height};
  border-radius: ${({ size }) => sizeMap[size].borderRadius};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 120ms ease,
    transform 120ms ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ variant }) => variantMap[variant].hoverBackground};
    transform: scale(1.05);
  }
`;
