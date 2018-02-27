export interface FunctionalAssessment {
  id: number;
  customerId?:number;
  ProcesGroupL1?: string;
  Module?: string;
  ProcessScenarioL2?: string;
  ProcessComponentL3?: string;
  ProcessComponentL4?: string;
  ProcessComponentL5?: string;
  MandatoryProcess?: string;
  S4HANAImpact?: string;
  DefaultStatus?: string;
  QueryID?: string;
  RuleSet?: string;
  FinalStatus?: string;
  OverviewChangeSAPS4HANA?: string;
  ChangeImpactBasedOnSystemAnalysis?: string;
  ProcessGroup?: string;
  ImpactedTCode?: string;
  Observation?:string;
}
