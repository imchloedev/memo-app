import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, useColorScheme } from "react-native";
import { useRecoilState } from "recoil";
import { notesFilterState } from "@recoil/atoms";
import { dark, light } from "@styles/theme";

const NotePicker = () => {
  const [noteFilter, setNoteFilter] = useRecoilState(notesFilterState);
  const isDarkMode = useColorScheme() === "dark";
  const currentTheme = isDarkMode ? dark : light;

  return (
    <View>
      <Picker
        selectedValue={noteFilter}
        style={{ width: "100%" }}
        itemStyle={{ fontSize: 16, color: currentTheme.color.textColor }}
        onValueChange={(itemValue, itemIndex) => setNoteFilter(itemValue)}
      >
        <Picker.Item label="Notes" value="Notes" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Wish List" value="Wish List" />
      </Picker>
    </View>
  );
};

export default NotePicker;
