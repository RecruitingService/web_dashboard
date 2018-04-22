app.controller('profileCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$location',
    ($scope, $rootScope, $http, $routeParams, $location) => {
        /**
         * HTTP GET To Get All Questions
         */

        $scope.sendMessage = message => {
            console.log(message);
            $rootScope.httpRequest('/telegram/message', 'POST', {
                chatId: $routeParams.id,
                text: message
            }, data => {
                if (data) {

                }
            });
        };

        $scope.getVacancyById = () => {
            $rootScope.httpRequest(`vacancies/${$routeParams.id}`, 'GET', {}, data => {
                if (data && data.data.length > 0) {
                    $scope.vacancies = data.data;
                } else {
                    $location.path('/');
                }
            });
        };

        $scope.getVacancyById();
    }
]);
