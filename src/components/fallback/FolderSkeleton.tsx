import React from "react";
import { styled } from "styled-components/native";
import SkeletonItem, { SItem } from "components/common/SkeletonItem";
import SkeletonFrame from "components/common/SkeletonFrame";

const FolderSkeleton = () => {
  return (
    <SkeletonFrame quantity={6}>
      <Wrapper>
        <SkeletonItem>
          <Title />
        </SkeletonItem>
      </Wrapper>
    </SkeletonFrame>
  );
};

export default FolderSkeleton;

const Wrapper = styled.View`
  padding: 0 20px;
  margin: 10px 0;
`;

const Title = styled(SItem)`
  height: 20px;
`;
