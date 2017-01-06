(function(){
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy=this;
        
        toBuy.toBuyList = ShoppingListCheckOffService.fetchToBuyItems() ;
        
        toBuy.chechOut = function(itemIndex){
            try{
                ShoppingListCheckOffService.checkOutItems(itemIndex);
            }catch(error){
                toBuy.errorMsg = error.message;
            }
        };
        
    }
    
    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var alredayBought= this;
                
        alredayBought.boughtList = ShoppingListCheckOffService.fetchBoughtItems();
        
    }
    
    function ShoppingListCheckOffService(){
        
        var service= this;
        
        var toBuyItems = [
            {
                name: "cookies",
                quanity: 10
            },
            {
                name: "pepsi",
                quanity: 10
            },
            {
                name: "apple",
                quanity: 10
            },
            {
                name: "cigars",
                quanity: 10
            },
            {
                name: "tomato",
                quanity: 10
            }
        ];
        var boughtItems = [];
        
        service.fetchToBuyItems = function(){
            return toBuyItems;
        };
        
        service.fetchBoughtItems= function(){
            return boughtItems;
        };
        
        service.checkOutItems = function(index){
            // need to add mentioned index item from tobuyitemsList to boughtItems list
            boughtItems.push(toBuyItems[index])
            // need to remove mentioned indexed item from toBuyItems list
            toBuyItems.splice(index, 1);
            // need to send validation if buyItemsList is empty
            if(toBuyItems.length == 0)
                throw new Error("Everything is bought!");
        };
        
        
    }
    
    
})();