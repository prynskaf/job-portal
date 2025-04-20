/** 
 * @param config Configuration object
 * @param config.cloud_name Your cloudinary cloud name
 * @param config.api_key Your API key (should be stored in environment variables)
 * @param config.api_secret Your API secret (should be stored in environment variables)
 */

declare module 'cloudinary' {
    export const v2: {
      config: (config: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
      }) => void;
      uploader: {
        upload: (file: File, options?: Record<string, unknown>) => Promise<CloudinaryUploadResponse>;
      };
    };

    interface CloudinaryUploadResponse {
      public_id: string;
      secure_url: string;
      url: string;
      asset_id: string;
      version_id: string;
      width: number;
      height: number;
      format: string;
    }
  }
  