(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),u=t(1),r=t(15),a=t.n(r),i=t(6),o=t(3),s=function(e){var n=e.value,t=e.changeFunction;return Object(c.jsx)("div",{children:Object(c.jsx)("input",{type:"text",value:n,onChange:t})})},l=function(e){var n=e.submitFunction,t=e.nameChangeFunction,u=e.numberChangeFunction,r=e.newNumber,a=e.newName;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["Name: ",Object(c.jsx)("input",{type:"text",value:a,onChange:t})]}),Object(c.jsxs)("div",{children:["Number: ",Object(c.jsx)("input",{type:"tel",value:r,onChange:u})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},j=function(e){var n=e.persons,t=e.deleteFunction;return Object(c.jsx)(c.Fragment,{children:n.map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:[e.name," ",e.number]}),Object(c.jsx)("button",{onClick:function(){return t(e.id)},children:"Remove"})]},e.id)}))})},d=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"messageBox",children:Object(c.jsx)("p",{children:n})})},b=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"errorBox",children:Object(c.jsx)("p",{children:n})})},f=t(4),h=t.n(f),m="/api/persons",O=function(){return h.a.get(m).then((function(e){return e.data}))},v=function(e){return h.a.post(m,e).then((function(e){return e.data}))},x=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},g=(t(39),function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(u.useState)(""),f=Object(o.a)(a,2),h=f[0],m=f[1],g=Object(u.useState)(""),w=Object(o.a)(g,2),F=w[0],C=w[1],y=Object(u.useState)(""),N=Object(o.a)(y,2),k=N[0],S=N[1],T=Object(u.useState)(null),B=Object(o.a)(T,2),A=B[0],E=B[1],J=Object(u.useState)(null),L=Object(o.a)(J,2),P=L[0],R=L[1],D=t.filter((function(e){var n=k.toLowerCase();return e.name.toLowerCase().includes(n)}));return Object(u.useEffect)((function(){O().then((function(e){r(e)})).catch((function(e){R("".concat(e," returned from server.")),setTimeout((function(){R(null)}),6e3)}))}),[]),Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(d,{message:A}),Object(c.jsx)(b,{message:P}),Object(c.jsx)(s,{value:k,changeFunction:function(e){S(e.target.value)}}),Object(c.jsx)("h3",{children:"Add a new person"}),Object(c.jsx)(l,{submitFunction:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(h)){if(window.confirm("".concat(h," is already in the Phonebook, replace the old number with the new one?"))){var n=t.find((function(e){return e.name===h})),c=n.id,u=Object(i.a)(Object(i.a)({},n),{},{number:F});x(c,u).then((function(e){r(t.map((function(n){return n.id!==u.id?n:e}))),E("".concat(n.name,"'s entry has been updated!")),setTimeout((function(){E(null)}),5e3)})).catch((function(){m(""),C(""),r(t.filter((function(e){return e.id!==c}))),R("".concat(n.name," has already been deleted!")),setTimeout((function(){R(null)}),6e3)}))}}else{var a={name:h,number:F};v(a).then((function(e){r(t.concat(e)),m(""),C(""),E("".concat(a.name," added successfully!")),setTimeout((function(){E(null)}),5e3)})).catch((function(e){alert("[".concat(e,"] returned from the server."))}))}},nameChangeFunction:function(e){m(e.target.value)},numberChangeFunction:function(e){C(e.target.value)},newName:h,newNumber:F}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(j,{persons:D,deleteFunction:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Remove ".concat(n.name,"?"))&&p(e).then((function(){r(t.filter((function(n){return n.id!==e})))})).catch((function(e){alert("[".concat(e,"] returned from the server."))}))}})]})});a.a.render(Object(c.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.d2771bc3.chunk.js.map