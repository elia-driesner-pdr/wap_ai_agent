import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRequestService {
  constructor(private http: HttpClient) {}
  
  webhookUrl : string = 'https://pdr-team.app.n8n.cloud/webhook-test/69011845-b520-42ed-a666-506e08d23516';
  contextId : string | null = null;

  private sendRequest(body: any): Observable<any> {
    return this.http.post(this.webhookUrl, body, {}).pipe(
      catchError(error => {
        return of({error: true, message: 'Fehler beim Senden' });
      })
    );
  }

  public sendChat(prompt : string) : Observable<any> {
    const body = { 
      "prompt" : prompt,
      "contextId": "CID47306599",
      "requestOrigin": "message"
    };

    return this.sendRequest(body)
  }

  public submitElement(data: any) : Observable<any> {
    const body = { 
      "data" : data.content,
      "contextId": "CID47306599",
      "requestOrigin": data.contentType
    };
    console.log(body);

    return this.sendRequest(body)
  }

  public authenticate(data: any) : Observable<any> {
    const body = { 
      "data" : data,
      "contextId": "CID47306599",
      "requestOrigin": "auth"
    };

    return this.sendRequest(body)
  }

  public setContextId(id : string | null) {
    this.contextId = id;
  }
}