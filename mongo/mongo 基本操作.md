##mongo 基本操作

###链接数据库：

`mongo 127.0.0.1`

###输入help可以看到基本操作命令：
`show dbs`:显示数据库列表 
`show collections`：显示当前数据库中的集合（类似关系数据库中的表） 
`show users`：显示用户
`use <db name>`：切换当前数据库，这和MS-SQL里面的意思一样 
`db.help()`：显示数据库操作命令，里面有很多的命令 
`db.foo.help()`：显示集合操作命令，同样有很多的命令，foo指的是当前数据库下，一个叫foo的集合，并非真正意义上的命令 
`db.foo.find()`：对于当前数据库中的foo集合进行数据查找（由于没有条件，会列出所有数据） 
`db.foo.find( { a : 1 } )`：对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1

###创建数据库
`use mySql`
###切换数据
`use otherSql`

### 查看命令

#### help用法
`db.help()`
`db.otherSql.help()`
`db.otherSql.find().help()`

####删除当前使用的数据库
`db.dropDatabase()` 

#### 从指定的机器上复制指定数据库数据到某个数据库
`db.copyDatabase("mydb", "temp", "127.0.0.1") `将本机的mydb的数据复制到temp数据库中

####修复当前数据库
` db.repairDatabase()`

####查看当前使用的数据库
`db.getName()`

####当前db版本
`db.version()`

####查看当前db的链接机器地址
`db.getMongo()`

### 集合的操作
1,创建一个集合
`db.createCollection('newData',{size:20,capped:5,max:100})
2,获得指定名称的集合
`db.getCollection('newData')`
3,得到当前db的所有聚集集合
`db.getCollectionNames()`
4,显示当前db所有聚集索引的状态
`db.printCollectionStats()`

###用户操作
1,添加一个用户
`db.addUser('name')`
`db.addUser('userName','pwd123',true)` 用户名、密码、只读
2,数据库认证、安全模式
`db.auth('userName','1234')`
3,显示当前所有用户
`show users`
4,删除用户
`db.removeUser('userName')`

###错误日志
1,查询之前的错误信息
`db.getPrevError()`
2,清除错误记录
`db.resetError()`

###集合的基本操作
1,查看帮助 : `db.mydata.help()`
2,查询数据条数: `db.mydata.count()`
3,查看数据空间大小:`db.mydata.dataSize()`
4,查看当前集合所在位置:`db.mydata.getDB()`
5,查看当前集合的状态:`db.mydata.stats()`
6,得到集合总大小:`db.mydata.totalSize()`
7,获得集合存储空间大小:`db.mydata.storageSize()`
8,Shard版本信息:`db.mydata.getShardVersion()
9,集合重命名:`db.mydata.renameCollection('newData')
10,删除当前集合:`db.mydata.drop`

###集合查询
1,查询所有记录
`db.mydata.find()` 默认显示20条记录
`DBQuery.shellBatchSize=n `,每页显示n条记录
2,过滤重复数据
`db.mydata.distinct('name')` 过滤不重复的name记录
3,查询操作
> `db.mydata.find({'age':22})` 
	查询age=22的记录
> `db.mydata.find({age:{$gt:22}})` 
	查询age>22的记录
	$gt 大于 ;$lt 小于 ; $gte 大于等于;$lte 小于等于
> `db.mydata.find({age:{$gte:23,$lte:26}})` 
	查询 23<=age<=26
> `db.mydata.find({name:/mongo/})` 
	查询name字段含 ‘mongo’的记录
> `/^mongo/ ` 查询以mongo开头的记录
> `db.mydata.find({},{name:1,age:1})`
	类似:select name ,age from mydata
> `db.mydata.find().sort({age:-1})`
	类似:select * from mydata order by desc
  `db.mydata.find().sort({age:1})`
  	类似:select * from mydata order by asc
> `db.mydata.find().limit(5)`
	输出前5条记录
> `db.mydata.find().skip(10)`
	查询10条后的数据
> `db.mydata.find().limit(10).skip(5)`
	查询5-10之间的数据
> `db.mydata.find({$or:[{age:22},{age:25}]})
	查询age=22 或age=25的记录
> `db.mydata.find({age:{$gte:25}}).count()
	查询age>25的记录数量

### 索引操作
1,创建索引
`db.mydata.ensureIndex({name:1})`
`db.mydata.ensureIndex({name:1,ts:-1})`
2,查询当前集合所有索引
`db.mydata.getIndexes()`
3,查询总索引记录大小
`db.mydata.totalIndexSize()`
4,读取当前集合的所有index信息
`db.mydata.reIndex()`
5,删除指定索引
`db.mydata.dropIndex('name')`

###修改，添加，删除
1,添加
`db.mydata.save({name:'zhangsan',age:25,sex:true})`
2,更新
`db.mydata.update({name:'zhangsan'},{$inc:{age:50},$set:{name:'wangwu'}},false,true)`
	类似:update mydata set name='wangwu',age=age+50 where name="zhangsan"
3,删除
`db.mydata.remove({age:13})`
4,查询修改删除
`db.users.findAndModify({
	query:{age:{$gte:25}}
	,sort:{age:-1}
	,update:{$set:{name:'newName'},$inc:{age:2}}
	,remove:true
})

###语句块操作
1，print() ,printjson()
2,tojson()
3,find游标查询
4,forEach()迭代循环
5,it 查询更多的记录信息；类似more

###命令解析
#### update()
db.collection.update( criteria, objNew, upsert, multi )

criteria : update的查询条件，类似sql update查询内where后面的
objNew   : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
upsert   : 这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
multi    : mongodb默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
#### 更新操作符

1) $inc {$inc:{field:value}}
	自增加
2) $set {$set:{field:value}}
	类似 set field=value
3) $unset {$unset:{field:1}}
	删除field字段
4) $push {$push:{field:value}}
	把value追加到field字段值中，field字段值必须为数组
5) $pushAll {$pushAll:{field:value_array}}
	一次追加多个值到一个field字段数组中
....
$addToSet,$pop,$pull,
10) $操作符
如数据为:
{ "_id" : ObjectId("4b97e62bf1d8c7152c9ccb74"), "title" : "ABC",  "comments" : [ { "school" : "joe", "data" : 3 }, { "school" : "jane", "data" : 7 } ] }

`db.mydata.update( {'comments.school':'people'},{ $inc:{'comments.$.data' : 1}})`
	查询comments中school为people的记录，并更新data的数据
 	