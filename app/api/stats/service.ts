import { getRecordCount } from '@/lib/airtable';
import fs from 'fs';
import path from 'path';

// Global variable to store the count
let globalCount = 0;

// Function to update the count file
function updateCountFile(count: number) {
  const filePath = path.join(process.cwd(), 'app/api/stats/count.json');
  fs.writeFileSync(filePath, JSON.stringify({ count }, null, 2));
}

export class StatsService {
  private static instance: StatsService | null = null;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): StatsService {
    if (!StatsService.instance) {
      console.log("created new stats service!");
      StatsService.instance = new StatsService();
    }
    return StatsService.instance;
  }

  public getLastCount(): number {
    console.log('Getting lastCount:', globalCount);
    return globalCount;
  }

  private async updateStats() {
    try {
      console.log('Fetching RSVP count...');
      const currentCount = await getRecordCount("RSVPs");
      
      if (currentCount !== globalCount) {
        console.log(`RSVP count changed: ${globalCount} -> ${currentCount}`);
        globalCount = currentCount;
        updateCountFile(currentCount);
      } else {
        console.log(`RSVP count remains at: ${currentCount}`);
      }
    } catch (error) {
      console.error('Error in stats service:', error);
    }
  }

  public async start() {
    if (this.isRunning) {
      console.log('Stats service is already running');
      return;
    }

    console.log('Starting stats service...');
    this.isRunning = true;

    // Run immediately and wait for it to complete
    await this.updateStats();
    console.log('Initial count fetched:', globalCount);

    // Then run every 10 seconds
    this.intervalId = setInterval(() => this.updateStats(), 10000);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Stats service stopped');
  }
}

// Export a function to start the service
export async function startStatsService() {
  const service = StatsService.getInstance();
  await service.start();
}

// Export a function to stop the service
export function stopStatsService() {
  const service = StatsService.getInstance();
  service.stop();
} 