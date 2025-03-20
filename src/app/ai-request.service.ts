import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRequestService {
  constructor(private http: HttpClient) {}

  webhookUrl : string = 'https://pdr-team.app.n8n.cloud/webhook/5ebb2cc1-b0b0-4a90-b9bc-060342171ece';

  public sendChat(prompt : string) : Observable<any> {
    const body = { prompt };

    return this.http.post(this.webhookUrl, body, {});
  }
}