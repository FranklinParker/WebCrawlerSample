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
        return response.records
      });
  }

  /**
   * get functional assessment records by customerId
   *
   * @param {Customer} customer
   * @returns {Observable<FunctionalAssessment[]>}
   */
  getFunctionalAssessmentsByCustomer(customer: Customer): Observable<FunctionalAssessment[]> {
    return this.http.get(this.urlFunctionalAssessment + '/getByCustomer/' + customer.id)
      .map((response: { status: string, response }) => {

        const funcAssessments: FunctionalAssessment[] = [];
        response['records'].forEach((rec) => {
          const funcAssess = this.getFunctionalAssesmentRecord(rec);
          funcAssess.customer = customer;
          funcAssessments.push(funcAssess);
        });
        return funcAssessments;
      });
  }

  /***
   * get all functional Assessment records
   *
   *
   * @returns {Observable<FunctionalAssessment[]>}
   */
  getAllFunctionalAssessments(): Observable<FunctionalAssessment[]> {
    return this.http.get(this.urlFunctionalAssessment + '/getAll')
      .map((response: { status: string, response }) => {

        const funcAssessments: FunctionalAssessment[] = [];
        response['records'].forEach((rec) => {
          const funcAssess = this.getFunctionalAssesmentRecord(rec);

          funcAssess.customer = {id: rec['customer_id']};
          funcAssessments.push(funcAssess);
        });
        return funcAssessments;
      });
  }

  /**
   * reformats FunctionalAssessment
   *
   *
   * @param dbRec
   * @returns {FunctionalAssessment}
   */
  private getFunctionalAssesmentRecord(dbRec: any): FunctionalAssessment {
    {
      const funcAssess: FunctionalAssessment = {
        id: dbRec['id'],
        ProcesGroupL1: dbRec['process_group_l1'],
        Module: dbRec['module'],
        ProcessScenarioL2: dbRec['process_scenario_l2'],
        ProcessComponentL3: dbRec['module'],
        ProcessComponentL4: dbRec['process_component_l3'],
        ProcessComponentL5: dbRec['process_component_l4'],
        S4HANAImpact: dbRec['s4hana_impact'],
        DefaultStatus: dbRec['default_status'],
        FinalStatus: dbRec['final_status'],
        OverviewChangeSAPS4HANA: dbRec['overview_change'],
        ChangeImpactBasedOnSystemAnalysis: dbRec['change_impact_system_analysis'],
        ProcessGroup: dbRec['process_group'],
        ImpactedTCode: dbRec['impacted_tcode']
      };
      return funcAssess;

    }
  }

}
