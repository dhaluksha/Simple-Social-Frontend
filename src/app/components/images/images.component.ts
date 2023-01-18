import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { io } from 'socket.io-client';

const URL = 'http://localhost:5000/api/chatapp/upload-image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true,
  });
  selectedFile: any;
  user: any;
  images = [];
  socket: any;

  constructor(
    private userService: UsersService,
    private tokenService: TokenService
  ) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }
  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe(
      (data) => {
        console.log(data);

        this.images = data.result.images;
      },
      (err) => console.log(err)
    );
  }

  OnFileSelected(event) {
    const file: File = event[0];

    this.ReadAsBase64(file)
      .then((result) => {
        this.selectedFile = result;
      })
      .catch((err) => console.log(err));
  }
  Upload() {
    // console.log(this.selectedFile);
    if (this.selectedFile) {
      this.userService.AddImage(this.selectedFile).subscribe(
        (data) => {
          this.socket.emit('refresh', {});
          const filePath = <HTMLInputElement>(
            document.getElementById('filePath')
          );
          filePath.value = '';
        },
        (err) => console.log(err)
      );
    }
  }

  SetProfileImage(image) {
    this.userService.SetDefaultImage(image.imgId, image.imgVersion).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  }
}
