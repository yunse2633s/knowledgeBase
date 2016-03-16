它是为Meteor设计的一套在服务器和浏览器端工作的路由器，你可以定义一个路由，只在服务端运行或只在客户端运行。
##安装
<code>meteor add iron:router</code>
##应用
###创建客户端路由
`
Router.route('/', function () {
	this.render('Home');
});
`
>注释::当用户导航栏地址为URL根目录，则在该页面执行模板名为“Home”的代码块。
###创建服务端路由

Router.route('/item', function () {  
 var req = this.request;  
 var res = this.response; 
 res.end('hello from the server\n');
},
>注释::`where:'server'`选项告诉路由器，这是服务器端路由。

##路由参数
### 获取一个像 "/post/5/comments/100"的地址
`
Router.route('/post/:_id/comments/:commentId', function () {
	var id = this.params._id; // "5" 
	var commentId = this.params.commentId; // "100"
});
`
>注释::参数的实际值将被存储在你的路由函数`this.param`属性中
###获取一个像"/post/5?q=s#hashFrag"的地址
`
Router.route('/post/:_id', function () {
	var id = this.params._id; 
	var query = this.params.query;  // query.q -> "s"
	var hash = this.params.hash; // "hashFrag"
});
`
>注释::你可以通过`this.params`对象获取query和hash属性。




