/**
 * Formats YouTube API duration (ISO 8601 format) to readable string
 * @param duration - Duration in ISO 8601 format (e.g., "PT1H30M45S")
 * @returns Formatted duration string (e.g., "1 Hour 30 Minutes")
 */
export const formatYouTubeDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "Unknown Duration";
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    const parts: string[] = [];
    
    if (hours) parts.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
    if (minutes) parts.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);
    if (seconds && !hours && !minutes) parts.push(`${seconds} Second${seconds > 1 ? "s" : ""}`);
    
    return parts.length > 0 ? parts.join(" ") : "0 Minutes";
  };
  