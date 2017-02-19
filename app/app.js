// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ngMessages', 'ui.router'])

// configuring our routes 
// =============================================================================
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('form', {
                url: '/form',
                templateUrl: 'form.html',
                controller: 'formController'
            })

            // nested states
            .state('form.profile', {
                url: '/profile',
                templateUrl: 'form-profile.html'
            })

            .state('form.interests', {
                url: '/interests',
                templateUrl: 'form-interests.html'
            })

            .state('form.summary', {
                url: '/summary',
                templateUrl: 'form-summary.html'
            });

        $urlRouterProvider.otherwise('/form/profile');
    })
    .value('formSteps', [
        {uiSref: 'form.profile',   valid: false},
        {uiSref: 'form.interests', valid: false},
        {uiSref: 'form.summary',   valid: false}

    ])
    .run([
        '$rootScope',
        '$state',
        'formSteps',
        function ($rootScope, $state, formSteps) {

            // Register listener to watch route changes
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                var canGoToStep = false;
                // only go to next if previous is valid
                var toStateIndex = _.findIndex(formSteps, function (formStep) {
                    return formStep.uiSref === toState.name;
                });

                console.log('toStateIndex', toStateIndex)
                if (toStateIndex === 0) {
                    canGoToStep = true;
                } else {
                    canGoToStep = formSteps[toStateIndex - 1].valid;
                }
                console.log('canGoToStep', toState.name, canGoToStep);

                // Stop state changing if the previous state is invalid
                if (! canGoToStep) {
                    // Abort going to step
                    event.preventDefault();
                }
            });

        }


    ])

    // our controller for the form
    // =============================================================================
    .controller('formController', function ($scope, $state, $stateParams, formSteps) {

        // we will store all of our form data in this object
        $scope.formData = {};
        $scope.formStepSubmitted = false;

        var nextState = function (currentState) {
            switch (currentState) {
                case 'form.profile':
                    return 'form.interests';
                    break;
                case 'form.interests':
                    return 'form.summary';
                    break;
                default:
                    alert('Did not match any switch');
            }

        };

        var updateValidityOfCurrentStep = function (updatedValidity) {
            var currentStateIndex = _.findIndex(formSteps, function (formStep) {
                return formStep.uiSref === $state.current.name;
            });

            formSteps[currentStateIndex].valid = updatedValidity;
        };

        $scope.goToNextSection = function (isFormValid) {
            console.log('isFormValid ', isFormValid)
            // set to true to show all error messages (if there are any)
            $scope.formStepSubmitted = true;
            if (isFormValid) {
                // reset this for next form
                $scope.formStepSubmitted = false;

                // mark the step as valid so we can navigate to it via the links
                updateValidityOfCurrentStep(true /*valid */);

                $state.go(nextState($state.current.name));
            } else {
                // mark the step as valid so we can navigate to it via the links
                updateValidityOfCurrentStep(false /*not valid */);
            }
        };

        $scope.discount = function() {
            return $scope.formData.interests !== 'later'
                ? 'You get a 7% discount, congrats!'
                : 'No discount, sorry';
        };

        $scope.processForm = function () {
            alert('awesome!');
        };

    });


