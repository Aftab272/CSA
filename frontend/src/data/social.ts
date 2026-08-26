export type SocialPlatform = {
  name: string;
  url: string;
  followers: string;
  color: string;
  iconName: string;
};

export const socialPlatforms: SocialPlatform[] = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61590618728298', followers: 'Follow for Updates', color: 'text-[#1877F2]', iconName: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/creativestackagency', followers: 'Follow for Latest Work', color: 'text-[#E4405F]', iconName: 'instagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aftab-akram-3a297b407?utm_source=share_via&utm_content=profile&utm_medium=member_android', followers: 'Connect Professionally', color: 'text-[#0A66C2]', iconName: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/Aftab272', followers: 'Check Our Code', color: 'text-[#181717] dark:text-white', iconName: 'github' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCjXYUc0PR0s-kIZKFR1MFiw', followers: 'Subscribe for Tutorials', color: 'text-[#FF0000]', iconName: 'youtube' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@creativestackagency?_r=1&_t=ZS-9876tXjlbZF', followers: 'Follow for Trends', color: 'text-[#000000] dark:text-[#00F2EA]', iconName: 'tiktok' },
  { name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbCVtZ7Id7nSBLYXOQ1c', followers: 'Join Our Channel', color: 'text-[#25D366]', iconName: 'whatsapp' },
  { name: 'Fiverr', url: '#', followers: 'Profile Available', color: 'text-[#1DBF73]', iconName: 'fiverr' },
  { name: 'Upwork', url: '#', followers: 'Profile Available', color: 'text-[#14A800]', iconName: 'upwork' },
  { name: 'Telegram', url: '#', followers: 'Profile Available', color: 'text-[#24A1DE]', iconName: 'telegram' },
  { name: 'Botim', url: 'tel:+923027434569', followers: 'Available on Botim', color: 'text-[#00c853]', iconName: 'botim' },
];
