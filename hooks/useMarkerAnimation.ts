import { useEffect } from "react";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useMarkerAnimation({
  id,
  selectedMarker,
}: {
  id: string;
  selectedMarker: string;
}) {
  const active = useSharedValue(0);

  useEffect(() => {
    const isActive = id === selectedMarker ? 1 : 0;
    active.value = isActive;
  }, [id, selectedMarker]);

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(active.value, [0, 1], [1, 2], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      transform: [{ scale: withTiming(scale, { duration: 200 }) }],
    };
  });

  return animatedStyles;
}
