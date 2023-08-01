import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, useColorScheme } from "react-native";
import { useRecoilState } from "recoil";
import { notesFilterState } from "@recoil/atoms";
import { dark, light } from "@styles/theme";
import useThemeColors from "~/hooks/useThemeColors";

const NotePicker = () => {
  const [noteFilter, setNoteFilter] = useRecoilState(notesFilterState);
  const mode = useThemeColors();

  return (
    <View>
      <Picker
        selectedValue={noteFilter}
        style={{ width: "100%" }}
        itemStyle={{ fontSize: 16, color: mode.color.textColor }}
        onValueChange={(itemValue, _) => setNoteFilter(itemValue)}
      >
        <Picker.Item label="Notes" value="Notes" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Wish List" value="Wish List" />
      </Picker>
    </View>
  );
};

export default NotePicker;
