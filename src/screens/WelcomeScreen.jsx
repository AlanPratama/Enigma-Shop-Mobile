import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function WelcomeScreen() {

    return (
        <View style={styles.container}>
            {/* Gambar bingkai yang menutupi seluruh layar atas */}
            <Image 
                source={require("../../assets/bingkai.png")} 
                style={styles.frameImage}
                resizeMode="cover"
            />

            {/* Konten Welcome */}
            <Animated.Text entering={FadeIn.delay(300)} style={styles.anivText}>
                5th Anniversary
            </Animated.Text>

            <Animated.Text entering={FadeIn.delay(300)} style={styles.newText}>
                SUPER PROMO
            </Animated.Text>

            <Animated.Text entering={FadeIn.delay(300)} style={styles.new2Text}>
                Celebrate with Us!
            </Animated.Text>

            {/* Gambar musicnote di tengah layar */}
            <Animated.Image 
                entering={FadeIn.delay(200)} 
                source={require("../../assets/musicnote.png")} 
                style={styles.mnoteImage} 
                resizeMode="contain"
            />

            {/* Gambar enigmaradio di tengah layar */}
            <Animated.Image 
                entering={FadeIn.delay(200)} 
                source={require("../../assets/enigmaradio.png")} 
                style={styles.radioImage} 
                resizeMode="contain"
            />

            {/* Gambar Enigma Shop di bagian bawah layar */}
            <Animated.Image 
                entering={FadeIn.delay(100)} 
                source={require("../../assets/enigmashop.png")} 
                style={styles.shopImage}
                resizeMode="contain"
            />

            {/* Gambar confetti di bagian terdepan layar */}
            <Animated.Image 
                entering={FadeIn.delay(100)} 
                source={require("../../assets/confetti.png")} 
                style={styles.confettiImage}
                resizeMode="cover" // Menutupi lebar penuh layar
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    frameImage: {
        position: 'absolute',
        top: '0%',   
        left: '0%',
        width: '100%',
        height: '50%',
        zIndex: -1, // Menaruh gambar bingkai di belakang
    },
    anivText: {
        fontWeight: 'bold',
        fontSize: 27,
        color: '#223e90',
        position: 'absolute',
        top: '15%',
        transform: [{ translateY: -20 }],
        textShadowColor: '#ff8946',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 5,
    },
    newText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ff8946',
        position: 'absolute',
        top: '19%',
        transform: [{ translateY: -20 }],
        textShadowColor: '#000',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 2,
    },
    new2Text: {
        fontWeight: 'bold',
        fontSize: 27,
        color: '#223e90',
        position: 'absolute',
        top: '23%',
        transform: [{ translateY: -20 }],
        textShadowColor: '#ff8946',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 5,
    },
    mnoteImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: '28%',
        right: '5%',
    },
    radioImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: '50%',
    },
    shopImage: {
        width: 180,
        height: 200,
        position: 'absolute',
        bottom: '10%',
        marginBottom: 10,
    },
    confettiImage: {
        position: 'absolute',
        top: '0%', // Posisi di paling atas layar
        width: '100%', // Menutupi lebar layar penuh
        height: '30%', // Ukuran gambar confetti
        zIndex: 2, // Menaruh gambar ini di paling depan
    },
});
