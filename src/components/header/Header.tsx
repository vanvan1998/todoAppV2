import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from 'src/contexts';
import Link from 'next/link';
import { HomeIcon, AccountIcon, SignOutIcon, ChangePassIcon } from '../../icons';
import styled from 'styled-components';
import { styles } from './Header.styles';
import { Title } from 'src/components';
import { placeholderColor, secondaryColor, transparent } from 'src/theme';
import { Button } from '../button';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  ${styles.container}
`;

const LeftHeader = styled.div`
  ${styles.leftHeader}
`;

const LeftMenu = styled.div`
  ${styles.leftMenu}
`;

const AccountTitle = styled.div`
  ${styles.accountTitle}
`;

export const Header = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const ref = useRef(null);

  const handleToProfile = () => {
    setShowLeftMenu(false);
    router.push('/update-profile');
  };

  const handleToChangePassword = () => {
    setShowLeftMenu(false);
    router.push('/change-password');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/sign-in');
    } catch {
      console.log('Failed to log out');
    }
    setShowLeftMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
        setShowLeftMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <Container>
        <Link href='/' className=''>
          <HomeIcon fill={secondaryColor} />
        </Link>
        <LeftHeader>
          <Title style={{ color: secondaryColor }}>Hi {currentUser?.displayName || currentUser?.email}</Title>
          <div ref={ref}>
            <Button
              handleButton={() => {
                currentUser ? setShowLeftMenu(!showLeftMenu) : router.push('/sign-in');
              }}
              styles={{ backgroundColor: 'transparent' }}
              testId='account-button'
            >
              {currentUser ? (
                <AccountIcon width={24} fill={secondaryColor} />
              ) : (
                <SignOutIcon width={24} fill={secondaryColor} style={{ transform: 'rotate(180deg)' }} />
              )}
            </Button>
            {showLeftMenu ? (
              <LeftMenu>
                <Button
                  handleButton={handleToProfile}
                  styles={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    backgroundColor: transparent,
                    borderBottom: `1px solid ${placeholderColor}`,
                    borderRadius: 0,
                    width: '100%'
                  }}
                  testId='profile-button'
                >
                  <AccountTitle>
                    <AccountIcon width={20} fill={secondaryColor} />
                    <Title style={{ textDecoration: 'none' }}>Profile</Title>
                  </AccountTitle>
                </Button>
                <Button
                  handleButton={handleToChangePassword}
                  styles={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    backgroundColor: transparent,
                    borderBottom: `1px solid ${placeholderColor}`,
                    borderRadius: 0,
                    width: '100%'
                  }}
                  testId='change-password-button'
                >
                  <AccountTitle>
                    <ChangePassIcon width={20} fill={secondaryColor} />
                    <Title style={{ textDecoration: 'none' }}>Change password</Title>
                  </AccountTitle>
                </Button>
                <Button
                  handleButton={handleLogout}
                  styles={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    backgroundColor: transparent,
                    borderRadius: 0,
                    width: '100%'
                  }}
                  testId='sign-out-button'
                >
                  <AccountTitle>
                    <SignOutIcon width={20} fill={secondaryColor} />
                    <Title style={{ textDecoration: 'none' }}>Sign out</Title>
                  </AccountTitle>
                </Button>
              </LeftMenu>
            ) : null}
          </div>
        </LeftHeader>
      </Container>
    </>
  );
};
