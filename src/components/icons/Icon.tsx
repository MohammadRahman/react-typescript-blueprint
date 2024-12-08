import { IconNames, icons } from "@config/reactIconsModule";

type IconProps = {
  name: IconNames; // The icon name should be of type `IconNames`
  size?: number; // Optional size prop
  color?: string;
};

const Icon = ({ name, size = 24, color = "black" }: IconProps) => {
  const IconComponent = icons[name]; // Dynamically get the icon by name

  if (!IconComponent) {
    console.error(`Icon ${name} not found`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
