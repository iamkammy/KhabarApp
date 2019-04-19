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
commentDiv=false;
comments=[];
	mArticles: Array<any>;
	mSources: Array<any>;

	like = 12;
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
	
	commentFun(flag,i){
		if(flag === true){
			this.commentDiv = false;
		}
		else{
			this.commentDiv = true;
		}
	}

	commentSaved(e){
		 console.log(e.target.value);

		this.comments.push(e.target.value);
		e.target.value= "";
		
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


	ngOnInit() {
		//load articles
		
		this.loadAticles();
	




		//load news sources
		// console.log(this.mArticles);

		this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);



		// this.getRandom();
	}
	loadAticles() {
		this.newsapi.initArticles().subscribe(data => {
		this.mArticles = data['articles'];
		//  console.log(this.mArticles);
			// console.log("data" + data);

			if (data)
				this.likeKey();
		});

	}


	likeKey() {

		this.mArticles.forEach((i) => {
			i['like'] = 0;
			i['flag'] = false;
			console.log(this.mArticles);

		}
		);
	}




	searchArticles(source) {
		// console.log("selected source is: "+source);

		this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
	}


}
