import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const drag = Gesture.Pan().onChange((event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
    })

    const scaleImage = useSharedValue(imageSize);
    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        if (scaleImage.value === imageSize) {
            // scaleImage.value = withSpring(2 * imageSize);
            scaleImage.value = scaleImage.value * 2;
        }
    })

    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={{ top: -350 }}>
                <GestureDetector gesture={doubleTap} >
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}