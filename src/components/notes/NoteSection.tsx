import React from "react";
import { SectionList, Text } from "react-native";
import { styled } from "styled-components/native";
import { useRecoilValue } from "recoil";
import NoteItem from "~/components/notes/NoteItem";
import ScreenTitle from "~/components/common/ScreenTitle";
import { useNotesListQuery } from "hooks/notes";
import { notesFilterState } from "~/store";
import { TUser } from "apis";

interface INoteSectionProps {
  user: TUser;
  handleScroll: () => void;
  moveToNote: (id: string | undefined) => void;
}

const NoteSection = ({ user, handleScroll, moveToNote }: INoteSectionProps) => {
  const { notesState } = useNotesListQuery(user);
  const filter = useRecoilValue(notesFilterState);

  return (
    <>
      {notesState && (
        <SectionList
          sections={[
            {
              title: "Pinned",
              data: notesState.filter((note) => note.isPinned === true),
            },
            {
              title: "Notes",
              data: notesState.filter((note) => note.isPinned === false),
            },
          ]}
          style={{ flex: 1 }}
          renderSectionHeader={({ section: { title } }) => (
            <CategoryText>{title}</CategoryText>
          )}
          renderItem={({ item }) => (
            <NoteItem note={item} moveToNote={moveToNote} />
          )}
          keyExtractor={(item) => item.id?.toString() || ""}
          ListHeaderComponent={() => (
            <TitleWrapper>
              <ScreenTitle title={filter} />
            </TitleWrapper>
          )}
          stickySectionHeadersEnabled={true}
          onScroll={handleScroll}
        />
      )}
    </>
  );
};

export default NoteSection;

const TitleWrapper = styled.View`
  padding: 20px;
`;

const CategoryText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
  padding: 10px 28px;
`;
