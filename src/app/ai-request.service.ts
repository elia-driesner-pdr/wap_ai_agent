import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRequestService {
  constructor(private http: HttpClient) {}
  
  webhookUrl : string = 'https://pdr-team.app.n8n.cloud/webhook-test/5ebb2cc1-b0b0-4a90-b9bc-060342171ece';
  contextId : number | undefined;

  public sendChat(prompt : string) : Observable<any> {
    const body = { 
      "prompt" : prompt,
      "contextId": this.contextId
    };

    return this.http.post(this.webhookUrl, body, {}).pipe(
      catchError(error => {
        return of({error: true, message: 'Fehler beim Senden' });
      })
    );
  }

  public setContextId(id : number) {
    this.contextId = id;
  }
}