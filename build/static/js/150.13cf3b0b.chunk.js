/*! For license information please see 150.13cf3b0b.chunk.js.LICENSE.txt */
(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[150],{2148:function(e,t,n){"use strict";n.r(t);var r=n(43),a=n(3),o=n(83),l=n(42),i=n(28),c=n(0),u=n.n(c),s=n(304),m=n(430),f=n(59),d=n(849),p=n.n(d);function h(){h=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",l=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(P){c=function(e,t,n){return e[t]=n}}function u(e,t,n,a){var o=t&&t.prototype instanceof f?t:f,l=Object.create(o.prototype),i=new k(a||[]);return r(l,"_invoke",{value:w(e,n,i)}),l}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(P){return{type:"throw",arg:P}}}e.wrap=u;var m={};function f(){}function d(){}function p(){}var v={};c(v,o,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(O([])));b&&b!==t&&n.call(b,o)&&(v=b);var y=p.prototype=f.prototype=Object.create(v);function _(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){var a;r(this,"_invoke",{value:function(r,o){function l(){return new t((function(a,l){!function r(a,o,l,i){var c=s(e[a],e,o);if("throw"!==c.type){var u=c.arg,m=u.value;return m&&"object"==typeof m&&n.call(m,"__await")?t.resolve(m.__await).then((function(e){r("next",e,l,i)}),(function(e){r("throw",e,l,i)})):t.resolve(m).then((function(e){u.value=e,l(u)}),(function(e){return r("throw",e,l,i)}))}i(c.arg)}(r,o,a,l)}))}return a=a?a.then(l,l):l()}})}function w(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return L()}for(n.method=a,n.arg=o;;){var l=n.delegate;if(l){var i=N(l,n);if(i){if(i===m)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=s(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===m)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function N(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,N(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var a=s(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,m;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function O(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:L}}function L(){return{value:void 0,done:!0}}return d.prototype=p,r(y,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:d,configurable:!0}),d.displayName=c(p,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,i,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},_(E.prototype),c(E.prototype,l,(function(){return this})),e.AsyncIterator=E,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var l=new E(u(t,n,r,a),o);return e.isGeneratorFunction(n)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},_(y),c(y,i,"Generator"),c(y,o,(function(){return this})),c(y,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=O,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return l.type="throw",l.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],l=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),j(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;j(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:O(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),m}},e}t.default=function(){var e,t,n=Object(f.g)(),d=Object(c.useState)(!1),v=Object(l.a)(d,2),g=v[0],b=v[1],y=Object(c.useState)(null),_=Object(l.a)(y,2),E=_[0],w=_[1],N=Object(c.useState)(null),x=Object(l.a)(N,2),j=x[0],k=x[1],O=Object(c.useState)({Project:null,buildingName:null,total_number_of_floors:null,total_number_of_flats:null,parkings:null,id:null}),L=Object(l.a)(O,2),P=L[0],C=L[1],S=function(){var e=Object(o.a)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("https://growbuild.onrender.com/api/all/project",{Headers:{"Content-Type":"application/json"}});case 2:t=e.sent,k(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){S()}),[]),console.log(j);var F=function(n){e=n.target.name,t=n.target.value,C(Object(a.a)(Object(a.a)({},P),{},Object(r.a)({},e,t)))},T=function(){var e=Object(o.a)(h().mark((function e(){return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("https://growbuild.onrender.com/api/create/building",{Project:P.Project,buildingName:P.buildingName,total_number_of_floors:P.total_number_of_floors,total_number_of_flats:P.total_number_of_flats,parkings:P.parkings});case 2:200===e.sent.status&&(window.alert("Building Upload Done!"),n.go(0));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(o.a)(h().mark((function e(t){var n;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p()({title:"Are you sure?",text:"Are you sure that you want to delete this Block?",icon:"warning",dangerMode:!0});case 2:if(!(n=e.sent)){e.next=8;break}return e.next=6,i.a.delete("https://growbuild.onrender.com/api/delete/building/"+t,{Headers:{"Content-Type":"application/json"}});case 6:e.sent,B();case 8:n();case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(o.a)(h().mark((function e(t){return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.put("https://growbuild.onrender.com/api/update/building/"+t,{Project:P.Project,buildingName:P.buildingName,total_number_of_floors:P.total_number_of_floors,total_number_of_flats:P.total_number_of_flats,parkings:P.parkings});case 2:200===e.sent.status&&(p()("Building Updated successfully!","success"),n.go(0));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(o.a)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("https://growbuild.onrender.com/api/all/building",{Headers:{"Content-Type":"application/json"}});case 2:t=e.sent,w(t.data),console.log(t.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){B()}),[]),u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"container bg-white p-2 rounded-2"},u.a.createElement("form",{className:"row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg"},u.a.createElement("h3",{className:"text-alternate text-primary"},"Create Building"),u.a.createElement("hr",null),u.a.createElement("div",{className:"col-md-6 col-12 mb-2"},u.a.createElement("p",{className:"text-alternate"},"Select Project"),u.a.createElement("div",{className:"input-group"},u.a.createElement("select",{className:"form-control",id:"project",name:"Project",onChange:F,value:P.Project},null===j?u.a.createElement("option",{name:null,value:null},"Loading"):u.a.createElement("option",{name:null,value:null},"Select Project"),null!==j&&0===(null===j||void 0===j?void 0:j.length)&&u.a.createElement("option",{name:null,value:null},"No projects are Avialable"),null!==j&&(null===j||void 0===j?void 0:j.length)>0&&j.map((function(e){return u.a.createElement("option",{name:null===e||void 0===e?void 0:e._id,value:null===e||void 0===e?void 0:e._id},null===e||void 0===e?void 0:e.Name)}))))),u.a.createElement("div",{className:"col-md-6 col-12 mb-2"},u.a.createElement("p",{className:"text-alternate"},"Building Name"),u.a.createElement("div",{className:"input-group"},u.a.createElement("input",{type:"text",className:"form-control",id:"projectName",name:"buildingName",onChange:F,value:P.buildingName,required:""}))),u.a.createElement("div",{className:"col-md-6 col-12 mb-2"},u.a.createElement("p",{className:"text-alternate"},"Total No of Floors"),u.a.createElement("div",{className:"input-group"},u.a.createElement("input",{type:"number",className:"form-control",id:"floors",name:"total_number_of_floors",onChange:F,value:P.total_number_of_floors,required:""}))),u.a.createElement("div",{className:"col-md-6 col-12 mb-2"},u.a.createElement("p",{className:"text-alternate"},"Total No Of Flats"),u.a.createElement("div",{className:"input-group"},u.a.createElement("input",{type:"number",className:"form-control",id:"flats",name:"total_number_of_flats",onChange:F,value:P.total_number_of_flats,required:""}))),u.a.createElement("div",{className:"col-md-6 col-12 mb-2"},u.a.createElement("p",{className:"text-center"},"Parkings"),u.a.createElement("div",{className:"input-group"},u.a.createElement("span",{className:"input-group-text"},u.a.createElement("input",{"aria-label":"Parkings",id:"isParkings",name:"isParkings",type:"radio",className:"form-check-input"})),u.a.createElement("input",{"aria-label":"No Of Parking",placeholder:"Enter Total No Of Parkings",className:"form-control",id:"parkings",name:"parkings",onChange:F,value:P.parkings}))),u.a.createElement("div",{className:"col-md-12 col-12 text-right"},g?u.a.createElement(u.a.Fragment,null,u.a.createElement("button",{type:"button",class:"btn btn-outline-warning btn-md mb-1 mr-1",onClick:function(){C(Object(a.a)(Object(a.a)({},P),{},{Project:null,buildingName:null,total_number_of_floors:null,total_number_of_flats:null,parkings:null,id:null})),b(!1)}}," Exit "),u.a.createElement("button",{type:"button",class:"btn btn-outline-primary btn-md mb-1 mr-1",onClick:function(){return A(null===P||void 0===P?void 0:P.id)}}," Update ")):u.a.createElement("button",{type:"button",class:"btn btn-outline-primary btn-md mb-1 mr-1",onClick:function(){return T()}}," Create "))),!g&&u.a.createElement("form",{className:"row px-4 py-4 mx-2 my-2 shadow-lg needs-validation",novalidate:!0},u.a.createElement("h3",{className:"text-alternate text-primary"},"All Blocks"),u.a.createElement("div",{className:"d-flex justify-content-center"},u.a.createElement("table",{className:"table table-striped table-responsive"},u.a.createElement("tr",null,u.a.createElement("th",null,"Sno"),u.a.createElement("th",null,"Building Name"),u.a.createElement("th",null,"Flats"),u.a.createElement("th",null,"Floor"),u.a.createElement("th",null,"Action")),null===E||void 0===E?void 0:E.map((function(e,t){var n=null===e||void 0===e?void 0:e._id;return u.a.createElement("tr",null,u.a.createElement("td",null,t+1),u.a.createElement("td",null,null===e||void 0===e?void 0:e.buildingName),u.a.createElement("td",null,null===e||void 0===e?void 0:e.total_number_of_flats),u.a.createElement("td",null,null===e||void 0===e?void 0:e.total_number_of_floors),u.a.createElement("td",null,u.a.createElement(s.a,{className:"cursor-pointer",color:"green",size:30,onClick:function(){var t;t=e,C(Object(a.a)(Object(a.a)({},P),{},{Project:null===t||void 0===t?void 0:t.Project,buildingName:null===t||void 0===t?void 0:t.buildingName,total_number_of_floors:null===t||void 0===t?void 0:t.total_number_of_floors,total_number_of_flats:null===t||void 0===t?void 0:t.total_number_of_flats,parkings:null===t||void 0===t?void 0:t.parkings,id:null===t||void 0===t?void 0:t._id})),b(!0)}}),u.a.createElement(m.a,{className:"cursor-pointer",color:"red",size:30,onClick:function(){G(n)}})))})))))))}}}]);
//# sourceMappingURL=150.13cf3b0b.chunk.js.map