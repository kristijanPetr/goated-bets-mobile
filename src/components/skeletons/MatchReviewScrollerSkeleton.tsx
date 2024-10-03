import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { variables } from '~/utils/mixins';

interface Props {
  props?: any;
}

export const MatchReviewScrollerSkeleton = ({ props }: Props) => {
  return (
    <ContentLoader
      speed={1}
      width={500}
      height={74}
      viewBox="0 0 500 74"
      backgroundColor={variables.colors.grey}
      foregroundColor={variables.colors.lightGrey}
      {...props}>
      <Rect x="6" y="0" rx="20" ry="20" width="137" height="74" />
      <Rect x="153" y="0" rx="20" ry="20" width="137" height="74" />
    </ContentLoader>
  );
};
