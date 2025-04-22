'use client';

import { useEffect, useState } from 'react';

export default function SignupProgress() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching signup count:', error);
      }
    };

    // Fetch immediately
    fetchCount();

    // Then fetch every 30 seconds
    const interval = setInterval(fetchCount, 30000);

    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  return (
    <div className="bg-sand/60 border border-sand p-4 rounded-md backdrop-blur-md text-dark-brown mb-4">
      <p className="text-lg">
        <span className="font-bold">{count}</span> people have signed up so far!
      </p>
    </div>
  );
} 