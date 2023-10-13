export interface ProjectCreationRequest {
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  groupMembers: string[];
}

export interface BankDetailRequest {
  accountNumber: string;
  code: string;
  accountHolder: string;
  projectId: string;
}
