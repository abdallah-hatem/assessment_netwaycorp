import { StyleProp, TextStyle } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  FontAwesomeName?: keyof typeof FontAwesome.glyphMap;
  MaterialCommunityIcons?: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: string;
  style?: StyleProp<TextStyle>;
  size?: number;
}

export default function TabBarIcon({ FontAwesomeName, color, style, size = 30 }: Props) {
  return <FontAwesome name={FontAwesomeName} size={size} color={color} style={style} />;
}
