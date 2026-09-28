/**
 * BEEMIM IMAGE GENERATION SERVICE
 * ===============================
 * Generates stunning AI images using high-performance models (Flux / Pollinations).
 * No costly subscription or extra API keys required.
 */

export interface ImageGenOptions {
  prompt: string;
  width?: number;
  height?: number;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:2';
  style?: string;
  enhancePrompt?: boolean;
}

export class ImageGenService {
  static generateImageUrl(options: ImageGenOptions): { imageUrl: string; prompt: string } {
    let finalPrompt = options.prompt.trim();

    // Style injection if requested
    if (options.style && options.style !== 'natural') {
      finalPrompt = `${finalPrompt}, in ${options.style} style, 8k resolution, highly detailed, professional lighting`;
    }

    // Determine dimensions based on aspect ratio
    let width = options.width || 1024;
    let height = options.height || 1024;

    switch (options.aspectRatio) {
      case '16:9':
        width = 1280;
        height = 720;
        break;
      case '9:16':
        width = 720;
        height = 1280;
        break;
      case '4:3':
        width = 1024;
        height = 768;
        break;
      case '3:2':
        width = 1080;
        height = 720;
        break;
      case '1:1':
      default:
        width = 1024;
        height = 1024;
        break;
    }

    const encodedPrompt = encodeURIComponent(finalPrompt);
    // Pollinations AI endpoint with Flux model for photorealistic/creative quality
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

    return {
      imageUrl,
      prompt: finalPrompt,
    };
  }
}
