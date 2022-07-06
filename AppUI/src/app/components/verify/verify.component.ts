import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verifyMessage!: String;
  constructor( private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const uniqueString = this.route.snapshot.paramMap.get('uniqueString');
    this.userService.verify(userId,uniqueString).subscribe({
      next: res => {
        this.verifyMessage = res.message;
      },
      error: err => {
        if(err.status === 401){
          this.verifyMessage = err.error.message;
        }else if(err.status === 404){
          this.verifyMessage = err.error.message;
        }else{
          this.router.navigate(['']);
        }
      }
    })
  }

}
