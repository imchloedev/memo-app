import React from "react";
import { styled } from "styled-components/native";
import SkeletonItem, { SItem } from "components/common/SkeletonItem";
import SkeletonFrame from "components/common/SkeletonFrame";

const NoteSkeleton = () => {
  const ITEMS = [
    { id: 1, component: <Title /> },
    { id: 2, component: <Date /> },
    { id: 3, component: <FolderName /> },
  ];

  return (
    <SkeletonFrame quantity={6}>
      <Wrapper>
        {ITEMS.map((item) => (
          <SkeletonItem key={item.id}>{item.component}</SkeletonItem>
        ))}
      </Wrapper>
    </SkeletonFrame>
  );
};

export default NoteSkeleton;

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.color.container};
  margin: 10px 20px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled(SItem)`
  height: 16px;
`;

const Date = styled(SItem)`
  width: 20%;
  height: 12px;
`;

const FolderName = styled(SItem)`
  width: 10%;
  height: 12px;
`;
