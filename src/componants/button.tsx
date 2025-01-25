import React from "react";
import type { PropsWithChildren } from "react";

import { View,Text,StyleSheet } from "react-native";

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
}>;

const CurrencyButton = (pros: CurrencyButtonProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text>{pros.flag}</Text>
            <Text>{pros.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})






export default CurrencyButton;
