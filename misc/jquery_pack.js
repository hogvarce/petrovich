/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,d=d.concat(c.errorList)}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b===this.lastElement)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var b,c=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(b=0;c[b];b++)this.settings.unhighlight.call(this,c[b],this.settings.errorClass,"");else c.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?this.findByName(b.name).filter(":checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.off(".validate-equalTo").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

    var plugin = {};

    var defaults = {

        // GENERAL
        mode: 'horizontal',
        slideSelector: '',
        infiniteLoop: true,
        hideControlOnEnd: false,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: false,
        captions: false,
        ticker: false,
        tickerHover: false,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        useCSS: true,
        preloadImages: 'visible',
        responsive: true,
        slideZIndex: 50,
        wrapperClass: 'bx-wrapper',

        // TOUCH
        touchEnabled: true,
        swipeThreshold: 50,
        oneToOneTouch: true,
        preventDefaultSwipeX: true,
        preventDefaultSwipeY: false,

        // PAGER
        pager: true,
        pagerType: 'full',
        pagerShortSeparator: ' / ',
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,

        // CONTROLS
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        nextSelector: null,
        prevSelector: null,
        autoControls: false,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: false,
        autoControlsSelector: null,

        // AUTO
        auto: false,
        pause: 4000,
        autoStart: true,
        autoDirection: 'next',
        autoHover: false,
        autoDelay: 0,
        autoSlideForOnePage: false,

        // CAROUSEL
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,

        // CALLBACKS
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    }

    $.fn.bxSlider = function(options){

        if(this.length == 0) return this;

        // support mutltiple elements
        if(this.length > 1){
            this.each(function(){$(this).bxSlider(options)});
            return this;
        }

        // create a namespace to be used throughout the plugin
        var slider = {};
        // set a reference to our slider element
        var el = this;
        plugin.el = this;

        /**
         * Makes slideshow responsive
         */
        // first get the original window dimens (thanks alot IE)
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();



        /**
         * ===================================================================================
         * = PRIVATE FUNCTIONS
         * ===================================================================================
         */

        /**
         * Initializes namespace settings to be used throughout plugin
         */
        var init = function(){
            // merge user-supplied options with the defaults
            slider.settings = $.extend({}, defaults, options);
            // parse slideWidth setting
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            // store the original children
            slider.children = el.children(slider.settings.slideSelector);
            // check if actual number of slides is less than minSlides / maxSlides
            if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
            if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
            // if random start, set the startSlide setting to random number
            if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
            // store active slide information
            slider.active = { index: slider.settings.startSlide }
            // store if the slider is in carousel mode (displaying / moving multiple slides)
            slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
            // if carousel, force preloadImages = 'all'
            if(slider.carousel) slider.settings.preloadImages = 'all';
            // calculate the min / max width thresholds based on min / max number of slides
            // used to setup and update carousel slides dimensions
            slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
            slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
            // store the current state of the slider (if currently animating, working is true)
            slider.working = false;
            // initialize the controls object
            slider.controls = {};
            // initialize an auto interval
            slider.interval = null;
            // determine which property to use for transitions
            slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
            // determine if hardware acceleration can be used
            slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
                    // create our test div element
                    var div = document.createElement('div');
                    // css transition properties
                    var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    // test for each property
                    for(var i in props){
                        if(div.style[props[i]] !== undefined){
                            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
                            slider.animProp = '-' + slider.cssPrefix + '-transform';
                            return true;
                        }
                    }
                    return false;
                }());
            // if vertical mode always make maxSlides and minSlides equal
            if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
            // save original style data
            el.data("origStyle", el.attr("style"));
            el.children(slider.settings.slideSelector).each(function() {
                $(this).data("origStyle", $(this).attr("style"));
            });
            // perform all DOM / CSS modifications
            setup();
        }

        /**
         * Performs all DOM and CSS modifications
         */
        var setup = function(){
            // wrap el in a wrapper
            el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
            // store a namspace reference to .bx-viewport
            slider.viewport = el.parent();
            // add a loading div to display while images are loading
            slider.loader = $('<div class="bx-loading" />');
            slider.viewport.prepend(slider.loader);
            // set el to a massive width, to hold any needed slides
            // also strip any margin and padding from el
            el.css({
                width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
                position: 'relative'
            });
            // if using CSS, add the easing property
            if(slider.usingCSS && slider.settings.easing){
                el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
                // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
            }else if(!slider.settings.easing){
                slider.settings.easing = 'swing';
            }
            var slidesShowing = getNumberSlidesShowing();
            // make modifications to the viewport (.bx-viewport)
            slider.viewport.css({
                width: '100%',
                overflow: 'hidden',
                position: 'relative'
            });
            slider.viewport.parent().css({
                maxWidth: getViewportMaxWidth()
            });
            // make modification to the wrapper (.bx-wrapper)
            if(!slider.settings.pager) {
                slider.viewport.parent().css({
                    margin: '0 auto 0px'
                });
            }
            // apply css to all slider children
            slider.children.css({
                'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
                listStyle: 'none',
                position: 'relative'
            });
            // apply the calculated width after the float is applied to prevent scrollbar interference
            slider.children.css('width', getSlideWidth());
            // if slideMargin is supplied, add the css
            if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
            if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
            // if "fade" mode, add positioning and z-index CSS
            if(slider.settings.mode == 'fade'){
                slider.children.css({
                    position: 'absolute',
                    zIndex: 0,
                    display: 'none'
                });
                // prepare the z-index on the showing element
                slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
            }
            // create an element to contain all slider controls (pager, start / stop, etc)
            slider.controls.el = $('<div class="bx-controls" />');
            // if captions are requested, add them
            if(slider.settings.captions) appendCaptions();
            // check if startSlide is last slide
            slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
            // if video is true, set up the fitVids plugin
            if(slider.settings.video) el.fitVids();
            // set the default preload selector (visible)
            var preloadSelector = slider.children.eq(slider.settings.startSlide);
            if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
            // only check for control addition if not in "ticker" mode
            if(!slider.settings.ticker){
                // if pager is requested, add it
                if(slider.settings.pager) appendPager();
                // if controls are requested, add them
                if(slider.settings.controls) appendControls();
                // if auto is true, and auto controls are requested, add them
                if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
                // if any control option is requested, add the controls wrapper
                if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
                // if ticker mode, do not allow a pager
            }else{
                slider.settings.pager = false;
            }
            // preload all images, then perform final DOM / CSS modifications that depend on images being loaded
            loadElements(preloadSelector, start);
        }

        var loadElements = function(selector, callback){
            var total = selector.find('img, iframe').length;
            if (total == 0){
                callback();
                return;
            }
            var count = 0;
            selector.find('img, iframe').each(function(){
                $(this).one('load', function() {
                    if(++count == total) callback();
                }).each(function() {
                    if(this.complete) $(this).load();
                });
            });
        }

        /**
         * Start the slider
         */
        var start = function(){
            // if infinite loop, prepare additional slides
            if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
                var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
                var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
                var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
                el.append(sliceAppend).prepend(slicePrepend);
            }
            // remove the loading DOM element
            slider.loader.remove();
            // set the left / top position of "el"
            setSlidePosition();
            // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
            if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
            // set the viewport height
            slider.viewport.height(getViewportHeight());
            // make sure everything is positioned just right (same as a window resize)
            el.redrawSlider();
            // onSliderLoad callback
            slider.settings.onSliderLoad(slider.active.index);
            // slider has been fully initialized
            slider.initialized = true;
            // bind the resize call to the window
            if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
            // if auto is true and has more than 1 page, start the show
            if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
            // if ticker is true, start the ticker
            if (slider.settings.ticker) initTicker();
            // if pager is requested, make the appropriate pager link active
            if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
            // check for any updates to the controls (like hideControlOnEnd updates)
            if (slider.settings.controls) updateDirectionControls();
            // if touchEnabled is true, setup the touch events
            if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
        }

        /**
         * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
         */
        var getViewportHeight = function(){
            var height = 0;
            // first determine which children (slides) should be used in our height calculation
            var children = $();
            // if mode is not "vertical" and adaptiveHeight is false, include all children
            if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
                children = slider.children;
            }else{
                // if not carousel, return the single active child
                if(!slider.carousel){
                    children = slider.children.eq(slider.active.index);
                    // if carousel, return a slice of children
                }else{
                    // get the individual slide index
                    var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
                    // add the current slide to the children
                    children = slider.children.eq(currentIndex);
                    // cycle through the remaining "showing" slides
                    for (i = 1; i <= slider.settings.maxSlides - 1; i++){
                        // if looped back to the start
                        if(currentIndex + i >= slider.children.length){
                            children = children.add(slider.children.eq(i - 1));
                        }else{
                            children = children.add(slider.children.eq(currentIndex + i));
                        }
                    }
                }
            }
            // if "vertical" mode, calculate the sum of the heights of the children
            if(slider.settings.mode == 'vertical'){
                children.each(function(index) {
                    height += $(this).outerHeight();
                });
                // add user-supplied margins
                if(slider.settings.slideMargin > 0){
                    height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
                }
                // if not "vertical" mode, calculate the max height of the children
            }else{
                height = Math.max.apply(Math, children.map(function(){
                    return $(this).outerHeight(false);
                }).get());
            }

            if(slider.viewport.css('box-sizing') == 'border-box'){
                height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
                    parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
            }else if(slider.viewport.css('box-sizing') == 'padding-box'){
                height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
            }

            return height;
        }

        /**
         * Returns the calculated width to be used for the outer wrapper / viewport
         */
        var getViewportMaxWidth = function(){
            var width = '100%';
            if(slider.settings.slideWidth > 0){
                if(slider.settings.mode == 'horizontal'){
                    width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
                }else{
                    width = slider.settings.slideWidth;
                }
            }
            return width;
        }

        /**
         * Returns the calculated width to be applied to each slide
         */
        var getSlideWidth = function(){
            // start with any user-supplied slide width
            var newElWidth = slider.settings.slideWidth;
            // get the current viewport width
            var wrapWidth = slider.viewport.width();
            // if slide width was not supplied, or is larger than the viewport use the viewport width
            if(slider.settings.slideWidth == 0 ||
                (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
                slider.settings.mode == 'vertical'){
                newElWidth = wrapWidth;
                // if carousel, use the thresholds to determine the width
            }else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
                if(wrapWidth > slider.maxThreshold){
                    // newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
                }else if(wrapWidth < slider.minThreshold){
                    newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
                }
            }

            //console.log(newElWidth)
            return newElWidth-10;
        }

        /**
         * Returns the number of slides currently visible in the viewport (includes partially visible slides)
         */
        var getNumberSlidesShowing = function(){
            var slidesShowing = 1;
            if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
                // if viewport is smaller than minThreshold, return minSlides
                if(slider.viewport.width() < slider.minThreshold){
                    slidesShowing = slider.settings.minSlides;
                    // if viewport is larger than minThreshold, return maxSlides
                }else if(slider.viewport.width() > slider.maxThreshold){
                    slidesShowing = slider.settings.maxSlides;
                    // if viewport is between min / max thresholds, divide viewport width by first child width
                }else{
                    var childWidth = slider.children.first().width() + slider.settings.slideMargin;
                    slidesShowing = Math.floor((slider.viewport.width() +
                        slider.settings.slideMargin) / childWidth);
                }
                // if "vertical" mode, slides showing will always be minSlides
            }else if(slider.settings.mode == 'vertical'){
                slidesShowing = slider.settings.minSlides;
            }
            return slidesShowing;
        }

        /**
         * Returns the number of pages (one full viewport of slides is one "page")
         */
        var getPagerQty = function(){
            var pagerQty = 0;
            // if moveSlides is specified by the user
            if(slider.settings.moveSlides > 0){
                if(slider.settings.infiniteLoop){
                    pagerQty = Math.ceil(slider.children.length / getMoveBy());
                }else{
                    // use a while loop to determine pages
                    var breakPoint = 0;
                    var counter = 0
                    // when breakpoint goes above children length, counter is the number of pages
                    while (breakPoint < slider.children.length){
                        ++pagerQty;
                        breakPoint = counter + getNumberSlidesShowing();
                        counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
                    }
                }
                // if moveSlides is 0 (auto) divide children length by sides showing, then round up
            }else{
                pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
            }
            return pagerQty;
        }

        /**
         * Returns the number of indivual slides by which to shift the slider
         */
        var getMoveBy = function(){
            // if moveSlides was set by the user and moveSlides is less than number of slides showing
            if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
                return slider.settings.moveSlides;
            }
            // if moveSlides is 0 (auto)
            return getNumberSlidesShowing();
        }

        /**
         * Sets the slider's (el) left or top position
         */
        var setSlidePosition = function(){
            // if last slide, not infinite loop, and number of children is larger than specified maxSlides
            if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
                if (slider.settings.mode == 'horizontal'){
                    // get the last child's position
                    var lastChild = slider.children.last();
                    var position = lastChild.position();
                    // set the left position
                    setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
                }else if(slider.settings.mode == 'vertical'){
                    // get the last showing index's position
                    var lastShowingIndex = slider.children.length - slider.settings.minSlides;
                    var position = slider.children.eq(lastShowingIndex).position();
                    // set the top position
                    setPositionProperty(-position.top, 'reset', 0);
                }
                // if not last slide
            }else{
                // get the position of the first showing slide
                var position = slider.children.eq(slider.active.index * getMoveBy()).position();
                // check for last slide
                if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
                // set the repective position
                if (position != undefined){
                    if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
                    else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
                }
            }
        }

        /**
         * Sets the el's animating property position (which in turn will sometimes animate el).
         * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
         *
         * @param value (int)
         *  - the animating property's value
         *
         * @param type (string) 'slider', 'reset', 'ticker'
         *  - the type of instance for which the function is being
         *
         * @param duration (int)
         *  - the amount of time (in ms) the transition should occupy
         *
         * @param params (array) optional
         *  - an optional parameter containing any variables that need to be passed in
         */
        var setPositionProperty = function(value, type, duration, params){
            // use CSS transform
            if(slider.usingCSS){
                // determine the translate3d value
                var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
                // add the CSS transition-duration
                el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
                if(type == 'slide'){
                    // set the property value
                    el.css(slider.animProp, propValue);
                    // bind a callback method - executes when CSS transition completes
                    el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
                        // unbind the callback
                        el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                        updateAfterSlideTransition();
                    });
                }else if(type == 'reset'){
                    el.css(slider.animProp, propValue);
                }else if(type == 'ticker'){
                    // make the transition use 'linear'
                    el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
                    el.css(slider.animProp, propValue);
                    // bind a callback method - executes when CSS transition completes
                    el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
                        // unbind the callback
                        el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                        // reset the position
                        setPositionProperty(params['resetValue'], 'reset', 0);
                        // start the loop again
                        tickerLoop();
                    });
                }
                // use JS animate
            }else{
                var animateObj = {};
                animateObj[slider.animProp] = value;
                if(type == 'slide'){
                    el.animate(animateObj, duration, slider.settings.easing, function(){
                        updateAfterSlideTransition();
                    });
                }else if(type == 'reset'){
                    el.css(slider.animProp, value)
                }else if(type == 'ticker'){
                    el.animate(animateObj, speed, 'linear', function(){
                        setPositionProperty(params['resetValue'], 'reset', 0);
                        // run the recursive loop after animation
                        tickerLoop();
                    });
                }
            }
        }

        /**
         * Populates the pager with proper amount of pages
         */
        var populatePager = function(){
            var pagerHtml = '';
            var pagerQty = getPagerQty();
            // loop through each pager item
            for(var i=0; i < pagerQty; i++){
                var linkContent = '';
                // if a buildPager function is supplied, use it to get pager link value, else use index + 1
                if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
                    linkContent = slider.settings.buildPager(i);
                    slider.pagerEl.addClass('bx-custom-pager');
                }else{
                    linkContent = i + 1;
                    slider.pagerEl.addClass('bx-default-pager');
                }
                // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
                // add the markup to the string
                pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
            };
            // populate the pager element with pager links
            slider.pagerEl.html(pagerHtml);
        }

        /**
         * Appends the pager to the controls element
         */
        var appendPager = function(){
            if(!slider.settings.pagerCustom){
                // create the pager DOM element
                slider.pagerEl = $('<div class="bx-pager" />');
                // if a pager selector was supplied, populate it with the pager
                if(slider.settings.pagerSelector){
                    $(slider.settings.pagerSelector).html(slider.pagerEl);
                    // if no pager selector was supplied, add it after the wrapper
                }else{
                    slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
                }
                // populate the pager
                populatePager();
            }else{
                slider.pagerEl = $(slider.settings.pagerCustom);
            }
            // assign the pager click binding
            slider.pagerEl.on('click', 'a', clickPagerBind);
        }

        /**
         * Appends prev / next controls to the controls element
         */
        var appendControls = function(){
            slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
            slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
            // bind click actions to the controls
            slider.controls.next.bind('click', clickNextBind);
            slider.controls.prev.bind('click', clickPrevBind);
            // if nextSlector was supplied, populate it
            if(slider.settings.nextSelector){
                $(slider.settings.nextSelector).append(slider.controls.next);
            }
            // if prevSlector was supplied, populate it
            if(slider.settings.prevSelector){
                $(slider.settings.prevSelector).append(slider.controls.prev);
            }
            // if no custom selectors were supplied
            if(!slider.settings.nextSelector && !slider.settings.prevSelector){
                // add the controls to the DOM
                slider.controls.directionEl = $('<div class="bx-controls-direction" />');
                // add the control elements to the directionEl
                slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
                // slider.viewport.append(slider.controls.directionEl);
                slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
            }
        }

        /**
         * Appends start / stop auto controls to the controls element
         */
        var appendControlsAuto = function(){
            slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
            slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
            // add the controls to the DOM
            slider.controls.autoEl = $('<div class="bx-controls-auto" />');
            // bind click actions to the controls
            slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
            slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
            // if autoControlsCombine, insert only the "start" control
            if(slider.settings.autoControlsCombine){
                slider.controls.autoEl.append(slider.controls.start);
                // if autoControlsCombine is false, insert both controls
            }else{
                slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
            }
            // if auto controls selector was supplied, populate it with the controls
            if(slider.settings.autoControlsSelector){
                $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
                // if auto controls selector was not supplied, add it after the wrapper
            }else{
                slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
            }
            // update the auto controls
            updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
        }

        /**
         * Appends image captions to the DOM
         */
        var appendCaptions = function(){
            // cycle through each child
            slider.children.each(function(index){
                // get the image title attribute
                var title = $(this).find('img:first').attr('title');
                // append the caption
                if (title != undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
            });
        }

        /**
         * Click next binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickNextBind = function(e){
            // if auto show is running, stop it
            if (slider.settings.auto) el.stopAuto();
            el.goToNextSlide();
            e.preventDefault();
        }

        /**
         * Click prev binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickPrevBind = function(e){
            // if auto show is running, stop it
            if (slider.settings.auto) el.stopAuto();
            el.goToPrevSlide();
            e.preventDefault();
        }

        /**
         * Click start binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickStartBind = function(e){
            el.startAuto();
            e.preventDefault();
        }

        /**
         * Click stop binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickStopBind = function(e){
            el.stopAuto();
            e.preventDefault();
        }

        /**
         * Click pager binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickPagerBind = function(e){
            // if auto show is running, stop it
            if (slider.settings.auto) el.stopAuto();
            var pagerLink = $(e.currentTarget);
            if(pagerLink.attr('data-slide-index') !== undefined){
                var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
                // if clicked pager link is not active, continue with the goToSlide call
                if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
                e.preventDefault();
            }
        }

        /**
         * Updates the pager links with an active class
         *
         * @param slideIndex (int)
         *  - index of slide to make active
         */
        var updatePagerActive = function(slideIndex){
            // if "short" pager type
            var len = slider.children.length; // nb of children
            if(slider.settings.pagerType == 'short'){
                if(slider.settings.maxSlides > 1) {
                    len = Math.ceil(slider.children.length/slider.settings.maxSlides);
                }
                slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
                return;
            }
            // remove all pager active classes
            slider.pagerEl.find('a').removeClass('active');
            // apply the active class for all pagers
            slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
        }

        /**
         * Performs needed actions after a slide transition
         */
        var updateAfterSlideTransition = function(){
            // if infinte loop is true
            if(slider.settings.infiniteLoop){
                var position = '';
                // first slide
                if(slider.active.index == 0){
                    // set the new position
                    position = slider.children.eq(0).position();
                    // carousel, last slide
                }else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
                    position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
                    // last slide
                }else if(slider.active.index == slider.children.length - 1){
                    position = slider.children.eq(slider.children.length - 1).position();
                }
                if(position){
                    if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
                    else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
                }
            }
            // declare that the transition is complete
            slider.working = false;
            // onSlideAfter callback
            slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
        }

        /**
         * Updates the auto controls state (either active, or combined switch)
         *
         * @param state (string) "start", "stop"
         *  - the new state of the auto show
         */
        var updateAutoControls = function(state){
            // if autoControlsCombine is true, replace the current control with the new state
            if(slider.settings.autoControlsCombine){
                slider.controls.autoEl.html(slider.controls[state]);
                // if autoControlsCombine is false, apply the "active" class to the appropriate control
            }else{
                slider.controls.autoEl.find('a').removeClass('active');
                slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
            }
        }

        /**
         * Updates the direction controls (checks if either should be hidden)
         */
        var updateDirectionControls = function(){
            if(getPagerQty() == 1){
                slider.controls.prev.addClass('disabled');
                slider.controls.next.addClass('disabled');
            }else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
                // if first slide
                if (slider.active.index == 0){
                    slider.controls.prev.addClass('disabled');
                    slider.controls.next.removeClass('disabled');
                    // if last slide
                }else if(slider.active.index == getPagerQty() - 1){
                    slider.controls.next.addClass('disabled');
                    slider.controls.prev.removeClass('disabled');
                    // if any slide in the middle
                }else{
                    slider.controls.prev.removeClass('disabled');
                    slider.controls.next.removeClass('disabled');
                }
            }
        }

        /**
         * Initialzes the auto process
         */
        var initAuto = function(){
            // if autoDelay was supplied, launch the auto show using a setTimeout() call
            if(slider.settings.autoDelay > 0){
                var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
                // if autoDelay was not supplied, start the auto show normally
            }else{
                el.startAuto();
            }
            // if autoHover is requested
            if(slider.settings.autoHover){
                // on el hover
                el.hover(function(){
                    // if the auto show is currently playing (has an active interval)
                    if(slider.interval){
                        // stop the auto show and pass true agument which will prevent control update
                        el.stopAuto(true);
                        // create a new autoPaused value which will be used by the relative "mouseout" event
                        slider.autoPaused = true;
                    }
                }, function(){
                    // if the autoPaused value was created be the prior "mouseover" event
                    if(slider.autoPaused){
                        // start the auto show and pass true agument which will prevent control update
                        el.startAuto(true);
                        // reset the autoPaused value
                        slider.autoPaused = null;
                    }
                });
            }
        }

        /**
         * Initialzes the ticker process
         */
        var initTicker = function(){
            var startPosition = 0;
            // if autoDirection is "next", append a clone of the entire slider
            if(slider.settings.autoDirection == 'next'){
                el.append(slider.children.clone().addClass('bx-clone'));
                // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
            }else{
                el.prepend(slider.children.clone().addClass('bx-clone'));
                var position = slider.children.first().position();
                startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
            }
            setPositionProperty(startPosition, 'reset', 0);
            // do not allow controls in ticker mode
            slider.settings.pager = false;
            slider.settings.controls = false;
            slider.settings.autoControls = false;
            // if autoHover is requested
            if(slider.settings.tickerHover && !slider.usingCSS){
                // on el hover
                slider.viewport.hover(function(){
                    el.stop();
                }, function(){
                    // calculate the total width of children (used to calculate the speed ratio)
                    var totalDimens = 0;
                    slider.children.each(function(index){
                        totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                    });
                    // calculate the speed ratio (used to determine the new speed to finish the paused animation)
                    var ratio = slider.settings.speed / totalDimens;
                    // determine which property to use
                    var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
                    // calculate the new speed
                    var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
                    tickerLoop(newSpeed);
                });
            }
            // start the ticker loop
            tickerLoop();
        }

        /**
         * Runs a continuous loop, news ticker-style
         */
        var tickerLoop = function(resumeSpeed){
            speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
            var position = {left: 0, top: 0};
            var reset = {left: 0, top: 0};
            // if "next" animate left position to last child, then reset left to 0
            if(slider.settings.autoDirection == 'next'){
                position = el.find('.bx-clone').first().position();
                // if "prev" animate left position to 0, then reset left to first non-clone child
            }else{
                reset = slider.children.first().position();
            }
            var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
            var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
            var params = {resetValue: resetValue};
            setPositionProperty(animateProperty, 'ticker', speed, params);
        }

        /**
         * Initializes touch events
         */
        var initTouch = function(){
            // initialize object to contain all touch values
            slider.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }
            slider.viewport.bind('touchstart', onTouchStart);
        }

        /**
         * Event handler for "touchstart"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchStart = function(e){
            if(slider.working){
                e.preventDefault();
            }else{
                // record the original position when touch starts
                slider.touch.originalPos = el.position();
                var orig = e.originalEvent;
                // record the starting touch x, y coordinates
                slider.touch.start.x = orig.changedTouches[0].pageX;
                slider.touch.start.y = orig.changedTouches[0].pageY;
                // bind a "touchmove" event to the viewport
                slider.viewport.bind('touchmove', onTouchMove);
                // bind a "touchend" event to the viewport
                slider.viewport.bind('touchend', onTouchEnd);
            }
        }

        /**
         * Event handler for "touchmove"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchMove = function(e){
            var orig = e.originalEvent;
            // if scrolling on y axis, do not prevent default
            var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
            var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
            // x axis swipe
            if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
                e.preventDefault();
                // y axis swipe
            }else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
                e.preventDefault();
            }
            if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
                var value = 0;
                // if horizontal, drag along x axis
                if(slider.settings.mode == 'horizontal'){
                    var change = orig.changedTouches[0].pageX - slider.touch.start.x;
                    value = slider.touch.originalPos.left + change;
                    // if vertical, drag along y axis
                }else{
                    var change = orig.changedTouches[0].pageY - slider.touch.start.y;
                    value = slider.touch.originalPos.top + change;
                }
                setPositionProperty(value, 'reset', 0);
            }
        }

        /**
         * Event handler for "touchend"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchEnd = function(e){
            slider.viewport.unbind('touchmove', onTouchMove);
            var orig = e.originalEvent;
            var value = 0;
            // record end x, y positions
            slider.touch.end.x = orig.changedTouches[0].pageX;
            slider.touch.end.y = orig.changedTouches[0].pageY;
            // if fade mode, check if absolute x distance clears the threshold
            if(slider.settings.mode == 'fade'){
                var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
                if(distance >= slider.settings.swipeThreshold){
                    slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
                    el.stopAuto();
                }
                // not fade mode
            }else{
                var distance = 0;
                // calculate distance and el's animate property
                if(slider.settings.mode == 'horizontal'){
                    distance = slider.touch.end.x - slider.touch.start.x;
                    value = slider.touch.originalPos.left;
                }else{
                    distance = slider.touch.end.y - slider.touch.start.y;
                    value = slider.touch.originalPos.top;
                }
                // if not infinite loop and first / last slide, do not attempt a slide transition
                if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
                    setPositionProperty(value, 'reset', 200);
                }else{
                    // check if distance clears threshold
                    if(Math.abs(distance) >= slider.settings.swipeThreshold){
                        distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
                        el.stopAuto();
                    }else{
                        // el.animate(property, 200);
                        setPositionProperty(value, 'reset', 200);
                    }
                }
            }
            slider.viewport.unbind('touchend', onTouchEnd);
        }

        /**
         * Window resize event callback
         */
        var resizeWindow = function(e){
            // don't do anything if slider isn't initialized.
            if(!slider.initialized) return;
            // get the new window dimens (again, thank you IE)
            var windowWidthNew = $(window).width();
            var windowHeightNew = $(window).height();
            // make sure that it is a true window resize
            // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
            // are resized. Can you just die already?*
            if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
                // set the new window dimens
                windowWidth = windowWidthNew;
                windowHeight = windowHeightNew;
                // update all dynamic elements
                el.redrawSlider();
                // Call user resize handler
                slider.settings.onSliderResize.call(el, slider.active.index);
            }
        }

        /**
         * ===================================================================================
         * = PUBLIC FUNCTIONS
         * ===================================================================================
         */

        /**
         * Performs slide transition to the specified slide
         *
         * @param slideIndex (int)
         *  - the destination slide's index (zero-based)
         *
         * @param direction (string)
         *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
         */
        el.goToSlide = function(slideIndex, direction){
            // if plugin is currently in motion, ignore request
            if(slider.working || slider.active.index == slideIndex) return;
            // declare that plugin is in motion
            slider.working = true;
            // store the old index
            slider.oldIndex = slider.active.index;
            // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
            if(slideIndex < 0){
                slider.active.index = getPagerQty() - 1;
                // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
            }else if(slideIndex >= getPagerQty()){
                slider.active.index = 0;
                // set active index to requested slide
            }else{
                slider.active.index = slideIndex;
            }
            // onSlideBefore, onSlideNext, onSlidePrev callbacks
            slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
            if(direction == 'next'){
                slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
            }else if(direction == 'prev'){
                slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
            }
            // check if last slide
            slider.active.last = slider.active.index >= getPagerQty() - 1;
            // update the pager with active class
            if(slider.settings.pager) updatePagerActive(slider.active.index);
            // // check for direction control update
            if(slider.settings.controls) updateDirectionControls();
            // if slider is set to mode: "fade"
            if(slider.settings.mode == 'fade'){
                // if adaptiveHeight is true and next height is different from current height, animate to the new height
                if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                // fade out the visible child and reset its z-index value
                slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
                // fade in the newly requested slide
                slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
                    $(this).css('zIndex', slider.settings.slideZIndex);
                    updateAfterSlideTransition();
                });
                // slider mode is not "fade"
            }else{
                // if adaptiveHeight is true and next height is different from current height, animate to the new height
                if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                var moveBy = 0;
                var position = {left: 0, top: 0};
                // if carousel and not infinite loop
                if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
                    if(slider.settings.mode == 'horizontal'){
                        // get the last child position
                        var lastChild = slider.children.eq(slider.children.length - 1);
                        position = lastChild.position();
                        // calculate the position of the last slide
                        moveBy = slider.viewport.width() - lastChild.outerWidth();
                    }else{
                        // get last showing index position
                        var lastShowingIndex = slider.children.length - slider.settings.minSlides;
                        position = slider.children.eq(lastShowingIndex).position();
                    }
                    // horizontal carousel, going previous while on first slide (infiniteLoop mode)
                }else if(slider.carousel && slider.active.last && direction == 'prev'){
                    // get the last child position
                    var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
                    var lastChild = el.children('.bx-clone').eq(eq);
                    position = lastChild.position();
                    // if infinite loop and "Next" is clicked on the last slide
                }else if(direction == 'next' && slider.active.index == 0){
                    // get the last clone position
                    position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
                    slider.active.last = false;
                    // normal non-zero requests
                }else if(slideIndex >= 0){
                    var requestEl = slideIndex * getMoveBy();
                    position = slider.children.eq(requestEl).position();
                }

                /* If the position doesn't exist
                 * (e.g. if you destroy the slider on a next click),
                 * it doesn't throw an error.
                 */
                if ("undefined" !== typeof(position)) {
                    var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
                    // plugin values to be animated
                    setPositionProperty(value, 'slide', slider.settings.speed);
                }
            }
        }

        /**
         * Transitions to the next slide in the show
         */
        el.goToNextSlide = function(){
            // if infiniteLoop is false and last page is showing, disregard call
            if (!slider.settings.infiniteLoop && slider.active.last) return;
            var pagerIndex = parseInt(slider.active.index) + 1;
            el.goToSlide(pagerIndex, 'next');
        }

        /**
         * Transitions to the prev slide in the show
         */
        el.goToPrevSlide = function(){
            // if infiniteLoop is false and last page is showing, disregard call
            if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
            var pagerIndex = parseInt(slider.active.index) - 1;
            el.goToSlide(pagerIndex, 'prev');
        }

        /**
         * Starts the auto show
         *
         * @param preventControlUpdate (boolean)
         *  - if true, auto controls state will not be updated
         */
        el.startAuto = function(preventControlUpdate){
            // if an interval already exists, disregard call
            if(slider.interval) return;
            // create an interval
            slider.interval = setInterval(function(){
                slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
            }, slider.settings.pause);
            // if auto controls are displayed and preventControlUpdate is not true
            if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
        }

        /**
         * Stops the auto show
         *
         * @param preventControlUpdate (boolean)
         *  - if true, auto controls state will not be updated
         */
        el.stopAuto = function(preventControlUpdate){
            // if no interval exists, disregard call
            if(!slider.interval) return;
            // clear the interval
            clearInterval(slider.interval);
            slider.interval = null;
            // if auto controls are displayed and preventControlUpdate is not true
            if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
        }

        /**
         * Returns current slide index (zero-based)
         */
        el.getCurrentSlide = function(){
            return slider.active.index;
        }

        /**
         * Returns current slide element
         */
        el.getCurrentSlideElement = function(){
            return slider.children.eq(slider.active.index);
        }

        /**
         * Returns number of slides in show
         */
        el.getSlideCount = function(){
            return slider.children.length;
        }

        /**
         * Update all dynamic slider elements
         */
        el.redrawSlider = function(){
            // resize all children in ratio to new screen size
            slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
            // adjust the height
            slider.viewport.css('height', getViewportHeight());
            // update the slide position
            if(!slider.settings.ticker) setSlidePosition();
            // if active.last was true before the screen resize, we want
            // to keep it last no matter what screen size we end on
            if (slider.active.last) slider.active.index = getPagerQty() - 1;
            // if the active index (page) no longer exists due to the resize, simply set the index as last
            if (slider.active.index >= getPagerQty()) slider.active.last = true;
            // if a pager is being displayed and a custom pager is not being used, update it
            if(slider.settings.pager && !slider.settings.pagerCustom){
                populatePager();
                updatePagerActive(slider.active.index);
            }
        }

        /**
         * Destroy the current instance of the slider (revert everything back to original state)
         */
        el.destroySlider = function(){
            // don't do anything if slider has already been destroyed
            if(!slider.initialized) return;
            slider.initialized = false;
            $('.bx-clone', this).remove();
            slider.children.each(function() {
                $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
            });
            $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
            $(this).unwrap().unwrap();
            if(slider.controls.el) slider.controls.el.remove();
            if(slider.controls.next) slider.controls.next.remove();
            if(slider.controls.prev) slider.controls.prev.remove();
            if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
            $('.bx-caption', this).remove();
            if(slider.controls.autoEl) slider.controls.autoEl.remove();
            clearInterval(slider.interval);
            if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
        }

        /**
         * Reload the slider (revert all DOM changes, and re-initialize)
         */
        el.reloadSlider = function(settings){
            if (settings != undefined) options = settings;
            el.destroySlider();
            init();
        }

        init();

        // returns the current jQuery object
        return this;
    }

})(jQuery);
/* Tooltipster v3.3.0 */;(function(e,t,n){function s(t,n){this.bodyOverflowX;this.callbacks={hide:[],show:[]};this.checkInterval=null;this.Content;this.$el=e(t);this.$elProxy;this.elProxyPosition;this.enabled=true;this.options=e.extend({},i,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.Status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this._init()}function o(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function f(){return!a&&u}function l(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",i={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,debug:true,delay:200,minWidth:0,maxWidth:null,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},hideOnClick:false,icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,multiple:false,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,positionTrackerCallback:function(e){if(this.option("trigger")=="hover"&&this.option("autoClose")){this.hide()}},restoration:"current",speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};s.prototype={_init:function(){var t=this;if(n.querySelector){var r=null;if(t.$el.data("tooltipster-initialTitle")===undefined){r=t.$el.attr("title");if(r===undefined)r=null;t.$el.data("tooltipster-initialTitle",r)}if(t.options.content!==null){t._content_set(t.options.content)}else{t._content_set(r)}var i=t.options.functionInit.call(t.$el,t.$el,t.Content);if(typeof i!=="undefined")t._content_set(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!u&&t.options.iconDesktop||u&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=true;t._show()}}).on("mouseleave."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(u&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t._showNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!f()||t.options.touchDevices){t._show()}})}}},_show:function(){var e=this;if(e.Status!="shown"&&e.Status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e._showNow()}},e.options.delay)}else e._showNow()}},_showNow:function(n){var r=this;r.options.functionBefore.call(r.$el,r.$el,function(){if(r.enabled&&r.Content!==null){if(n)r.callbacks.show.push(n);r.callbacks.hide=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;if(r.options.onlyOne){e(".tooltipstered").not(r.$el).each(function(t,n){var r=e(n),i=r.data("tooltipster-ns");e.each(i,function(e,t){var n=r.data(t),i=n.status(),s=n.option("autoClose");if(i!=="hidden"&&i!=="disappearing"&&s){n.hide()}})})}var i=function(){r.Status="shown";e.each(r.callbacks.show,function(e,t){t.call(r.$el)});r.callbacks.show=[]};if(r.Status!=="hidden"){var s=0;if(r.Status==="disappearing"){r.Status="appearing";if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+r.options.animation+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.stop().fadeIn(i)}}else if(r.Status==="shown"){i()}}else{r.Status="appearing";var s=r.options.speed;r.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var o="tooltipster-"+r.options.animation,a="-webkit-transition-duration: "+r.options.speed+"ms; -webkit-animation-duration: "+r.options.speed+"ms; -moz-transition-duration: "+r.options.speed+"ms; -moz-animation-duration: "+r.options.speed+"ms; -o-transition-duration: "+r.options.speed+"ms; -o-animation-duration: "+r.options.speed+"ms; -ms-transition-duration: "+r.options.speed+"ms; -ms-animation-duration: "+r.options.speed+"ms; transition-duration: "+r.options.speed+"ms; animation-duration: "+r.options.speed+"ms;",f=r.options.minWidth?"min-width:"+Math.round(r.options.minWidth)+"px;":"",c=r.options.maxWidth?"max-width:"+Math.round(r.options.maxWidth)+"px;":"",h=r.options.interactive?"pointer-events: auto;":"";r.$tooltip=e('<div class="tooltipster-base '+r.options.theme+'" style="'+f+" "+c+" "+h+" "+a+'"><div class="tooltipster-content"></div></div>');if(l())r.$tooltip.addClass(o);r._content_insert();r.$tooltip.appendTo("body");r.reposition();r.options.functionReady.call(r.$el,r.$el,r.$tooltip);if(l()){r.$tooltip.addClass(o+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.css("display","none").fadeIn(r.options.speed,i)}r._interval_set();e(t).on("scroll."+r.namespace+" resize."+r.namespace,function(){r.reposition()});if(r.options.autoClose){e("body").off("."+r.namespace);if(r.options.trigger=="hover"){if(u){setTimeout(function(){e("body").on("touchstart."+r.namespace,function(){r.hide()})},0)}if(r.options.interactive){if(u){r.$tooltip.on("touchstart."+r.namespace,function(e){e.stopPropagation()})}var p=null;r.$elProxy.add(r.$tooltip).on("mouseleave."+r.namespace+"-autoClose",function(){clearTimeout(p);p=setTimeout(function(){r.hide()},r.options.interactiveTolerance)}).on("mouseenter."+r.namespace+"-autoClose",function(){clearTimeout(p)})}else{r.$elProxy.on("mouseleave."+r.namespace+"-autoClose",function(){r.hide()})}if(r.options.hideOnClick){r.$elProxy.on("click."+r.namespace+"-autoClose",function(){r.hide()})}}else if(r.options.trigger=="click"){setTimeout(function(){e("body").on("click."+r.namespace+" touchstart."+r.namespace,function(){r.hide()})},0);if(r.options.interactive){r.$tooltip.on("click."+r.namespace+" touchstart."+r.namespace,function(e){e.stopPropagation()})}}}}if(r.options.timer>0){r.timerHide=setTimeout(function(){r.timerHide=null;r.hide()},r.options.timer+s)}}})},_interval_set:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.Status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.Status=="shown"||t.Status=="appearing")t.hide();t._interval_cancel()}else{if(t.options.positionTracker){var n=t._repositionInfo(t.$elProxy),r=false;if(o(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(o(n.position,t.elProxyPosition.position))r=true}else{if(o(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.reposition();t.options.positionTrackerCallback.call(t,t.$el)}}}},200)},_interval_cancel:function(){clearInterval(this.checkInterval);this.checkInterval=null},_content_set:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.Content=e},_content_insert:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.Content==="string"&&!e.options.contentAsHTML){t.text(e.Content)}else{t.empty().append(e.Content)}},_update:function(e){var t=this;t._content_set(e);if(t.Content!==null){if(t.Status!=="hidden"){t._content_insert();t.reposition();if(t.options.updateAnimation){if(l()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.Status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hide()}},_repositionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},hide:function(n){var r=this;if(n)r.callbacks.hide.push(n);r.callbacks.show=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;var i=function(){e.each(r.callbacks.hide,function(e,t){t.call(r.$el)});r.callbacks.hide=[]};if(r.Status=="shown"||r.Status=="appearing"){r.Status="disappearing";var s=function(){r.Status="hidden";if(typeof r.Content=="object"&&r.Content!==null){r.Content.detach()}r.$tooltip.remove();r.$tooltip=null;e(t).off("."+r.namespace);e("body").off("."+r.namespace).css("overflow-x",r.bodyOverflowX);e("body").off("."+r.namespace);r.$elProxy.off("."+r.namespace+"-autoClose");r.options.functionAfter.call(r.$el,r.$el);i()};if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-"+r.options.animation+"-show").addClass("tooltipster-dying");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(s)}else{r.$tooltip.stop().fadeOut(r.options.speed,s)}}else if(r.Status=="hidden"){i()}return r},show:function(e){this._showNow(e);return this},update:function(e){return this.content(e)},content:function(e){if(typeof e==="undefined"){return this.Content}else{this._update(e);return this}},reposition:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n._repositionInfo(n.$elProxy);var r=null,i=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false);if(n.$elProxy.is("area")){var f=n.$elProxy.attr("shape"),l=n.$elProxy.parent().attr("name"),c=e('img[usemap="#'+l+'"]'),h=c.offset().left,p=c.offset().top,d=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(f=="circle"){var v=parseInt(d[0]),m=parseInt(d[1]),g=parseInt(d[2]);s.dimension.height=g*2;s.dimension.width=g*2;s.offset.top=p+m-g;s.offset.left=h+v-g}else if(f=="rect"){var v=parseInt(d[0]),m=parseInt(d[1]),y=parseInt(d[2]),b=parseInt(d[3]);s.dimension.height=b-m;s.dimension.width=y-v;s.offset.top=p+m;s.offset.left=h+v}else if(f=="poly"){var w=[],E=[],S=0,x=0,T=0,N=0,C="even";for(var k=0;k<d.length;k++){var L=parseInt(d[k]);if(C=="even"){if(L>T){T=L;if(k===0){S=T}}if(L<S){S=L}C="odd"}else{if(L>N){N=L;if(k==1){x=N}}if(L<x){x=L}C="even"}}s.dimension.height=N-x;s.dimension.width=T-S;s.offset.top=p+x;s.offset.left=h+S}else{s.dimension.height=c.outerHeight(false);s.dimension.width=c.outerWidth(false);s.offset.top=p;s.offset.left=h}}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var n=e(t).scrollLeft();if(A-n<0){r=A-n;A=n}if(A+o-n>i){r=A-(i+n-o);A=i+n-o}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A<0&&O+o>i){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;r="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A+o>i&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=i-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A+o>i){A=s.offset.left-D-o-12;r="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}if(!r){r=""}else if(r=="left"){R="tooltipster-arrow-right";r=""}else if(r=="right"){R="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var z=parseFloat(n.$tooltip.css("border-top-width")),W=n.$tooltip.css("border-top-color")}else if(P=="left"){var z=parseFloat(n.$tooltip.css("border-right-width")),W=n.$tooltip.css("border-right-color")}else if(P=="right"){var z=parseFloat(n.$tooltip.css("border-left-width")),W=n.$tooltip.css("border-left-color")}else{var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}if(z>1){z++}var X="";if(z!==0){var V="",J="border-color: "+W+";";if(R.indexOf("bottom")!==-1){V="margin-top: -"+Math.round(z)+"px;"}else if(R.indexOf("top")!==-1){V="margin-bottom: -"+Math.round(z)+"px;"}else if(R.indexOf("left")!==-1){V="margin-right: -"+Math.round(z)+"px;"}else if(R.indexOf("right")!==-1){V="margin-left: -"+Math.round(z)+"px;"}X='<span class="tooltipster-arrow-border" style="'+V+" "+J+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var K='<div class="'+R+' tooltipster-arrow" style="'+r+'">'+X+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(K)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}return n},enable:function(){this.enabled=true;return this},disable:function(){this.hide();this.enabled=false;return this},destroy:function(){var t=this;t.hide();if(t.$el[0]!==t.$elProxy[0]){t.$elProxy.remove()}t.$el.removeData(t.namespace).off("."+t.namespace);var n=t.$el.data("tooltipster-ns");if(n.length===1){var r=null;if(t.options.restoration==="previous"){r=t.$el.data("tooltipster-initialTitle")}else if(t.options.restoration==="current"){r=typeof t.Content==="string"?t.Content:e("<div></div>").append(t.Content).html()}if(r){t.$el.attr("title",r)}t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else{n=e.grep(n,function(e,n){return e!==t.namespace});t.$el.data("tooltipster-ns",n)}return t},elementIcon:function(){return this.$el[0]!==this.$elProxy[0]?this.$elProxy[0]:undefined},elementTooltip:function(){return this.$tooltip?this.$tooltip[0]:undefined},option:function(e,t){if(typeof t=="undefined")return this.options[e];else{this.options[e]=t;return this}},status:function(){return this.Status}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(i,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster-ns"),i=n?e(this).data(n[0]):null;if(i){if(typeof i[t[0]]==="function"){var s=i[t[0]](t[1],t[2])}else{throw new Error('Unknown method .tooltipster("'+t[0]+'")')}if(s!==i){r=s;return false}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{var o=[],u=t[0]&&typeof t[0].multiple!=="undefined",a=u&&t[0].multiple||!u&&i.multiple,f=t[0]&&typeof t[0].debug!=="undefined",l=f&&t[0].debug||!f&&i.debug;this.each(function(){var n=false,r=e(this).data("tooltipster-ns"),i=null;if(!r){n=true}else if(a){n=true}else if(l){console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')}if(n){i=new s(this,t[0]);if(!r)r=[];r.push(i.namespace);e(this).data("tooltipster-ns",r);e(this).data(i.namespace,i)}o.push(i)});if(a)return o;else return this}}};var u=!!("ontouchstart"in t);var a=false;e("body").one("mousemove",function(){a=true})})(jQuery,window,document);