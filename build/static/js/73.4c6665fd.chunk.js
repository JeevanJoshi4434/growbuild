(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[73],{2132:function(e,a,t){e.exports=t.p+"static/media/forgot-password.63f5a96a.png"},2195:function(e,a,t){"use strict";t.r(a);var n=t(12),s=t(13),o=t(17),r=t(16),c=t(0),l=t.n(c),i=t(1097),d=t(1098),u=t(1099),p=t(1100),f=t(1101),m=t(1102),b=t(773),h=t(752),g=t(745),y=t(757),v=t(174),j=t(2132),O=t.n(j),N=t(27),E=(t(882),function(e){Object(o.a)(t,e);var a=Object(r.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(i.a,{className:"m-0 justify-content-center"},l.a.createElement(d.a,{sm:"8",xl:"7",lg:"10",md:"8",className:"d-flex justify-content-center"},l.a.createElement(u.a,{className:"bg-authentication rounded-0 mb-0 w-100"},l.a.createElement(i.a,{className:"m-0"},l.a.createElement(d.a,{lg:"6",className:"d-lg-block d-none text-center align-self-center"},l.a.createElement("img",{src:O.a,alt:"fgImg"})),l.a.createElement(d.a,{lg:"6",md:"12",className:"p-0"},l.a.createElement(u.a,{className:"rounded-0 mb-0 px-2 py-1"},l.a.createElement(p.a,{className:"pb-1"},l.a.createElement(f.a,null,l.a.createElement("h4",{className:"mb-0"},"Recover your password"))),l.a.createElement("p",{className:"px-2 auth-title"},"Please enter your email address and we'll send you instructions on how to reset your password."),l.a.createElement(m.a,{className:"pt-1 pb-0"},l.a.createElement(b.a,null,l.a.createElement(h.a,{className:"form-label-group"},l.a.createElement(g.a,{type:"text",placeholder:"Email",required:!0}),l.a.createElement(y.a,null,"Email")),l.a.createElement("div",{className:"float-md-left d-block mb-1"},l.a.createElement(v.a.Ripple,{color:"primary",outline:!0,className:"px-75 btn-block",onClick:function(){return N.a.push("/pages/login")}},"Back to Login")),l.a.createElement("div",{className:"float-md-right d-block mb-1"},l.a.createElement(v.a.Ripple,{color:"primary",type:"submit",className:"px-75 btn-block",onClick:function(e){e.preventDefault(),N.a.push("/")}},"Recover Password"))))))))))}}]),t}(l.a.Component));a.default=E},745:function(e,a,t){"use strict";var n=t(7),s=t(14),o=t(26),r=t(19),c=t(0),l=t.n(c),i=t(2),d=t.n(i),u=t(18),p=t.n(u),f=t(5),m=["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"],b={children:d.a.node,type:d.a.string,size:d.a.oneOfType([d.a.number,d.a.string]),bsSize:d.a.string,valid:d.a.bool,invalid:d.a.bool,tag:f.tagPropType,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),plaintext:d.a.bool,addon:d.a.bool,className:d.a.string,cssModule:d.a.object},h=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(o.a)(t)),t.focus=t.focus.bind(Object(o.a)(t)),t}Object(r.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.focus=function(){this.ref&&this.ref.focus()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,o=e.type,r=e.bsSize,c=e.valid,i=e.invalid,d=e.tag,u=e.addon,b=e.plaintext,h=e.innerRef,g=Object(s.a)(e,m),y=["radio","checkbox"].indexOf(o)>-1,v=new RegExp("\\D","g"),j=d||("select"===o||"textarea"===o?o:"input"),O="form-control";b?(O+="-plaintext",j=d||"input"):"file"===o?O+="-file":"range"===o?O+="-range":y&&(O=u?null:"form-check-input"),g.size&&v.test(g.size)&&(Object(f.warnOnce)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),r=g.size,delete g.size);var N=Object(f.mapToCssModules)(p()(a,i&&"is-invalid",c&&"is-valid",!!r&&"form-control-"+r,O),t);return("input"===j||d&&"function"===typeof d)&&(g.type=o),g.children&&!b&&"select"!==o&&"string"===typeof j&&"select"!==j&&(Object(f.warnOnce)('Input with a type of "'+o+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete g.children),l.a.createElement(j,Object(n.a)({},g,{ref:h,className:N,"aria-invalid":i}))},a}(l.a.Component);h.propTypes=b,h.defaultProps={type:"text"},a.a=h},752:function(e,a,t){"use strict";var n=t(7),s=t(14),o=t(0),r=t.n(o),c=t(2),l=t.n(c),i=t(18),d=t.n(i),u=t(5),p=["className","cssModule","row","disabled","check","inline","tag"],f={children:l.a.node,row:l.a.bool,check:l.a.bool,inline:l.a.bool,disabled:l.a.bool,tag:u.tagPropType,className:l.a.string,cssModule:l.a.object},m=function(e){var a=e.className,t=e.cssModule,o=e.row,c=e.disabled,l=e.check,i=e.inline,f=e.tag,m=Object(s.a)(e,p),b=Object(u.mapToCssModules)(d()(a,!!o&&"row",l?"form-check":"form-group",!(!l||!i)&&"form-check-inline",!(!l||!c)&&"disabled"),t);return"fieldset"===f&&(m.disabled=c),r.a.createElement(f,Object(n.a)({},m,{className:b}))};m.propTypes=f,m.defaultProps={tag:"div"},a.a=m},757:function(e,a,t){"use strict";var n=t(7),s=t(14),o=t(0),r=t.n(o),c=t(2),l=t.n(c),i=t(18),d=t.n(i),u=t(5),p=["className","cssModule","hidden","widths","tag","check","size","for"],f=l.a.oneOfType([l.a.number,l.a.string]),m=l.a.oneOfType([l.a.bool,l.a.string,l.a.number,l.a.shape({size:f,order:f,offset:f})]),b={children:l.a.node,hidden:l.a.bool,check:l.a.bool,size:l.a.string,for:l.a.string,tag:u.tagPropType,className:l.a.string,cssModule:l.a.object,xs:m,sm:m,md:m,lg:m,xl:m,widths:l.a.array},h={tag:"label",widths:["xs","sm","md","lg","xl"]},g=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},y=function(e){var a=e.className,t=e.cssModule,o=e.hidden,c=e.widths,l=e.tag,i=e.check,f=e.size,m=e.for,b=Object(s.a)(e,p),h=[];c.forEach((function(a,n){var s=e[a];if(delete b[a],s||""===s){var o,r=!n;if(Object(u.isObject)(s)){var c,l=r?"-":"-"+a+"-";o=g(r,a,s.size),h.push(Object(u.mapToCssModules)(d()(((c={})[o]=s.size||""===s.size,c["order"+l+s.order]=s.order||0===s.order,c["offset"+l+s.offset]=s.offset||0===s.offset,c))),t)}else o=g(r,a,s),h.push(o)}}));var y=Object(u.mapToCssModules)(d()(a,!!o&&"sr-only",!!i&&"form-check-label",!!f&&"col-form-label-"+f,h,!!h.length&&"col-form-label"),t);return r.a.createElement(l,Object(n.a)({htmlFor:m},b,{className:y}))};y.propTypes=b,y.defaultProps=h,a.a=y},773:function(e,a,t){"use strict";var n=t(7),s=t(14),o=t(26),r=t(19),c=t(0),l=t.n(c),i=t(2),d=t.n(i),u=t(18),p=t.n(u),f=t(5),m=["className","cssModule","inline","tag","innerRef"],b={children:d.a.node,inline:d.a.bool,tag:f.tagPropType,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),className:d.a.string,cssModule:d.a.object},h=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(o.a)(t)),t.submit=t.submit.bind(Object(o.a)(t)),t}Object(r.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.submit=function(){this.ref&&this.ref.submit()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,o=e.inline,r=e.tag,c=e.innerRef,i=Object(s.a)(e,m),d=Object(f.mapToCssModules)(p()(a,!!o&&"form-inline"),t);return l.a.createElement(r,Object(n.a)({},i,{ref:c,className:d}))},a}(c.Component);h.propTypes=b,h.defaultProps={tag:"form"},a.a=h},882:function(e,a,t){}}]);
//# sourceMappingURL=73.4c6665fd.chunk.js.map