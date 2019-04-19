import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
flag:boolean= true;

	mArticles: Array<any>;
	mSources: Array<any>;

	currentLike;
	constructor(private newsapi: NewsApiService) {
		console.log('app component constructor called');
	}

	//  getRandom(){
	// 	this.randomValue;
	// 	setInterval(()=>{
	// 		this.randomValue = (Math.floor( (Math.random() * 100) + 1 ));
	// 		console.log('iiiiiiiiiii',this.randomValue);
	// 	},2000);
	//  }
	
	commentFun(i){
		console.log(i);
		
		if(this.mArticles[i].commentDiv == true){
			this.mArticles[i].commentDiv = false;
		}
		else{
			this.mArticles[i].commentDiv = true;
		}
	}

	plus(i) {
		if(this.mArticles[i].flag===false){

		this.mArticles[i].like +=1;
        this.mArticles[i].flag=true;
		}
		else  {
			this.mArticles[i].like -=1;
			this.mArticles[i].flag=false;
		}
	}

	commentSaved(e,i){
		console.log(e.target.value);

	   this.mArticles[i].comments.push(e.target.value);
	   e.target.value= "";
   }

	ngOnInit() {

		this.loadAticles();
		this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);
	
	}
	loadAticles() {
		this.newsapi.initArticles().subscribe(data => {
		this.mArticles = data['articles'];
		
			if (data)
				this.likeKey();
		});

	}


	likeKey() {
		this.mArticles.forEach((i) => {
			i['like'] = 0;
			i['flag'] = false;
			i['commentDiv'] = 'false';
			i['comments'] = [];
			console.log(this.mArticles);
		}
		);
	}

	searchArticles(source) {
	
		this.newsapi.getArticlesByID(source).subscribe(data => {
			
			this.mArticles = data['articles'];
			if(data){
				this.likeKey();
			}
			
		});
	}

	about(){
	
		window.open('https://github.com/kamgirgit', '_blank')
	}

	// search(value:String){
	// this.mArticles.forEach(function(article){
	// 	if(article.content.toLowerCase().indexOf(value.toLowerCase()) != -1){
	// 		console.log(article);
	// 	}
	// })
	// }


}
