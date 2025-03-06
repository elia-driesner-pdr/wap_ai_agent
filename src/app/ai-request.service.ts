import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRequestService {
  constructor(private http: HttpClient) {}

  webhookUrl : string = 'https://eliad.app.n8n.cloud/webhook-test/312b463b-02e5-483c-a4c3-b8274beb4601';

  public sendChat(prompt : string) : Observable<any> {
    const body = { prompt };

    return this.http.post(this.webhookUrl, body, {});
  }
}