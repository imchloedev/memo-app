import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";

const getData = async () => {
  const data = await fetch("https://jsonplceholder.typicode.com/posts");
  const res = await data.json();
  return res;
};

const Sample = () => {
  const { data } = useQuery(["dummy"], getData, { suspense: true });

  return (
    <View>
      {data && data.map((li: any) => <Text key={li.id}>{li.title}</Text>)}
    </View>
  );
};

export default Sample;
