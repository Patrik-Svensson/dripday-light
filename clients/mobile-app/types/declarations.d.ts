// declarations.d.ts
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "@fortawesome/react-native-fontawesome" {
  import { IconProp } from "@fortawesome/fontawesome-svg-core";
  import * as React from "react";
  import { ViewStyle, StyleProp } from "react-native";

  export interface FontAwesomeIconProps {
    icon: IconProp;
    mask?: IconProp;
    style?: StyleProp<ViewStyle>;
    color?: string;
    size?: number;
  }

  export class FontAwesomeIcon extends React.Component<FontAwesomeIconProps> {}
}
