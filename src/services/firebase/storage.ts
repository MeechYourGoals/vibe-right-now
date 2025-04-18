
import { storage } from './index';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  UploadMetadata,
  getMetadata,
  updateMetadata
} from 'firebase/storage';

/**
 * Firebase Storage service
 */
export class FirebaseStorageService {
  /**
   * Upload a file to Firebase Storage
   * @param file The file to upload
   * @param path The path in storage
   * @param metadata Optional metadata
   * @returns The download URL
   */
  static async uploadFile(
    file: File | Blob, 
    path: string, 
    metadata?: UploadMetadata
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Get a download URL for a file
   * @param path The path in storage
   * @returns The download URL
   */
  static async getFileURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }

  /**
   * Delete a file from storage
   * @param path The path in storage
   */
  static async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * List all files in a directory
   * @param path The directory path
   * @returns Array of file references
   */
  static async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      
      // Get download URLs for all items
      const urls = await Promise.all(
        result.items.map(itemRef => getDownloadURL(itemRef))
      );
      
      return urls;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  /**
   * Get metadata for a file
   * @param path The file path
   * @returns The file metadata
   */
  static async getFileMetadata(path: string): Promise<any> {
    try {
      const storageRef = ref(storage, path);
      return await getMetadata(storageRef);
    } catch (error) {
      console.error('Error getting file metadata:', error);
      throw error;
    }
  }

  /**
   * Update metadata for a file
   * @param path The file path
   * @param metadata The new metadata
   */
  static async updateFileMetadata(path: string, metadata: any): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await updateMetadata(storageRef, metadata);
    } catch (error) {
      console.error('Error updating file metadata:', error);
      throw error;
    }
  }

  /**
   * Upload a base64 image to storage
   * @param base64Data The base64 image data
   * @param path The path in storage
   * @param metadata Optional metadata
   * @returns The download URL
   */
  static async uploadBase64Image(
    base64Data: string,
    path: string,
    metadata?: UploadMetadata
  ): Promise<string> {
    try {
      // Convert base64 to blob
      const byteString = atob(base64Data.split(',')[1]);
      const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      
      // Upload blob
      return await this.uploadFile(blob, path, metadata);
    } catch (error) {
      console.error('Error uploading base64 image:', error);
      throw error;
    }
  }
}

// Export Firebase Storage service
export default FirebaseStorageService;
