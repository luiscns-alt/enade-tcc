import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LoadContainer } from '@components/Loading/styles';
import { useTheme } from 'styled-components/native';

export function Loading() {
  const theme = useTheme();

  return (
    <LoadContainer>
      <ActivityIndicator color={theme.colors.primary} size='large' />
    </LoadContainer>
  );
}
