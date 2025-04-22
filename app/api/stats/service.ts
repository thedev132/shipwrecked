import { getRecords } from '@/lib/airtable';

let lastCount = 0;
let isRunning = false;

export async function startStatsService() {
  if (isRunning) return;
  isRunning = true;

  const updateStats = async () => {
    try {
      console.log('Fetching RSVP count...');
      const records = await getRecords("RSVPs", {
        filterByFormula: "",
        sort: [],
        maxRecords: 1,
        count: true
      });
      
      const currentCount = records.length;
      if (currentCount !== lastCount) {
        console.log(`RSVP count changed: ${lastCount} -> ${currentCount}`);
        lastCount = currentCount;
      } else {
        console.log(`RSVP count remains at: ${currentCount}`);
      }
    } catch (error) {
      console.error('Error in stats service:', error);
    }
  };

  // Run immediately on startup
  await updateStats();

  // Then run every 15 seconds
  setInterval(updateStats, 15000);
}

// Start the service when this module is imported
startStatsService().catch(console.error); 