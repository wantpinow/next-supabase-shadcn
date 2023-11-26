import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  // const LucideIcon = dynamic(dynamicIconImports[name]);

  // return <LucideIcon {...props} />;
  return <div />;
};

export default Icon;

// import dynamic from "next/dynamic";
// import type Lucide from "lucide-react";

// export type IconNames = keyof typeof Lucide.icons;
// interface IconProps extends Lucide.LucideProps {
//   name: IconNames;
// }

// const Icon = ({ name, ...props }: IconProps) => {
//   const LucideIcon = dynamic(() =>
//     import(`lucide-react`).then((mod) => mod[name])
//   );

//   return <LucideIcon {...props} />;
// };

// export default Icon;
// export type { IconProps };
