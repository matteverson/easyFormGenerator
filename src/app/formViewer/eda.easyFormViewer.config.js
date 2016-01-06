/**
 *  -----------------------------------------------------------------------
 *  config module of easy form viewer
 *  -----------------------------------------------------------------------
 *
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';

	angular
		.module('eda.easyFormViewer')
		.config(configFct);

		configFct.$inject = ['formlyConfigProvider'];
		function configFct(formlyConfigProvider){
	     //////////////////////////////
      // CONFIG HERE (formly...)
      /////////////////////////////
      formlyConfigProvider.setType(
        {
          name: 'richEditor',
          //wrapper: ['bootstrapLabel', 'bootstrapHasError'],
          template: '<text-angular name="{{id}}" class="richTextAngular" ng-model="model[options.key || index]"></text-angular>'
        }
      );

      formlyConfigProvider.setType(
        {
          name: 'blank',
          template: '<div></div>'
        }
      );


      var subTitleTemplate = '<div class="row"><div class=""><h4 class="text-center">{{options.templateOptions.placeholder}}<h4><hr/></div></div>';
      formlyConfigProvider.setType(
        {
          name: 'subTitle',
          template: subTitleTemplate
        }
      );

      var basicSelectTemplate =   ' <ol   class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' +
                    '   ng-model="model[options.key || index]"  ' +
                      '   id="{{id}}"  ' +
                      '   disabled="options.templateOptions.options.length === 0"> ' +
                      '   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ' +
                      '     <a>{{option.name}}</a> ' +
                      '   </li> ' +
                      ' </ol>     ' ;

     formlyConfigProvider.setType(
        {
          name: 'basicSelect',
          template: basicSelectTemplate
        }
      );


     var groupedSelectTemplate =   '  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' +
                   '    ng-model="model[options.key || index]" ' +
                   '       data-live-search="true" ' +
                   '       disabled="options.templateOptions.options.length === 0">' +
                                 '       <li nya-bs-option="option in  options.templateOptions.options group by option.group"  ' +
                                 '       >' +
                                 '         <span class="dropdown-header">{{$group}}</span>' +
                                 '         <a>' +
                                 '           <span>{{option.name}}</span>' +
                                 '           <span class="glyphicon glyphicon-ok check-mark"></span>' +
                                 '         </a>' +
                                 '       </li>' +
                                 '     </ol>';

     formlyConfigProvider.setType(
        {
          name: 'groupedSelect',
          template: groupedSelectTemplate
        }
      );
			var fileUploadTemplate = '<div>' +
			'<div class="input-group">' +
			'<input type="text" ng-class="[\'form-control\', uploadStatus]" ngf-select ng-model="file" name="{{id}}" placeholder="{{fileName}}"/>' +
			'<span class="input-group-addon" ng-click="startUpload()"><i ng-class="[\'glyphicon\', \'glyphicon-upload\', uploadStatus]"></i></span>' +
			'</div>' +
			'</div>';

			formlyConfigProvider.setType(
				{
					name: 'fileupload',
					template: fileUploadTemplate,
					wrapper: ['bootstrapLabel', 'bootstrapHasError'],
					controller: /* @ngInject */ ['$scope', 'Upload', function($scope, Upload) {
						$scope.startUpload = startUpload;
						$scope.options.data.startUpload = startUpload;
						$scope.fileName = '';
						$scope.done = false;

						$scope.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInRoaW5rLWtpZHMtY2VydC11cGxvYWRzIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgICB7ImFjbCI6ICJwcml2YXRlIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9';
						$scope.signature = '597I+rBb9xhAZcCtmPW/RhWW7rM=';

						function startUpload() {
							if (!$scope.file || $scope.done) {
								return undefined;
							}
							var file = $scope.file;

						  Upload.upload({
								url: 'https://think-kids-cert-uploads.s3.amazonaws.com/',
								method: 'POST',
								skipAuthorization: true,
								data: {
									key: file.name, // the key to store the file on S3, could be file name or customized
				          AWSAccessKeyId: 'AKIAJHXKTQJH7P4IOMDA',
				          acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
				          policy: $scope.policy, // base64-encoded json policy (see article below)
				          signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
				          'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
				          filename: file.name, // this is needed for Flash polyfill IE8-9
				          file: file
								}
							}).then(function (resp) {
								console.log('Success ' + resp.config.data.file.name + ' uploaded.');
								console.log(resp);
								$scope.uploadStatus = 'upload-complete';
								$scope.done = true;
								$scope.fileName = resp.config.data.file.name;
								$scope.model[$scope.options.key || $scope.index] = resp.config.data.file.name;
							}, function (resp) {
								console.log('Upload error');
								scope.uploadStatus = 'upload-error';
								console.log(resp);
							}, function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
							});
						}
					}]
				}
			);
     ////////////////////////////
     // angular UI date picker
     ////////////////////////////
     // thx Kent C. Dodds

      var attributes = [
        'date-disabled',
        'custom-class',
        'show-weeks',
        'starting-day',
        'init-date',
        'min-mode',
        'max-mode',
        'format-day',
        'format-month',
        'format-year',
        'format-day-header',
        'format-day-title',
        'format-month-title',
        'year-range',
        'shortcut-propagation',
        'datepicker-popup',
        'show-button-bar',
        'current-text',
        'clear-text',
        'close-text',
        'close-on-date-selection',
        'datepicker-append-to-body'
      ];

      var bindings = [
        'datepicker-mode',
        'min-date',
        'max-date'
      ];

      var ngModelAttrs = {};

      angular.forEach(attributes, function(attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      angular.forEach(bindings, function(binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });



      formlyConfigProvider.setType({
        name: 'datepicker',
        template: '<input  id="{{id}}" class="form-control" ng-click="open($event)" ng-model="model[options.key  || index]" is-open="to.isOpen" ng-click="to.isOpen = true" datepicker-options="to.datepickerOptions" />',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        controller: ['$scope', function($scope) {
           $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
          };

         }],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            addonLeft: {
              class: 'glyphicon glyphicon-calendar',
              onClick: function(options, scope) {
                options.templateOptions.isOpen = !options.templateOptions.isOpen;
              }
            },
            onFocus: function($viewValue, $modelValue, scope) {
              scope.to.isOpen = !scope.to.isOpen;
            },
            datepickerOptions: {}
          }
        }

      });



      /**
       * wrappers to show validation errors
       * without having to rewrite formly types
       */
      formlyConfigProvider.setWrapper([
          {
            template: [
              '<div class="formly-template-wrapper form-group"',
              '     ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
              ' <formly-transclude></formly-transclude>',
              ' <div class="validation"',
              '       ng-if="options.validation.errorExistsAndShouldBeVisible"',
              '       ng-messages="options.formControl.$error">',
              '   <div ng-messages-include="validation.html"></div>',
              '   <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
              '     {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
              '   </div>',
              ' </div>',
              '</div>'
            ].join(' ')
          }
        ]);

      function camelize(string) {
        string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function(match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      }

    }


})();
