import React from 'react';
import { Text } from '@mantine/core';
import { IconMoonStars, IconTrophy, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/_global.module.scss';
import { useAuthStore } from '../store/auth';

type Props = {
  isDark: boolean;
  onToggleDark: () => void;
};

export default function Header({ isDark, onToggleDark }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.gameHeader}>
      <div className={styles.gameHeaderLeft}>
        <div className={styles.gameLogo}>
          <span role='img' aria-label='fish' style={{ fontSize: 24 }}>
            🐟
          </span>
        </div>
        <div>
          <Text fw={700} c='white' style={{ lineHeight: 1.1 }}>
            SacabamClicker
          </Text>
          <Text size='xs' c='white' opacity={0.8}>
            Welcome, {user?.email || 'username'}!
          </Text>
        </div>
      </div>

      <div className={styles.gameHeaderActions}>
        <button
          type='button'
          className={styles.circleIconBtn}
          onClick={onToggleDark}
        >
          <IconMoonStars size={18} />
        </button>
        <button type='button' className={styles.pillButton}>
          <IconTrophy size={18} />
          <span>Score board</span>
        </button>
        <button
          type='button'
          className={styles.pillButton}
          onClick={handleLogout}
        >
          <IconLogout size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
