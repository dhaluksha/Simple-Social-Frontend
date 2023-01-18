import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:5000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  SendMessage(senderId: any, receiverId: any, receiverName: any, message: string): Observable<any>{
    return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    });
  }
  GetAllMessage(senderId, receiverId): Observable<any>{
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
  }
  MarkMessages(sender, receiver): Observable<any>{
    return this.http.get(`${BASEURL}/receiver-messages/${sender}/${receiver}`);
  }
}
