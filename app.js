/**************************** UI CONTROLLER ************************/ 


var UIController=(function(){
	var DOM={
		select:'.select',
		inputDescription:'.text_description',
		inputBtn:'.add_details',
		list:'.list',
		deleteBtn:'.item_list'
	}
	
	return{
		
		displayDate:function(){
			var date=new Date();
			var d=date.toDateString();
			document.querySelector('.date').textContent=d;
		},
		
		getinput:function(){
			return{
				priority:document.querySelector(DOM.select).value,
				description:document.querySelector(DOM.inputDescription).value
			}
		},
		
		addListItem:function(object){
			var html,newhtml;
			html='<div class="item clearfix" id="work-%id%"><div class="work__description">%indicator% %task%</div>  <div class="right clearfix"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			
			
			
			if(object.priority==='HIGH')
			{
				newhtml=html.replace('%indicator%','<ion-icon name="reorder-four"></ion-icon>');
			}
			else if(object.priority==='MEDIUM')
			{
				newhtml=html.replace('%indicator%','<ion-icon name="reorder-three-outline"></ion-icon>');
			}
			else
			{
				newhtml=html.replace('%indicator%','<ion-icon name="reorder-two-outline"></ion-icon>');
			}
			newhtml=newhtml.replace('%id%',object.id);
			newhtml=newhtml.replace('%task%',object.description);
			document.querySelector(DOM.list).insertAdjacentHTML('beforeend',newhtml);
		},
		
		
		deleteItem:function(ID){
			var el=document.getElementById(ID);
			el.parentNode.removeChild(el);
		},
		
		clearFields:function(){
			var fields,fields1;
			
			fields=document.querySelector(DOM.inputDescription);
			fields.value="";
			
			fields1=document.querySelector(DOM.list);
	
		},
		
		DOMString:function(){
			return DOM;
		}
	}
	
})();

/**************************DATA CONTROLLER**********************/

var dataController=(function(){
	
	var task=function(id,priority,description){
		this.id=id;
		this.priority=priority;
		this.description=description;
	}
	
	var data={
		dataArr:[]
	}
	
	
	return{
		addItem:function(prior,des){
			var newItem,ID;
			
			if(data.dataArr.length>0){
				ID=data.dataArr[data.dataArr.length-1].id+1;
			}
			else{
				ID=0;
			}
			newItem=new task(ID,prior,des);
			data.dataArr.push(newItem);
			return newItem;
			
		},
		deleteItem:function(ID){
			var ids,index;
			ids=data.dataArr.map(function(cur){
				return cur.id;
			});
			index=ids.indexOf(ID);
			if(index!=-1)
				{
					data.dataArr.splice(index,1);
				}
		}
	}
	
})();






/*************************** CONTROLLER *************************/


var controller=(function(UICtrl,dataCtrl){
	
	var setupEventListeners=function(){
		var DOM=UICtrl.DOMString();
		document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
		
		document.addEventListener('keypress',function(event){
			if(event.keyCode==13||event.which==13)
				ctrlAddItem();
		});
		
		document.querySelector(DOM.deleteBtn).addEventListener('click',ctrlDeleteItem)
	}
	
	var ctrlAddItem=function(){
		
		var input,newItem;
		
		input=UICtrl.getinput();
		
		if(input.description!="")
			{
				newItem=dataCtrl.addItem(input.priority,input.description);
				
				UICtrl.addListItem(newItem);
				
				UICtrl.clearFields();
			}
	}
	
	var ctrlDeleteItem=function(event){
		
		var itemID,splitID,ID;
		itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemID)
			{
				splitID=itemID.split('-');
				ID=parseInt(splitID[1]);
				dataCtrl.deleteItem(ID);
				UICtrl.deleteItem(itemID);
				
			}
		
	}
	
	return {
		init:function(){
			console.log("Application Is Started...");
			UICtrl.clearFields();
			setupEventListeners();
			
			UICtrl.displayDate();
		}
	}
	
	
})(UIController,dataController);






controller.init();