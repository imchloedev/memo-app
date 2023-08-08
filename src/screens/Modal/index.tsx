import React from "react";
import NotePicker from "~/components/NotePicker";
import { styled } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../@types";

type ModalProps = NativeStackScreenProps<MainStackParamList, "Modal">;

const Modal = ({ navigation }: ModalProps) => {
  return (
    <Container>
      <Backdrop onPress={() => navigation.goBack()} />
      <Wrapper>
        <NotePicker />
      </Wrapper>
    </Container>
  );
};

export default Modal;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.02);
`;

const Wrapper = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 40%;
  background-color: ${({ theme }) => theme.color.modalBg};
`;

const CloseBtn = styled.TouchableOpacity``;
