import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder ,FormGroup , FormControl , Validator, Validators } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from "ngx-editor";
import  firebase from "firebase/app";
import '@firebase/firestore';
import 'firebase/auth';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title:string="";
  content:string="";
  editor:Editor=new Editor;
  editorConfig:any
  @Output('postCreated') postCreated=new EventEmitter();

  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  constructor(private tosterService: ToastrService) {
    this.editorConfig={
      "editable":true
    }
    this.content="";
    // this.tosterService.success("create blog")
  }


  createPost(){

    // firebase.firestore().settings({
    //   timestampsInsnapshots:true
    // });
    if(this.content.length<20)
    alert("Please Post a valid Blog")
    else{
      firebase.firestore().collection("posts").add({
        title:this.title,
        content:this.content,
        owner:firebase.auth().currentUser?.uid,
        createed:firebase.firestore.FieldValue.serverTimestamp()
      }).then((data)=>{
        this.postCreated.emit();
        this.tosterService.success("Blog Created Successfully.")
        console.log(data);
      },err=>{
        console.log(err);
        this.tosterService.error(err)
      })
  }
  }








  ngOnInit(): void {
  }

}
