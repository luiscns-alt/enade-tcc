"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[15],{48384:function(N,U,n){var B=n(27424),w=n.n(B),b=n(93572),h=n(62536),K=n(3533),M=n(1051),v=n(13510),F=n(18742),D=n(22526),y=n(79166),u=n(27049),c=n(7277),d=n(97880),s=n(71577),m=n(69449),g=n(67294),Z=n(26495),e=n(85893),T=function(C){var j,O,z=C.formRef,k=C.modalVisible,r=C.initialValues,L=(0,g.useState)(0),W=w()(L,2),E=W[0],$=W[1],R=r==null?void 0:r.questionsResponse.map(function(_){var x,a,t,i,o=(x=_.question)===null||x===void 0||(a=x.answers)===null||a===void 0?void 0:a.find(function(p){return p.id===_.selectedAnswerId}),f=_.question,l=(t=_.question)===null||t===void 0||(i=t.answers)===null||i===void 0?void 0:i.filter(function(p){return p.isCorrect});return{answer:o,question:f,isCorrect:l}});console.log(R);var V=function(x){var a=x.value;return(0,e.jsx)(y.Z,{title:"sds",status:a?"success":"error",text:a?"Certo":"Errado",children:a?(0,e.jsx)(h.Z,{twoToneColor:"#52c41a"}):(0,e.jsx)(K.Z,{twoToneColor:"#f5222d"})})},P=R==null?void 0:R.map(function(_,x){var a,t,i,o,f,l;return{title:"Step ".concat(x+1),content:(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(M.Z,{title:"".concat(x+1," - ").concat((a=_.question)===null||a===void 0?void 0:a.title),bordered:!0,children:(0,e.jsxs)(v.vY,{column:1,children:[(o=_.question)===null||o===void 0||(f=o.answers)===null||f===void 0?void 0:f.map(function(p){var G,I;return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(v.vY.Item,{valueType:"text",style:{marginLeft:"1rem"},children:[p.isCorrect&&(0,e.jsx)(V,{value:p.isCorrect}),(_==null||(G=_.answer)===null||G===void 0?void 0:G.id)===p.id&&(0,e.jsx)(V,{value:(I=_.answer)===null||I===void 0?void 0:I.isCorrect}),(0,e.jsx)("span",{style:{marginLeft:"1rem",marginRight:"3rem"},children:p.text}),(0,e.jsx)("br",{})]},p.id)})}),(0,e.jsx)(u.Z,{}),(0,e.jsx)(v.vY.Item,{label:"Resposta Selecionada pelo Usu\xE1rio",valueType:"text",children:" "}),(0,e.jsx)(v.vY.Item,{valueType:"text",children:(l=_.answer)===null||l===void 0?void 0:l.text})]},(i=_.question)===null||i===void 0?void 0:i.id)},(t=_.question)===null||t===void 0?void 0:t.id)})}}),S=function(){$(E+1)},Q=function(){$(E-1)},Y=function(x){x.key==="ArrowLeft"&&E>0?Q():x.key==="ArrowRight"&&P&&E<P.length-1&&S()};(0,g.useEffect)(function(){return window.addEventListener("keydown",Y),function(){window.removeEventListener("keydown",Y)}},[E,P]);var q=["January","February","March","April","May","June","July"],J={labels:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio"],datasets:[{label:"Vendas Mensais",data:[12,19,3,5,2],backgroundColor:"rgba(75, 192, 192, 0.6)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]};m.kL.register(m.uw,m.f$,m.ZL,m.Dx,m.u,m.De);var H={responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Chart.js Bar Chart"}}};return(0,e.jsxs)(D.Y,{title:"Resumo",width:"800px",formRef:z,visible:k,initialValues:r,onVisibleChange:C.onVisibleChange,onFinish:C.onFinish,submitter:{submitButtonProps:{style:{display:"none"}}},children:[(0,e.jsx)(M.Z,{title:"Informa\xE7\xF5es do Usuario",bordered:!0,children:(0,e.jsxs)(v.vY,{column:1,children:[(0,e.jsx)(v.vY.Item,{label:"ID",valueType:"text",children:r==null?void 0:r.id}),(0,e.jsxs)(v.vY.Item,{label:"Nome",valueType:"text",children:[r==null?void 0:r.user.name," ",r==null?void 0:r.user.surname]}),(0,e.jsx)(v.vY.Item,{label:"User",valueType:"text",children:r==null?void 0:r.user.login})]})}),(0,e.jsx)(M.Z,{title:"Informa\xE7\xF5es do Question\xE1rio",bordered:!0,children:(0,e.jsxs)(v.vY,{column:1,children:[(0,e.jsx)(v.vY.Item,{label:"T\xEDtulo",valueType:"text",children:r==null?void 0:r.quiz.title}),(0,e.jsx)(v.vY.Item,{label:"Descri\xE7\xE3o",valueType:"text",children:r==null?void 0:r.quiz.description}),(0,e.jsx)(v.vY.Item,{label:"Criado em",valueType:"text",children:(r==null||(j=r.quiz)===null||j===void 0?void 0:j.createdAt)&&(0,b.p6)(r.quiz.createdAt)}),(0,e.jsx)(v.vY.Item,{label:"Atualizado em",valueType:"text",children:(r==null||(O=r.quiz)===null||O===void 0?void 0:O.updatedAt)&&(0,b.p6)(r.quiz.updatedAt)})]})}),(0,e.jsx)(M.Z,{title:"Informa\xE7\xF5es do Question\xE1rio",bordered:!0,children:(0,e.jsx)(v.vY,{column:1,children:(0,e.jsx)(F.Z.Group,{direction:"row",children:(0,e.jsx)(F.Z,{statistic:{title:"\u514D\u8D39\u6D41\u91CF",value:1806062,description:(0,e.jsx)(c.Z,{title:"\u5360\u6BD4",value:"98.5%"})},chart:(0,e.jsx)(Z.$Q,{data:J,options:H}),chartPlacement:"left"})})})}),(0,e.jsxs)(u.Z,{children:["Total de Respostas: ","".concat(R==null?void 0:R.length)]}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(d.Z,{current:E}),(0,e.jsx)("div",{children:R&&P&&E<R.length&&P[E]&&P[E].content}),(0,e.jsxs)("div",{style:{marginTop:24,display:"flex",justifyContent:"center"},children:[(0,e.jsx)(s.Z,{style:{margin:"0 8px"},onClick:function(){return Q()},disabled:E<=0,children:"Anterior"}),(0,e.jsx)(s.Z,{type:"primary",onClick:function(){return S()},disabled:!(P&&E<P.length-1),children:"Pr\xF3ximo"})]})]})]})};U.Z=T},24628:function(N,U,n){n.r(U);var B=n(27424),w=n.n(B),b=n(17061),h=n.n(b),K=n(17156),M=n.n(K),v=n(36356),F=n(21762),D=n(67294),y=n(59841),u=n(54488),c=n(21023),d=n(48384),s=n(85893),m=null,g=function(){var e=M()(h()().mark(function T(A,C){return h()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:case"end":return O.stop()}},T)}));return function(A,C){return e.apply(this,arguments)}}(),Z=function(){var T=(0,D.useState)(!1),A=w()(T,2),C=A[0],j=A[1],O=(0,D.useState)(),z=w()(O,2),k=z[0],r=z[1],L=(0,D.useRef)(),W=(0,D.useRef)(),E=(0,D.useState)(""),$=w()(E,2),R=$[0],V=$[1],P=(0,D.useState)([]),S=w()(P,2),Q=S[0],Y=S[1],q=(0,y.useIntl)(),J=(0,y.useModel)("@@initialState"),H=J.initialState,_=function(){var a=M()(h()().mark(function t(){return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:console.log("Limpar Store");case 1:case"end":return o.stop()}},t)}));return function(){return a.apply(this,arguments)}}(),x=[{title:"ID",dataIndex:"id",sorter:!0,search:!1,copyable:!0,width:"25%"},{title:"Nome",dataIndex:"user",sorter:!0,defaultSortOrder:"ascend",width:"35%",render:function(t){return[(0,s.jsx)("div",{children:t.name},"user")]}},{title:"T\xEDtulo da Question\xE1rio",dataIndex:"quiz",sorter:!0,width:"35%",render:function(t){return[(0,s.jsx)("div",{children:t.title},"quiz")]}},{title:"A\xE7\xF5es",dataIndex:"option",valueType:"option",width:"5%",render:function(t,i){return[(0,s.jsx)("a",{onClick:function(){j(!0),r(i)},children:(0,s.jsx)(y.FormattedMessage,{id:"app.generic.view-more",defaultMessage:"Ver mais"})},"config")]}}];return(0,s.jsxs)(v._z,{children:[(0,s.jsx)(c.ZP,{headerTitle:"Lista dos Questionarios Respondidos",actionRef:L,rowKey:"id",pagination:{pageSize:10,pageSizeOptions:[10,20,50,100],showSizeChanger:!0},toolbar:{search:{onSearch:function(t){var i,o,f,l;console.log("SearchBy",t),V(t),(i=L.current)===null||i===void 0||(o=i.clearSelected)===null||o===void 0||o.call(i),(f=L.current)===null||f===void 0||(l=f.reloadAndRest)===null||l===void 0||l.call(f)}}},search:!1,request:function(){var a=M()(h()().mark(function t(i,o){var f,l,p;return h()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return f=Object.keys(o)[0],l="",f&&(l=f+" ",o[f]=="descend"?l+="desc":l+="asc"),I.next=5,(0,u.Es)();case 5:return p=I.sent,console.log("tableRequest",p),I.abrupt("return",{data:p.data,success:p.success,total:p.total});case 8:case"end":return I.stop()}},t)}));return function(t,i){return a.apply(this,arguments)}}(),columns:x,rowSelection:{onChange:function(t,i){Y(i)}}}),(0,s.jsx)(d.Z,{initialValues:k,formRef:W,modalVisible:C,onVisibleChange:function(){var a=M()(h()().mark(function t(i){var o;return h()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:j(i),(o=W.current)===null||o===void 0||o.resetFields();case 2:case"end":return l.stop()}},t)}));return function(t){return a.apply(this,arguments)}}(),onFinish:function(){var a=M()(h()().mark(function t(i){var o;return h()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,g(q,i);case 2:o=l.sent,o&&(j(!1),L.current&&L.current.reload());case 4:case"end":return l.stop()}},t)}));return function(t){return a.apply(this,arguments)}}()})]})};U.default=Z},93572:function(N,U,n){n.d(U,{PM:function(){return K},p6:function(){return y},s3:function(){return D}});var B=n(17061),w=n.n(B),b=n(17156),h=n.n(b);function K(u,c){var d={id:u.id,title:u.title,type:u.type,image:u.image,quizId:u.quizId,answers:[]};if(u&&u.answers)for(var s=0;s<u.answers.length;s++){var m="answer_".concat(s),g="isCorrect_".concat(s);d&&d.answers&&c[m]!==void 0&&c[g]!==void 0&&d.answers.push({id:u.answers[s].id,text:c[m],isCorrect:c[g],questionId:u.id})}return d}var M=null,v=null,F=null,D=function(c,d){return c.map(function(s){return"'".concat(s[d],"'")})},y=function(c){var d=new Date(c),s=String(d.getDate()).padStart(2,"0"),m=String(d.getMonth()+1).padStart(2,"0"),g=d.getFullYear();return"".concat(s,"/").concat(m,"/").concat(g)}},21762:function(){}}]);
