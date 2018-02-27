import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Customer} from "../../models/customer";
import {FunctionalAssessment} from "../../models/functional-assessment";

@Injectable()
export class CustomerService {
  url = environment.serverUrl + 'api/customers';
  urlFunctionalAssessment = environment.serverUrl + 'api/functionalAssessments';


  constructor(private http: HttpClient) {
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get(this.url + '/getAll')
      .map((response: { status: string, records: Customer[] }) => {
        return response.records;
      });
  }

  getAllFunctionalAssessments(): Observable<FunctionalAssessment[]> {
    return this.http.get(this.urlFunctionalAssessment + '/getAll')
      .map((response: { status: string, response }) => {

        const funcAssessments: FunctionalAssessment[] = [];
        response['records'].forEach((rec) => {
          funcAssessments.push({
            id: rec['id'],
            customerId: rec['customer_id'],
            ProcesGroupL1: rec['process_group_l1'],
            Module: rec['module'],
            ProcessScenarioL2: rec['process_scenario_l2'],
            ProcessComponentL3: rec['module'],
            ProcessComponentL4: rec['process_component_l3'],
            ProcessComponentL5: rec['process_component_l4'],
            S4HANAImpact: rec['s4hana_impact'],
            DefaultStatus: rec['default_status'],
            FinalStatus: rec['final_status'],
            OverviewChangeSAPS4HANA: rec['overview_change'],
            ChangeImpactBasedOnSystemAnalysis: rec['change_impact_system_analysis'],
            ProcessGroup: rec['process_group'],
            ImpactedTCode: rec['impacted_tcode']
          });
        });
        return funcAssessments;
      });
  }

}
