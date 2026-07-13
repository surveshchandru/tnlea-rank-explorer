export type Community = 'OC' | 'BC' | 'BCM' | 'MBC/DNC' | 'SC' | 'SCA' | 'ST';

export interface TNLEASubmission {
  id?: string;
  userId: string;
  admissionYear: number;
  diplomaPercentage: number;
  generalRank: number;
  community: Community;
  communityRank: number;
  createdAt: any;
  updatedAt: any;
}
