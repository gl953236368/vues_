(function (window) {
	'use strict';
	//定义数组
	let vm = new Vue({
		el : '#apps',
		data:{
			fruits : [],
			editstate : null,
			filterStat : 'all'
		},
		mounted:function(){
			var content = window.localStorage.getItem('content');

			if (!content || typeof(content)=="undefined") {
				console.log(1);
				content={"id":"0"}; 
				content = JSON.stringify(content)
			}
			var _this = this;
		    $.ajax({
		    	url:'http://localhost:3000/123',
            	type:'post',
            	data:content,
            	dataType:'JSON',
		        success:function(data){
		        	console.log(data);
		            _this.fruits = data.data;
		            window.localStorage.setItem('content',JSON.stringify(_this.fruits));
		        },
		        error:function(){
		        console.log('error');
		        }
        })
			
		},
		computed : {
			//过滤
			fruitsFilter : function () {
				switch(this.filterStat){
					case 'active' : 
					return this.fruits.filter(item => item.checkstate == false)
					break;
					case 'completed' :
					return this.fruits.filter(item => item.checkstate == true)
					break;
					default :
					return this.fruits
					break;
				}
			},
			// getDb: function() {
			// 	console.log("Db Connection:");
			// 	var con = new ActiveXObject("ADODB.Connection");
			// 	con.ConnectionString = "DRIVER={MySQL ODBC 5.1 Driver};OPTION=3;SERVER=127.0.0.1;User ID=root;Password=1q2w3e4r;Database=test_vue;Port=3306";  
			// 	con.open;
			// 	var rs = new ActiveXObject("ADODB.Recordset");
			// 	rs.open("select * from vue_", con);
			// 	while (!rs.eof) {
			// 	var u = rs.Fields("name");
			// 	console.log(u);
			// 	rs.moveNext;
			// 	}
			// 	rs.close();
			// 	rs = null; 
			// 	con.close();
			// 	con = null;
			// },
			itemleft : function () {
				console.log(this.fruitsFilter.length,this.fruits)
				return 5;
			},
			toggleAllStat : function () {
				return this.fruits.filter(item => item.checkstate === false);
			}
		},
		methods:{
			// getdata:function(){
			// 	const url = 'http://localhost:3000/123'
			// 	this.$http.get(url).then(
   //              response => {
   //                  const result = response.data.items[0];
   //                  console.log(result)
   //                  this.repositoryUrl = result.html_url;
   //                  this.repositoryName = result.name;
   //              },

   //              response => {
   //                  alert('请求失败');
   //              }
   //          );
			// },
		toggleall:function (event) {
			const check = event.target.checked;
			this.fruits.forEach(item => {
					item.checkstate = check;
			});
			window.localStorage.setItem('content',JSON.stringify(this.fruits));
		},
 
		addTodo : function (event){
			const valueStr = event.target.value;
			var lastFruits = this.fruits[this.fruits.length-1];
			var idStr = lastFruits ? Number(lastFruits.id)+1 : 1;
			this.fruits.push({
					id : String(idStr),
					name : valueStr,
					checkstate : false,
					flag : "1" //添加
				})
			this.$refs.currentinput.value='';
			window.localStorage.setItem('content',JSON.stringify(this.fruits));
			//window.localStorage.setItem("content",JSON.stringify(this.todoLists))
			//event.target.value = '';
		},
 
		removeItem : function (index) {
			let _fruits = JSON.parse(JSON.stringify(this.fruits));
			 _fruits[index].flag = "2"; //删除单个
			console.log(_fruits,index,_fruits[index]);
			window.localStorage.setItem('content',JSON.stringify(_fruits));
			this.fruits.splice(index,1);
			
		},
 
		removeALLDone : function () {
			var _this = this;
			_this.fruits = _this.fruits.filter(item => item.checkstate);
			_this.fruits.forEach(Item => Item.flag="2"); //删除全部
			window.localStorage.setItem('content',JSON.stringify(_this.fruits));
			this.fruits =  this.fruits.filter(item => !item.checkstate);
		},
 
		editInput:function () {
			console.log('editInput');
		},
 
		editSave : function (item,event) {
				this.editstate = null;
				console.log(item.name);
				window.localStorage.setItem('content',JSON.stringify(this.fruits));
		}
		},
		//v-dblfocus 自定义focus
		directives : {
			focuz : {
				inserted : function (el) {
					el.focus();
				}
			},
			dblfocus : {
				update : function (el,binding) {
					console.log('b',binding.value);
					if(binding.value){
						el.focus();
						$.ajax({
						url:'http://localhost:3000/123',
            			type:'post',
            			data:JSON.stringify(binding.value),
            			dataType:'JSON',
				        success:function(data){
				        	console.log('update over');
				        },
				        error:function(){
				        console.log('error update');
				        }
        			})
					}
					
					console.log(el);
					// window.localStorage.setItem('upateContent',JSON.stringify(binding.value));
				}
			}
		}
	})
 	
 	//当锚部分发生变化时执行
	window.onhashchange = function () {
		const filterStat = location.hash.replace("#/","");
		console.log(filterStat);
		vm.filterStat = filterStat;
	}



})(window);
