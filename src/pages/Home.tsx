import React, { useMemo, useState } from 'react';
import { Button, Text } from '@mantine/core';
import {
  IconDeviceFloppy,
  IconShoppingBag,
  IconTrendingUp,
} from '@tabler/icons-react';
import styles from '../assets/styles/_global.module.scss';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [savedScore, setSavedScore] = useState(0);
  const [unsavedScore, setUnsavedScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [level, setLevel] = useState(1);

  const upgradePrice = useMemo(() => 100 * level * level, [level]);
  const canUpgrade = savedScore >= upgradePrice;

  const handleClickFish = () => {
    setUnsavedScore((prev) => prev + clickPower);
    setCurrentScore((prev) => prev + clickPower);
  };

  const handleSave = () => {
    if (unsavedScore <= 0) return;
    setSavedScore((prev) => prev + unsavedScore);
    setUnsavedScore(0);
  };

  const handleUpgrade = () => {
    if (!canUpgrade) return;
    setSavedScore((prev) => prev - upgradePrice);
    setLevel((prev) => prev + 1);
    setClickPower((prev) => prev + 1);
  };

  return (
    <div className={`${styles.gameRoot} ${isDark ? styles.gameRootDark : ''}`}>
      <Header isDark={isDark} onToggleDark={() => setIsDark((prev) => !prev)} />

      {/* Main */}
      <main className={styles.gameMain}>
        <div className={styles.gameMainInner}>
          {/* Sidebar cards */}
          <section className={styles.gameSidebar}>
            {/* Score board */}
            <div className={styles.gameSidebarCard}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <Text fw={700} size='lg' c={isDark ? 'white' : 'dark'}>
                  Score Board
                </Text>
                <Text size='xs' c='dimmed'>
                  Last sync: 01:29:40
                </Text>
              </div>

              <div
                style={{
                  backgroundColor: isDark ? 'rgba(22,163,74,0.12)' : '#ecfdf3',
                  border: `1px solid ${isDark ? '#166534' : '#bbf7d0'}`,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <Text
                  size='xs'
                  fw={600}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                    color: isDark ? '#4ade80' : '#166534',
                  }}
                >
                  <IconDeviceFloppy size={14} />
                  Saved Score (Server)
                </Text>
                <Text
                  size='xl'
                  fw={700}
                  style={{ color: isDark ? '#86efac' : '#16a34a' }}
                >
                  {savedScore}
                </Text>
              </div>

              <div
                style={{
                  backgroundColor: isDark ? 'rgba(194,65,12,0.12)' : '#fff7ed',
                  border: `1px solid ${isDark ? '#9a3412' : '#fed7aa'}`,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                    color: isDark ? '#fed7aa' : '#ea580c',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  <span>Unsaved Score (Local)</span>
                </div>
                <Text
                  size='xl'
                  fw={700}
                  style={{ color: isDark ? '#fdba74' : '#f97316' }}
                >
                  +{unsavedScore}
                </Text>
              </div>

              <Button
                fullWidth
                leftSection={<IconDeviceFloppy size={16} />}
                color='teal'
                size='md'
                radius='md'
                style={{ fontWeight: 600 }}
                disabled={unsavedScore <= 0}
                onClick={handleSave}
              >
                Save to server
              </Button>
            </div>

            {/* Stats */}
            <div className={styles.gameSidebarCard}>
              <Text fw={700} size='lg' mb={12} c={isDark ? 'white' : 'dark'}>
                Your Stats
              </Text>
              <div style={{ marginBottom: 16 }}>
                <Text
                  size='xs'
                  fw={500}
                  c={isDark ? 'gray.4' : 'gray.6'}
                  mb={4}
                >
                  Click Power
                </Text>
                <Text
                  size='xl'
                  fw={700}
                  style={{ color: isDark ? '#f9a8d4' : '#db2777' }}
                >
                  +{clickPower}
                </Text>
              </div>
              <div>
                <Text
                  size='xs'
                  fw={500}
                  c={isDark ? 'gray.4' : 'gray.6'}
                  mb={4}
                >
                  Power Level
                </Text>
                <Text
                  size='xl'
                  fw={700}
                  style={{ color: isDark ? '#fed7aa' : '#f97316' }}
                >
                  Level {level}
                </Text>
              </div>
            </div>

            {/* Shop */}
            <div className={styles.gameSidebarCard}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                  color: isDark ? '#fff' : '#111827',
                }}
              >
                <IconTrendingUp size={20} color='#a855f7' />
                <Text fw={700}>Shop</Text>
              </div>

              <div
                style={{
                  backgroundColor: isDark ? 'rgba(109,40,217,0.2)' : '#f5f3ff',
                  borderRadius: 14,
                  border: `1px solid ${isDark ? '#4c1d95' : '#ddd6fe'}`,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <Text fw={600} size='sm' c={isDark ? 'white' : 'dark'}>
                      Click Power Upgrade
                    </Text>
                    <Text size='xs' c={isDark ? 'gray.4' : 'gray.6'}>
                      Current Level:{' '}
                      <span style={{ color: '#a855f7', fontWeight: 700 }}>
                        {level}
                      </span>
                    </Text>
                    <Text size='xs' c={isDark ? 'gray.4' : 'gray.6'}>
                      Next price:{' '}
                      <span style={{ fontWeight: 600 }}>{upgradePrice}</span>
                    </Text>
                  </div>
                  <IconTrendingUp size={20} color='#a855f7' />
                </div>

                <Button
                  fullWidth
                  mt='xs'
                  radius='md'
                  size='sm'
                  leftSection={<IconShoppingBag size={16} />}
                  disabled={!canUpgrade}
                  onClick={handleUpgrade}
                  style={{
                    background:
                      'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                  }}
                >
                  Open shop
                </Button>
              </div>

              <div
                style={{
                  backgroundColor: isDark ? 'rgba(30,64,175,0.35)' : '#eff6ff',
                  borderRadius: 10,
                  border: `1px solid ${isDark ? '#1d4ed8' : '#bfdbfe'}`,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span role='img' aria-label='idea'>
                  💡
                </span>
                <Text size='xs' c={isDark ? 'blue.2' : 'blue.7'} fw={500}>
                  Upgrade to Pro for special discounts!
                </Text>
              </div>
            </div>
          </section>

          {/* Fish click area */}
          <section className={styles.gameFishSection}>
            <button
              type='button'
              className={styles.fishButton}
              onClick={handleClickFish}
            >
              <div className={styles.fishButtonInner}>
                <span className={styles.fishEmoji}>🐟</span>
                <div className={styles.fishHighlight} />
              </div>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 10,
                textShadow: '0 2px 8px rgba(15,23,42,0.6)',
              }}
            >
              <span>Click the fish!</span>
              <span role='img' aria-label='fish'>
                🐟
              </span>
            </div>

            <div className={styles.currentScoreCard}>
              <Text
                size='xs'
                fw={600}
                c='white'
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                Current Score
              </Text>
              <Text size='xl' fw={800} c='white'>
                {currentScore}
              </Text>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
