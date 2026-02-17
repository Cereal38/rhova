'use client';

import { useState } from 'react';

export default function PlayerCounter() {
  const [playerCount, setPlayerCount] = useState(0);

  return <p>{playerCount} players ready!</p>;
}
