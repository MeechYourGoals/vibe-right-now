
import { db } from './index';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';

/**
 * Firebase Firestore service for data operations
 */
export class FirestoreService {
  /**
   * Create a document in a collection
   * @param collectionName The collection name
   * @param data The document data
   * @returns The document ID
   */
  static async createDocument(collectionName: string, data: any): Promise<string> {
    try {
      // Add timestamp to track when document was created
      const dataWithTimestamp = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Update a document in a collection
   * @param collectionName The collection name
   * @param documentId The document ID
   * @param data The document data
   */
  static async updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    try {
      // Add updated timestamp
      const dataWithTimestamp = {
        ...data,
        updatedAt: Timestamp.now()
      };
      
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, dataWithTimestamp);
    } catch (error) {
      console.error(`Error updating document ${documentId} in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document from a collection
   * @param collectionName The collection name
   * @param documentId The document ID
   */
  static async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${documentId} from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get a document from a collection
   * @param collectionName The collection name
   * @param documentId The document ID
   * @returns The document data or null if not found
   */
  static async getDocument(collectionName: string, documentId: string): Promise<any | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${documentId} from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Query documents from a collection
   * @param collectionName The collection name
   * @param constraints Query constraints (where, orderBy, limit)
   * @returns Array of document data
   */
  static async queryDocuments(
    collectionName: string, 
    constraints: QueryConstraint[] = []
  ): Promise<any[]> {
    try {
      // Create query with constraints
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      
      // Map documents to array with ID included
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return documents;
    } catch (error) {
      console.error(`Error querying documents from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Save conversation history
   * @param userId User ID
   * @param messages Conversation messages
   */
  static async saveConversation(userId: string, messages: any[]): Promise<string> {
    try {
      // Create a conversation document
      const conversationData = {
        userId,
        messages,
        timestamp: Timestamp.now()
      };
      
      const conversationId = await this.createDocument('conversations', conversationData);
      return conversationId;
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }

  /**
   * Get conversation history for a user
   * @param userId User ID
   * @param limitCount Limit number of conversations
   */
  static async getUserConversations(userId: string, limitCount: number = 10): Promise<any[]> {
    try {
      const constraints = [
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      ];
      
      return await this.queryDocuments('conversations', constraints);
    } catch (error) {
      console.error('Error getting user conversations:', error);
      throw error;
    }
  }
}

// Export query builders for convenience
export { where, orderBy, limit } from 'firebase/firestore';
