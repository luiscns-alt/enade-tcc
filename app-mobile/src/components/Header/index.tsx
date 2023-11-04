import {
  Container,
  Icon,
  Info,
  InfoView,
  InfoWrapper,
  LogoutButton,
  Photo,
  Title,
  UserGreeting,
} from '@components/Header/styles';
import React from 'react';
import { useAuth } from '@hooks/useAuth';

interface HeaderProps {
  userName: string;
  title: string;
}

export function Header({ userName, title }: HeaderProps) {
  const { signOut } = useAuth();
  async function handleSignOut() {
    await signOut();
  }

  return (
    <Container>
      <InfoWrapper>
        <Info>
          <Photo
            source={{
              uri: 'https://avatars.githubusercontent.com/u/82232848?v=4',
            }}
          />
          <InfoView>
            <UserGreeting>{userName}</UserGreeting>
            <Title>{title}</Title>
          </InfoView>
        </Info>
        <LogoutButton onPress={handleSignOut}>
          <Icon name='power' />
        </LogoutButton>
      </InfoWrapper>
    </Container>
  );
}
