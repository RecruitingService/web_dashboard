
app.controller('homeCtrl', ['$scope', '$rootScope',
    ($scope, $rootScope) => {
        $scope.questions = [];
        $scope.showFirstPart = true;

        /**
         * HTTP GET To Get All Questions
         */

        $scope.getQuestions = () => {
            $rootScope.httpRequest('questions', 'GET', {}, data => {
                if (!_.isEmpty(data.questions)) {
                    $scope.questions = data.questions;
                }
            });
        };

        $scope.answers = {};
        $scope.userScore = 0;

        /**
         * Save Quiz Answers
         */

        $scope.saveTestAnswers = () => {
            for (const key in $scope.answers) {
                if ($scope.answers.hasOwnProperty(key)) {
                    const question = _.find($scope.questions, one => key === one.question);
                    if ($scope.answers[key] === question.answer) $scope.userScore++;
                }
            }
            $scope.showFirstPart = !$scope.showFirstPart;
        };

        /**
         * Play Again The Quiz
         */

        $scope.playAgain = () => {
            $scope.userScore = 0;
            $scope.answers = {};
            $scope.showFirstPart = !$scope.showFirstPart;
        };
    }
]);
