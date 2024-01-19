import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImage, selectedImage }) {
    return (
        <Image source={selectedImage ? {uri: selectedImage} : placeholderImage} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    }
})