import React from 'react';
import { Image, Pressable } from 'react-native';

import { Props } from '../constants/Interfaces';
import { ModalCloseButtonStyles } from '../styles/ModalCloseButtonStyles';

export default function ModalCloseButton({ closeModal }: Readonly<Props>) {
    return (
        <Pressable onPress={closeModal} style={ModalCloseButtonStyles.closeMainCon} hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Image source={require("../assets/images/modal_close_icon.png")} resizeMode="contain" style={ModalCloseButtonStyles.modalCloseIcon} />
        </Pressable>
    );
}
