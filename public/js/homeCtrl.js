
app.controller('homeCtrl', ['$scope', '$rootScope',
    ($scope, $rootScope) => {
        /**
         * HTTP GET To Get All Questions
         */

        $scope.getVacancies = () => {
            $rootScope.httpRequest('vacancies', 'GET', {}, data => {
                console.error(data);
            });
        };
        $scope.getVacancies();
    }
]);
