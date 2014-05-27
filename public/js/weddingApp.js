/*
 * Angular App used primarily for the Accomdation table
 */
var weddingApp = angular.module('weddingApp',[]);



weddingApp.controller('weddingScreenCtrl',['$scope','$filter',function($scope,$filter) {
	//Photo gallery removed
	/*	$scope.photos=[];
		$scope.numPics=0;
		
		
		 facebookService.getPhotosTimeline().then(function(data) {
        $scope.photoData = data.data;
         console.log($scope.photoData);
       
        $scope.numPics=$scope.numPics+$scope.photoData.length;
       for (var i=0;i<$scope.photoData.length;i++){
        
        		
        			$scope.photos.push({src: $scope.photoData[i].source,desc:'Image '+i})
        	
        
        	
        }
        // $scope.photos =[{src: $scope.photoData.data[0].images[0].source, desc: 'Image 01'}];
        console.log(angular.toJson($scope.photos,true));
    });
    
     facebookService.getPhotosMobile().then(function(data) {
        $scope.photoData = data.data;
         console.log($scope.photoData);
        
        $scope.numPics=$scope.numPics+$scope.photoData.length;
       for (var i=0;i<$scope.photoData.length;i++){
        
        		
        			$scope.photos.push({src: $scope.photoData[i].source,desc:'Image '+i})
        	
        
        	
        }
        // $scope.photos =[{src: $scope.photoData.data[0].images[0].source, desc: 'Image 01'}];
        console.log(angular.toJson($scope.photos,true));
    });*/
   
    





		
		/*********************************************************************************************************************************************************/

        /************************************-------------------------------------------DATA-------------------------------------------**************************************************************/

       //static data - accommodation list

        $scope.accomListAll =[

            {type:'Hotel',name:'Dunmore house Hotel',phoneno:'+353 23 88 33352',website:'http://www.dunmorehousehotel.ie'},
            {type:'Hotel',name:'Quality Hotel',phoneno:'+353 23 88 36400',website:'http://www.qualityclonakiltyhotel.com'},
            {type:'Hotel',name:'O Donovans Hotel',phoneno:'+353 23 88 33250',website:'http://www.odonovanshotel.com/'},
            {type:'Hotel',name:'Emmet Hotel',phoneno:'+353 23 88 33394',website:'http://www.emmethotel.com/'},
            {type:'Hotel',name:'Inchydoney Lodge & Spa',phoneno:'+353 23 88 33143',website:'http://www.inchydoneyisland.com/'},
			{type:'Hotel',name:'Fernhill House Hotel',phoneno:'+353 23 88 33258',website:'http://www.fernhillhousehotel.com/'},
			{type:'Hotel',name:'Clonakilty Hotel',phoneno:'+353 23 88 58634',website:'http://www.theclonakilty.com/'},
			{type:'Bed & Breakfeast',name:'Clonakilty Town House',phoneno:'+353 23 88 35533',website:'http://clonakiltytownhouse.com/'},
			{type:'Bed & Breakfeast',name:'“Macliam Lodge” ',phoneno:'+353 23 88 35195',website:'http://macliamlodge.com/'},
			{type:'Bed & Breakfeast',name:'Mrs Mary Peppard “Westbourne”',phoneno:'+353 23 88 34034',website:'none available'},
			{type:'Bed & Breakfeast',name:'Mrs Angela O’Driscoll “Aisling Heights” ',phoneno:'+353 23 88 33491',website:'https://www.dirl.com/cork/clonakilty/aisling-heights.htm'},
			{type:'Bed & Breakfeast',name:'Ms Margaret Savage “Mountain Lodge”',phoneno:'+353 23 88 57260',website:'none available'},
			{type:'Bed & Breakfeast',name:'Mrs Noreen O’Driscoll “Bay view”',phoneno:'+353 23 88 33539',website:'http://www.bayviewclonakilty.com/'},
			{type:'Bed & Breakfeast',name:'Mrs Teresa Lehane “Tudar Lodge”',phoneno:'+353 23 88 33046',website:'http://www.tudorlodgecork.com/'},
			{type:'Bed & Breakfeast',name:'An Sugan B&B ',phoneno:'+353 23 88 33719',website:'http://www.ansugan.com/'},
			{type:'Bed & Breakfeast',name:'Mrs Eileen Clancy “Sea Breeze”',phoneno:'+353 23 88 34427',website:'http://www.seabreezeclon.com'},
			{type:'Bed & Breakfeast',name:'Mrs Chrissy O’Brien “Melrose”',phoneno:'+353 23 88 33956',website:'http://www.melrosewestcork.com/'},
			{type:'Bed & Breakfeast',name:'Mrs Maureen Callanan “Springfield House”',phoneno:'+353 23 88 40622',website:'http://www.springfieldhousebandb.com/'},
			{type:'Bed & Breakfeast',name:'Mrs Jo Callnan “An Goran Coir”',phoneno:'+353 23 88 48236',website:'http://www.angarrancoir.com/'},
			{type:'Bed & Breakfeast',name:'Cáit Palmer “Kilgarriffe Heights',phoneno:'+353 23 88 34375',website:'http://www.kilgarriffeheights.com/'},
			{type:'Bed & Breakfeast',name:'Nora O’Regan “Ballinscarthy”',phoneno:'+353 23 88 39268',website:'none available'},
			{type:'Bed & Breakfeast',name:'Duvane Farm',phoneno:'+353 23 88 33129',website:'http://www.duvanefarmhouse.com/'},
			{type:'Bed & Breakfeast',name:'Clona Holiday Rentals',phoneno:'+353 23 88 35009',website:'http://www.clonamarketing.com/index.php'}
        ];

       
        /*************************************************************************************************************************************/
        
       
        
         $scope.currentPage = 1;
        $scope.currentDetailPage = 1;
        $scope.numPerPage = 7;
        //Accommodation List
        $scope.accomList=[];
        //Filter
        $scope.accomFilteredList=[];
        $scope.searchList='';
        //clear Grid
        $scope.clearListGrid =false;
        
        
        
        
     
        
      

        //total number of pages for accommodation list
        $scope.numPagesTot = function () {

            if ($scope.accomFilteredList.length > 0){

                return Math.ceil($scope.accomFilteredList.length / $scope.numPerPage);

            }else{
                if ($scope.clearListGrid){

                }   else{
                    return Math.ceil($scope.accomListAll.length / $scope.numPerPage);
                }
            }

        };

        



        //check if search term present in search data
        $scope.itemMatch = function (searchData,searchTerm){

            if (angular.lowercase(searchData).indexOf(angular.lowercase(searchTerm)) !== -1){

                return true;

            }

            return false;
        }

        //search the accomist
        $scope.search = function () {

            var matched=false;
            var searchTerms=$scope.searchList.split(' ');
            var matchCount=0;
            $scope.accomFilteredList = $filter('filter')($scope.accomListAll, function (item) {

                for(i=0;i<searchTerms.length;i++)
                {

                    for(var attr in item) {

                        if ($scope.itemMatch(item[attr],searchTerms[i])){

                            matched=true;
                            matchCount++;
                            break;
                        }

                        else{

                            matched=false;

                        }
                    }
                }
                return matched;
            });
            if (matchCount===0)  {

                $scope.clearListGrid=true;
            } else{

                $scope.clearListGrid=false;
            }
            $scope.updateList();


        }
        
        //update accom list grid
        $scope.updateList = function(){


            if ($scope.accomFilteredList.length>0){

                $scope.accomList=[];

                $scope.accomList=$scope.accomFilteredList;

                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                $scope.accomList = $scope.accomFilteredList.slice(begin, end);



                $scope.totPages=$scope.numPagesTot();

                $scope.accomFilteredList=[];

            }else{

                if ($scope.clearListGrid){

                    $scope.accomList=[];

                }

                $scope.totPages=$scope.numPagesTot();
            }


        }


       

        //accom list prev page
        $scope.prevPage = function () {

            if ($scope.currentPage > 1) {

                $scope.currentPage--;

            }
        };

        //accom list next page
        $scope.nextPage = function () {

            if ($scope.currentPage < $scope.totPages) {

                $scope.currentPage++;


            }
            
          };
       
        //watch on current page for the list grid
        $scope.$watch('currentPage + numPerPage', function() {


            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;


            $scope.accomList = $scope.accomListAll.slice(begin, end);

            
            $scope.search();




        });
        
        
}]);     

   //retrieve facebook photos not currently being used
       weddingApp.service('facebookService', function($http) {
   return {
        getPhotosTimeline: function() {
             //return the promise directly.
             return $http.get('https://graph.facebook.com/1415440245407241/photos')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
         getPhotosMobile: function() {
             //return the promise directly.
             return $http.get('https://graph.facebook.com/1415546278729971/photos')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }
        
   }
});






