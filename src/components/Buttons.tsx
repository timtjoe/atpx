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
  small: {
    width: "24px",
    height: "24px",
    borderRadius: "12px",
  },
  medium: {
    width: "28px",
    height: "28px",
    borderRadius: "14px",
  },
  large: {
    width: "32px",
    height: "32px",
    borderRadius: "16px",
  },
};

const variantMap: Record<
  Variant,
  { background: string; hoverBackground: string }
> = {
  trans: {
    background: "transparent",
    hoverBackground: "tranparent",
  },
  primary: {
    background: "rgba(59, 130, 246, 0.2)",
    hoverBackground: "rgba(59, 130, 246, 0.3)",
  },
};

export const Button = styled.button<{ size: Size; variant: Variant }>`
  background: ${({ variant }) => variantMap[variant].background};
  border: none;
  width: ${({ size }) => sizeMap[size].width};
  height: ${({ size }) => sizeMap[size].height};
  border-radius: var(--round);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 129px;
  height: 32px;
  margin-top: 18px;
  background-color: var(--text-black);
  color: var(--bg-white);
  font-size: var(--font-sm);
  line-height: 18px;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);

  &:hover {
    background-color: var(--text-bold);
  }
`;