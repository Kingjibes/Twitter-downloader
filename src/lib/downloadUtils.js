import { toast } from '@/components/ui/use-toast';

const API_URL = 'https://api-aswin-sparky.koyeb.app/api/downloader/twiter?url=';

export const saveToRecentDownloads = (videoData, originalUrl, setRecentDownloads) => {
  const newDownload = {
    id: Date.now(),
    url: originalUrl,
    thumbnail: videoData.thumbnail,
    downloadedAt: new Date().toISOString(),
    hdUrl: videoData.HD,
    sdUrl: videoData.SD
  };

  setRecentDownloads(prev => {
    const updated = [newDownload, ...prev];
    const limited = updated.slice(0, 10);
    localStorage.setItem('recentDownloads', JSON.stringify(limited));
    return limited;
  });
};

export const fetchVideoData = async (videoUrl) => {
  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    if (data.status && data.data) {
      return data.data;
    } else {
      throw new Error(data.message || 'Invalid response from API');
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
    toast({
      title: "Preview Failed 😞",
      description: `Could not fetch preview for ${videoUrl}. Please check the URL.`,
      variant: "destructive",
    });
    return null;
  }
};

export const downloadVideoUtil = async (videoUrl, quality = 'HD', setRecentDownloads, videoDataToSave = null) => {
  try {
    let dataToUse = videoDataToSave;
    if (!dataToUse) {
      const fetchedData = await fetchVideoData(videoUrl);
      if (!fetchedData) return false;
      dataToUse = fetchedData;
    }
    
    const downloadUrl = quality === 'HD' ? dataToUse.HD : dataToUse.SD;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `twitter_video_${quality}_${Date.now()}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    saveToRecentDownloads(dataToUse, videoUrl, setRecentDownloads);
    
    toast({
      title: "Download Started! 🎉",
      description: `${quality} quality video download initiated successfully!`,
    });

    return true;
  } catch (error) {
    toast({
      title: "Download Failed 😞",
      description: "Please check the URL and try again. Make sure it's a valid Twitter video link!",
      variant: "destructive",
    });
    return false;
  }
};